'use client';

import React, { useState, useEffect, useRef } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';
import AlgorithmHeader from '../Common/AlgorithmHeader';
import PseudocodeViewer from '../Common/PseudocodeViewer';
import CodeViewer from '../Common/CodeViewer';
import TheorySection from '../Common/TheorySection';
import { ALGORITHMS } from '../../data/algorithmsData';
import { soundManager } from '../../utils/audio';

const ROWS = 16;
const COLS = 32;

export default function PathfindingVisualizer() {
  const [grid, setGrid] = useState([]);
  const [startPos, setStartPos] = useState({ r: 7, c: 5 });
  const [targetPos, setTargetPos] = useState({ r: 7, c: 26 });
  const [isMousePressed, setIsMousePressed] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [selectedAlgo, setSelectedAlgo] = useState('a-star');
  const [speed, setSpeed] = useState(1);
  const [stats, setStats] = useState({ visited: 0, pathLength: 0 });
  const [statusMessage, setStatusMessage] = useState('Click & drag on the grid to create walls. Then select an algorithm and click Visualize!');

  const timeoutsRef = useRef([]);

  const algorithmData = ALGORITHMS[selectedAlgo] || ALGORITHMS['a-star'];

  // Initialize clear grid
  const initializeGrid = () => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
    setIsRunning(false);
    setStats({ visited: 0, pathLength: 0 });

    const newGrid = [];
    for (let r = 0; r < ROWS; r++) {
      const row = [];
      for (let c = 0; c < COLS; c++) {
        row.push({
          r,
          c,
          isStart: r === startPos.r && c === startPos.c,
          isTarget: r === targetPos.r && c === targetPos.c,
          isWall: false,
          isVisited: false,
          isPath: false,
          distance: Infinity,
          gScore: Infinity,
          fScore: Infinity,
          previousNode: null,
        });
      }
      newGrid.push(row);
    }
    setGrid(newGrid);
  };

  useEffect(() => {
    initializeGrid();
    return () => timeoutsRef.current.forEach(clearTimeout);
  }, []);

  const handleMouseDown = (r, c) => {
    if (isRunning) return;
    if ((r === startPos.r && c === startPos.c) || (r === targetPos.r && c === targetPos.c)) return;
    setIsMousePressed(true);
    toggleWall(r, c);
  };

  const handleMouseEnter = (r, c) => {
    if (!isMousePressed || isRunning) return;
    if ((r === startPos.r && c === startPos.c) || (r === targetPos.r && c === targetPos.c)) return;
    toggleWall(r, c);
  };

  const handleMouseUp = () => {
    setIsMousePressed(false);
  };

  const toggleWall = (r, c) => {
    setGrid((prev) => {
      const copy = prev.map((row) => row.map((node) => ({ ...node })));
      copy[r][c].isWall = !copy[r][c].isWall;
      return copy;
    });
  };

  // Clear path and visited nodes only
  const clearPathOnly = () => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
    setIsRunning(false);
    setStats({ visited: 0, pathLength: 0 });
    setGrid((prev) =>
      prev.map((row) =>
        row.map((node) => ({
          ...node,
          isVisited: false,
          isPath: false,
          distance: Infinity,
          gScore: Infinity,
          fScore: Infinity,
          previousNode: null,
        }))
      )
    );
  };

  // Generate Maze
  const generateMaze = () => {
    clearPathOnly();
    setGrid((prev) =>
      prev.map((row) =>
        row.map((node) => {
          if (node.isStart || node.isTarget) return node;
          return {
            ...node,
            isWall: Math.random() < 0.28,
          };
        })
      )
    );
    setStatusMessage('Random obstacle field generated. Ready to solve!');
  };

  // ================= PATHFINDING ALGORITHMS =================
  const runDijkstra = (nodes) => {
    const visitedInOrder = [];
    const unvisited = [];

    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        const node = nodes[r][c];
        if (node.isStart) node.distance = 0;
        unvisited.push(node);
      }
    }

    while (unvisited.length > 0) {
      unvisited.sort((a, b) => a.distance - b.distance);
      const closest = unvisited.shift();

      if (closest.isWall) continue;
      if (closest.distance === Infinity) return { visitedInOrder, shortestPath: [] };

      closest.isVisited = true;
      visitedInOrder.push(closest);

      if (closest.isTarget) {
        return { visitedInOrder, shortestPath: reconstructPath(closest) };
      }

      // Check 4 neighbors
      const neighbors = getNeighbors(closest, nodes);
      for (const n of neighbors) {
        if (!n.isVisited && !n.isWall) {
          const newDist = closest.distance + 1;
          if (newDist < n.distance) {
            n.distance = newDist;
            n.previousNode = closest;
          }
        }
      }
    }

    return { visitedInOrder, shortestPath: [] };
  };

  const runAStar = (nodes) => {
    const visitedInOrder = [];
    const openSet = [];
    const startNode = nodes[startPos.r][startPos.c];
    const targetNode = nodes[targetPos.r][targetPos.c];

    startNode.gScore = 0;
    startNode.fScore = manhattan(startNode, targetNode);
    openSet.push(startNode);

    while (openSet.length > 0) {
      openSet.sort((a, b) => a.fScore - b.fScore);
      const current = openSet.shift();

      if (current.isWall) continue;
      current.isVisited = true;
      visitedInOrder.push(current);

      if (current.isTarget) {
        return { visitedInOrder, shortestPath: reconstructPath(current) };
      }

      const neighbors = getNeighbors(current, nodes);
      for (const n of neighbors) {
        if (n.isWall || n.isVisited) continue;

        const tentativeG = current.gScore + 1;
        if (tentativeG < n.gScore) {
          n.previousNode = current;
          n.gScore = tentativeG;
          n.fScore = tentativeG + manhattan(n, targetNode);
          if (!openSet.includes(n)) {
            openSet.push(n);
          }
        }
      }
    }

    return { visitedInOrder, shortestPath: [] };
  };

  const runBFS = (nodes) => {
    const visitedInOrder = [];
    const queue = [];
    const startNode = nodes[startPos.r][startPos.c];
    startNode.isVisited = true;
    queue.push(startNode);

    while (queue.length > 0) {
      const current = queue.shift();
      visitedInOrder.push(current);

      if (current.isTarget) {
        return { visitedInOrder, shortestPath: reconstructPath(current) };
      }

      const neighbors = getNeighbors(current, nodes);
      for (const n of neighbors) {
        if (!n.isVisited && !n.isWall) {
          n.isVisited = true;
          n.previousNode = current;
          queue.push(n);
        }
      }
    }

    return { visitedInOrder, shortestPath: [] };
  };

  const getNeighbors = (node, nodes) => {
    const { r, c } = node;
    const res = [];
    if (r > 0) res.push(nodes[r - 1][c]);
    if (r < ROWS - 1) res.push(nodes[r + 1][c]);
    if (c > 0) res.push(nodes[r][c - 1]);
    if (c < COLS - 1) res.push(nodes[r][c + 1]);
    return res;
  };

  const manhattan = (a, b) => Math.abs(a.r - b.r) + Math.abs(a.c - b.c);

  const reconstructPath = (endNode) => {
    const path = [];
    let curr = endNode;
    while (curr) {
      path.unshift(curr);
      curr = curr.previousNode;
    }
    return path;
  };

  // Execution Trigger
  const handleVisualize = () => {
    if (isRunning) return;
    clearPathOnly();
    setIsRunning(true);
    setStatusMessage(`Visualizing ${selectedAlgo.toUpperCase()}...`);

    // Clone grid
    const nodes = grid.map((row) => row.map((node) => ({ ...node })));
    let result = { visitedInOrder: [], shortestPath: [] };

    if (selectedAlgo === 'a-star') result = runAStar(nodes);
    else if (selectedAlgo === 'dijkstra') result = runDijkstra(nodes);
    else result = runBFS(nodes);

    const { visitedInOrder, shortestPath } = result;

    const delay = Math.max(5, Math.floor(25 / speed));

    visitedInOrder.forEach((node, idx) => {
      const timeout = setTimeout(() => {
        setGrid((prev) => {
          const next = prev.map((row) => [...row]);
          next[node.r][node.c] = { ...next[node.r][node.c], isVisited: true };
          return next;
        });
        setStats((s) => ({ ...s, visited: idx + 1 }));

        if (idx === visitedInOrder.length - 1) {
          // Animate shortest path
          animateShortestPath(shortestPath);
        }
      }, idx * delay);
      timeoutsRef.current.push(timeout);
    });
  };

  const animateShortestPath = (path) => {
    if (path.length === 0) {
      setIsRunning(false);
      setStatusMessage('Target is unreachable! No path exists between start and goal.');
      return;
    }

    path.forEach((node, idx) => {
      const timeout = setTimeout(() => {
        setGrid((prev) => {
          const next = prev.map((row) => [...row]);
          next[node.r][node.c] = { ...next[node.r][node.c], isPath: true };
          return next;
        });
        setStats((s) => ({ ...s, pathLength: idx + 1 }));

        if (idx === path.length - 1) {
          setIsRunning(false);
          soundManager.playSuccess();
          setStatusMessage(`Shortest path found! Length: ${path.length} steps.`);
        }
      }, idx * 30);
      timeoutsRef.current.push(timeout);
    });
  };

  return (
    <Box sx={{ width: '100%', maxWidth: 1400, mx: 'auto', px: { xs: 2, md: 4 }, py: 3 }}>
      {/* Algorithm Tabs */}
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
        {[
          { slug: 'a-star', label: 'A* Search (Heuristic)' },
          { slug: 'dijkstra', label: "Dijkstra's (Shortest Path)" },
          { slug: 'bfs', label: 'Breadth-First Search (BFS)' },
        ].map((item) => (
          <Button
            key={item.slug}
            onClick={() => {
              setSelectedAlgo(item.slug);
              clearPathOnly();
            }}
            sx={{
              px: 2,
              py: 0.75,
              borderRadius: 2,
              fontWeight: 700,
              fontSize: '0.85rem',
              color: selectedAlgo === item.slug ? '#ffffff' : '#94a3b8',
              backgroundColor: selectedAlgo === item.slug ? '#2563eb' : 'rgba(255, 255, 255, 0.04)',
              border: `1px solid ${selectedAlgo === item.slug ? '#3b82f6' : 'rgba(255, 255, 255, 0.06)'}`,
              textTransform: 'none',
              '&:hover': {
                backgroundColor: selectedAlgo === item.slug ? '#1d4ed8' : 'rgba(255, 255, 255, 0.08)',
              },
            }}
          >
            {item.label}
          </Button>
        ))}
      </Box>

      {/* Header */}
      <AlgorithmHeader algorithm={algorithmData} />

      {/* Hero Visualizer Canvas */}
      <Paper
        elevation={0}
        sx={{
          p: { xs: 2, sm: 3 },
          borderRadius: 3,
          backgroundColor: 'rgba(15, 23, 42, 0.7)',
          backdropFilter: 'blur(16px)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4)',
          mb: 3,
        }}
      >
        {/* Status Bar */}
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 2,
            mb: 2,
            p: 1.5,
            borderRadius: 2,
            backgroundColor: 'rgba(56, 189, 248, 0.1)',
            border: '1px solid rgba(56, 189, 248, 0.25)',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <span>🧭</span>
            <Typography variant="body2" sx={{ color: '#38bdf8', fontWeight: 600 }}>
              {statusMessage}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography variant="caption" sx={{ color: '#cbd5e1', fontFamily: 'monospace' }}>
              Nodes Visited: <strong style={{ color: '#38bdf8' }}>{stats.visited}</strong>
            </Typography>
            <Typography variant="caption" sx={{ color: '#cbd5e1', fontFamily: 'monospace' }}>
              Path Length: <strong style={{ color: '#f59e0b' }}>{stats.pathLength}</strong>
            </Typography>
          </Box>
        </Box>

        {/* 2D Pathfinding Grid */}
        <Box
          onMouseLeave={handleMouseUp}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            p: 1.5,
            borderRadius: 2,
            backgroundColor: 'rgba(9, 13, 22, 0.9)',
            border: '1px solid rgba(255, 255, 255, 0.06)',
            overflowX: 'auto',
            userSelect: 'none',
          }}
        >
          {grid.map((row, rIdx) => (
            <Box key={rIdx} sx={{ display: 'flex' }}>
              {row.map((node, cIdx) => {
                let cellBg = 'rgba(15, 23, 42, 0.6)';
                let border = '1px solid rgba(255, 255, 255, 0.04)';
                let glow = 'none';

                if (node.isStart) {
                  cellBg = '#10b981';
                  border = '1px solid #34d399';
                  glow = '0 0 10px #10b981';
                } else if (node.isTarget) {
                  cellBg = '#ef4444';
                  border = '1px solid #f87171';
                  glow = '0 0 10px #ef4444';
                } else if (node.isPath) {
                  cellBg = '#f59e0b';
                  border = '1px solid #fbbf24';
                  glow = '0 0 8px #f59e0b';
                } else if (node.isVisited) {
                  cellBg = 'rgba(56, 189, 248, 0.45)';
                  border = '1px solid rgba(56, 189, 248, 0.2)';
                } else if (node.isWall) {
                  cellBg = '#020617';
                  border = '1px solid #334155';
                }

                return (
                  <Box
                    key={cIdx}
                    onMouseDown={() => handleMouseDown(rIdx, cIdx)}
                    onMouseEnter={() => handleMouseEnter(rIdx, cIdx)}
                    onMouseUp={handleMouseUp}
                    sx={{
                      width: { xs: 16, sm: 22, md: 26 },
                      height: { xs: 16, sm: 22, md: 26 },
                      backgroundColor: cellBg,
                      border,
                      boxShadow: glow,
                      transition: node.isPath || node.isVisited ? 'background-color 0.15s ease' : 'none',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.65rem',
                      fontWeight: 800,
                      color: '#ffffff',
                    }}
                  >
                    {node.isStart && 'S'}
                    {node.isTarget && 'G'}
                  </Box>
                );
              })}
            </Box>
          ))}
        </Box>

        {/* Legend */}
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 2.5,
            mt: 2,
            pt: 2,
            borderTop: '1px solid rgba(255, 255, 255, 0.06)',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
            <Box sx={{ width: 14, height: 14, borderRadius: 0.5, backgroundColor: '#10b981' }} />
            <Typography variant="caption" sx={{ color: '#94a3b8' }}>Start Node (S)</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
            <Box sx={{ width: 14, height: 14, borderRadius: 0.5, backgroundColor: '#ef4444' }} />
            <Typography variant="caption" sx={{ color: '#94a3b8' }}>Target Node (G)</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
            <Box sx={{ width: 14, height: 14, borderRadius: 0.5, backgroundColor: '#020617', border: '1px solid #334155' }} />
            <Typography variant="caption" sx={{ color: '#94a3b8' }}>Wall / Obstacle</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
            <Box sx={{ width: 14, height: 14, borderRadius: 0.5, backgroundColor: 'rgba(56, 189, 248, 0.45)' }} />
            <Typography variant="caption" sx={{ color: '#94a3b8' }}>Visited Node</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
            <Box sx={{ width: 14, height: 14, borderRadius: 0.5, backgroundColor: '#f59e0b' }} />
            <Typography variant="caption" sx={{ color: '#94a3b8' }}>Shortest Path</Typography>
          </Box>
        </Box>

        {/* Action Controls Toolbar */}
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 2,
            mt: 3,
            p: 2,
            borderRadius: 2.5,
            backgroundColor: 'rgba(15, 23, 42, 0.8)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flexWrap: 'wrap' }}>
            <Button
              variant="contained"
              onClick={handleVisualize}
              disabled={isRunning}
              sx={{
                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                color: '#ffffff',
                fontWeight: 700,
                px: 2.5,
                py: 1,
                borderRadius: 2,
                boxShadow: '0 0 15px rgba(16, 185, 129, 0.4)',
              }}
            >
              Visualize {selectedAlgo.toUpperCase()}
            </Button>

            <Button
              variant="outlined"
              onClick={generateMaze}
              disabled={isRunning}
              sx={{
                borderColor: '#38bdf8',
                color: '#38bdf8',
                borderRadius: 2,
                textTransform: 'none',
                fontWeight: 600,
              }}
            >
              Generate Maze
            </Button>

            <Button
              variant="text"
              onClick={clearPathOnly}
              disabled={isRunning}
              sx={{ color: '#94a3b8', textTransform: 'none' }}
            >
              Clear Path
            </Button>

            <Button
              variant="text"
              onClick={initializeGrid}
              disabled={isRunning}
              sx={{ color: '#ef4444', textTransform: 'none' }}
            >
              Reset Board
            </Button>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 600 }}>SPEED:</Typography>
            {[0.5, 1, 2].map((s) => (
              <Button
                key={s}
                size="small"
                onClick={() => setSpeed(s)}
                sx={{
                  minWidth: 36,
                  px: 0.8,
                  py: 0.25,
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  color: speed === s ? '#ffffff' : '#94a3b8',
                  backgroundColor: speed === s ? '#2563eb' : 'transparent',
                  borderRadius: 1.5,
                }}
              >
                {s}x
              </Button>
            ))}
          </Box>
        </Box>
      </Paper>

      {/* Code and Pseudocode */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', lg: '1fr 1fr' },
          gap: 3,
          mb: 4,
        }}
      >
        <PseudocodeViewer pseudocode={algorithmData.pseudocode} activeLine={null} />
        <CodeViewer
          cCode={algorithmData.cCode}
          pythonCode={algorithmData.pythonCode}
          cFileName={algorithmData.cFileName}
          pythonFileName={algorithmData.pythonFileName}
        />
      </Box>

      {/* Theory */}
      <TheorySection theory={algorithmData.theory} />
    </Box>
  );
}

'use client';

import React, { useState, useEffect, useRef } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import AlgorithmHeader from '../Common/AlgorithmHeader';
import PseudocodeViewer from '../Common/PseudocodeViewer';
import CodeViewer from '../Common/CodeViewer';
import TheorySection from '../Common/TheorySection';
import { ALGORITHMS } from '../../data/algorithmsData';
import { soundManager } from '../../utils/audio';

const INITIAL_NODES = [
  { id: 0, label: 'A', x: 80, y: 140 },
  { id: 1, label: 'B', x: 220, y: 60 },
  { id: 2, label: 'C', x: 220, y: 220 },
  { id: 3, label: 'D', x: 380, y: 60 },
  { id: 4, label: 'E', x: 380, y: 220 },
  { id: 5, label: 'F', x: 520, y: 140 },
];

const INITIAL_EDGES = [
  { u: 0, v: 1, weight: 4 },
  { u: 0, v: 2, weight: 2 },
  { u: 1, v: 2, weight: 1 },
  { u: 1, v: 3, weight: 5 },
  { u: 2, v: 4, weight: 8 },
  { u: 2, v: 3, weight: 8 },
  { u: 3, v: 4, weight: 2 },
  { u: 3, v: 5, weight: 6 },
  { u: 4, v: 5, weight: 3 },
];

export default function GraphVisualizer() {
  const [nodes, setNodes] = useState(INITIAL_NODES);
  const [edges, setEdges] = useState(INITIAL_EDGES);
  const [selectedAlgo, setSelectedAlgo] = useState('dijkstra');
  const [activeNode, setActiveNode] = useState(null);
  const [visitedNodes, setVisitedNodes] = useState([]);
  const [activeEdges, setActiveEdges] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const [statusMessage, setStatusMessage] = useState('Select an algorithm and click Run to visualize graph traversal!');
  const timeoutsRef = useRef([]);

  const algorithmData = ALGORITHMS['dijkstra'];

  const resetVisualState = () => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
    setActiveNode(null);
    setVisitedNodes([]);
    setActiveEdges([]);
    setIsRunning(false);
  };

  const runBFS = () => {
    resetVisualState();
    setIsRunning(true);
    setStatusMessage('Running Breadth-First Search (Level by Level)...');

    const visited = [];
    const queue = [0];
    const events = [];

    const visitedSet = new Set([0]);

    while (queue.length > 0) {
      const u = queue.shift();
      events.push({ type: 'VISIT', node: u, msg: `Visited Node ${nodes[u].label}` });

      // Find neighbors
      const neighbors = edges
        .filter((e) => e.u === u || e.v === u)
        .map((e) => (e.u === u ? { next: e.v, edge: e } : { next: e.u, edge: e }));

      for (const { next, edge } of neighbors) {
        if (!visitedSet.has(next)) {
          visitedSet.add(next);
          queue.push(next);
          events.push({ type: 'EDGE', edge, msg: `Discovered unvisited neighbor Node ${nodes[next].label}` });
        }
      }
    }

    animateEvents(events);
  };

  const runDijkstra = () => {
    resetVisualState();
    setIsRunning(true);
    setStatusMessage("Running Dijkstra's Shortest Path Algorithm from Node A...");

    const dist = {};
    const prev = {};
    const unvisited = new Set(nodes.map((n) => n.id));
    nodes.forEach((n) => {
      dist[n.id] = Infinity;
    });
    dist[0] = 0;

    const events = [];

    while (unvisited.size > 0) {
      // Find min dist
      let u = null;
      let minD = Infinity;
      unvisited.forEach((id) => {
        if (dist[id] < minD) {
          minD = dist[id];
          u = id;
        }
      });

      if (u === null || minD === Infinity) break;
      unvisited.delete(u);

      events.push({
        type: 'VISIT',
        node: u,
        msg: `Extracted Node ${nodes[u].label} with minimum shortest distance = ${dist[u]}`,
      });

      // Relax edges
      const neighbors = edges
        .filter((e) => e.u === u || e.v === u)
        .map((e) => (e.u === u ? { next: e.v, weight: e.weight, edge: e } : { next: e.u, weight: e.weight, edge: e }));

      for (const { next, weight, edge } of neighbors) {
        if (unvisited.has(next)) {
          const alt = dist[u] + weight;
          if (alt < dist[next]) {
            dist[next] = alt;
            prev[next] = u;
            events.push({
              type: 'EDGE',
              edge,
              msg: `Relaxed edge to Node ${nodes[next].label}: new shorter distance = ${alt}`,
            });
          }
        }
      }
    }

    animateEvents(events);
  };

  const animateEvents = (events) => {
    events.forEach((ev, idx) => {
      const timeout = setTimeout(() => {
        setStatusMessage(ev.msg);
        if (ev.type === 'VISIT') {
          setActiveNode(ev.node);
          setVisitedNodes((prev) => (prev.includes(ev.node) ? prev : [...prev, ev.node]));
          soundManager.playCompare(ev.node * 15);
        } else if (ev.type === 'EDGE') {
          setActiveEdges((prev) => [...prev, `${ev.edge.u}-${ev.edge.v}`]);
          soundManager.playSwap(50);
        }

        if (idx === events.length - 1) {
          setIsRunning(false);
          soundManager.playSuccess();
          setStatusMessage('Graph algorithm finished successfully!');
        }
      }, idx * 600);
      timeoutsRef.current.push(timeout);
    });
  };

  return (
    <Box sx={{ width: '100%', maxWidth: 1400, mx: 'auto', px: { xs: 2, md: 4 }, py: 3 }}>
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
        {/* Status Message */}
        <Box
          sx={{
            p: 1.5,
            borderRadius: 2,
            backgroundColor: 'rgba(56, 189, 248, 0.1)',
            border: '1px solid rgba(56, 189, 248, 0.25)',
            color: '#38bdf8',
            fontSize: '0.9rem',
            fontWeight: 600,
            mb: 2.5,
          }}
        >
          {statusMessage}
        </Box>

        {/* SVG Graph Canvas */}
        <Box
          sx={{
            minHeight: 300,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 2,
            backgroundColor: 'rgba(9, 13, 22, 0.8)',
            border: '1px solid rgba(255, 255, 255, 0.04)',
            overflowX: 'auto',
          }}
        >
          <svg width="600" height="280" viewBox="0 0 600 280">
            {/* Edges */}
            {edges.map((e, idx) => {
              const uNode = nodes.find((n) => n.id === e.u);
              const vNode = nodes.find((n) => n.id === e.v);
              const isEdgeActive =
                activeEdges.includes(`${e.u}-${e.v}`) || activeEdges.includes(`${e.v}-${e.u}`);

              const midX = (uNode.x + vNode.x) / 2;
              const midY = (uNode.y + vNode.y) / 2;

              return (
                <g key={idx}>
                  <line
                    x1={uNode.x}
                    y1={uNode.y}
                    x2={vNode.x}
                    y2={vNode.y}
                    stroke={isEdgeActive ? '#38bdf8' : 'rgba(255, 255, 255, 0.2)'}
                    strokeWidth={isEdgeActive ? 3.5 : 2}
                    style={{ transition: 'all 0.3s ease' }}
                  />
                  {/* Weight Badge */}
                  <rect
                    x={midX - 10}
                    y={midY - 10}
                    width="20"
                    height="20"
                    rx="4"
                    fill="#0f172a"
                    stroke={isEdgeActive ? '#38bdf8' : 'rgba(255, 255, 255, 0.2)'}
                  />
                  <text
                    x={midX}
                    y={midY + 4}
                    textAnchor="middle"
                    fill="#94a3b8"
                    fontSize="11"
                    fontWeight="700"
                    fontFamily="monospace"
                  >
                    {e.weight}
                  </text>
                </g>
              );
            })}

            {/* Nodes */}
            {nodes.map((node) => {
              const isCurrent = activeNode === node.id;
              const isVisited = visitedNodes.includes(node.id);

              let fill = '#1e293b';
              let stroke = '#64748b';

              if (isCurrent) {
                fill = '#f59e0b';
                stroke = '#fbbf24';
              } else if (isVisited) {
                fill = '#10b981';
                stroke = '#34d399';
              }

              return (
                <g key={node.id}>
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={22}
                    fill={fill}
                    stroke={stroke}
                    strokeWidth={isCurrent ? 3 : 2}
                    style={{
                      filter: isCurrent ? 'drop-shadow(0 0 12px #f59e0b)' : isVisited ? 'drop-shadow(0 0 8px #10b981)' : 'none',
                      transition: 'all 0.3s ease',
                    }}
                  />
                  <text
                    x={node.x}
                    y={node.y + 5}
                    textAnchor="middle"
                    fill="#ffffff"
                    fontSize="14"
                    fontWeight="800"
                    fontFamily="monospace"
                  >
                    {node.label}
                  </text>
                </g>
              );
            })}
          </svg>
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
            <Box sx={{ width: 14, height: 14, borderRadius: '50%', backgroundColor: '#1e293b', border: '1px solid #64748b' }} />
            <Typography variant="caption" sx={{ color: '#94a3b8' }}>Unvisited Node</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
            <Box sx={{ width: 14, height: 14, borderRadius: '50%', backgroundColor: '#f59e0b' }} />
            <Typography variant="caption" sx={{ color: '#94a3b8' }}>Current Node</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
            <Box sx={{ width: 14, height: 14, borderRadius: '50%', backgroundColor: '#10b981' }} />
            <Typography variant="caption" sx={{ color: '#94a3b8' }}>Visited / Solved</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
            <Box sx={{ width: 18, height: 3, backgroundColor: '#38bdf8' }} />
            <Typography variant="caption" sx={{ color: '#94a3b8' }}>Relaxed Edge</Typography>
          </Box>
        </Box>

        {/* Action Controls */}
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 1.5,
            mt: 3,
            p: 2,
            borderRadius: 2.5,
            backgroundColor: 'rgba(15, 23, 42, 0.8)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
          }}
        >
          <Button
            variant="contained"
            onClick={runDijkstra}
            disabled={isRunning}
            sx={{ backgroundColor: '#2563eb', fontWeight: 700 }}
          >
            Run Dijkstra (Shortest Path)
          </Button>

          <Button
            variant="contained"
            onClick={runBFS}
            disabled={isRunning}
            sx={{ backgroundColor: '#0284c7', fontWeight: 700 }}
          >
            Run BFS Traversal
          </Button>

          <Button
            variant="outlined"
            onClick={resetVisualState}
            disabled={isRunning}
            sx={{ borderColor: 'rgba(255, 255, 255, 0.2)', color: '#94a3b8' }}
          >
            Reset Traversal
          </Button>
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

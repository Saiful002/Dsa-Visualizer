'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import AlgorithmHeader from '../Common/AlgorithmHeader';
import VisualizationControls from '../Common/VisualizationControls';
import StepExplanation from '../Common/StepExplanation';
import PseudocodeViewer from '../Common/PseudocodeViewer';
import CodeViewer from '../Common/CodeViewer';
import TheorySection from '../Common/TheorySection';
import SecondarySidebar from '../Common/SecondarySidebar';
import { ALGORITHMS } from '../../data/algorithmsData';
import { soundManager } from '../../utils/audio';
import { useColorMode } from '../../app/ThemeRegistry';

function generateNQueensSteps(n = 4) {
  const steps = [];
  const board = Array.from({ length: n }, () => Array(n).fill(0));

  steps.push({
    board: board.map((r) => [...r]),
    actionType: 'IDLE',
    line: 1,
    description: `Starting N-Queens solver on a ${n}×${n} chessboard.`,
    col: 0,
    row: 0,
  });

  function isSafe(b, r, c) {
    for (let i = 0; i < c; i++) if (b[r][i]) return false;
    for (let i = r, j = c; i >= 0 && j >= 0; i--, j--) if (b[i][j]) return false;
    for (let i = r, j = c; j >= 0 && i < n; i++, j--) if (b[i][j]) return false;
    return true;
  }

  function solve(col) {
    if (col >= n) {
      steps.push({
        board: board.map((r) => [...r]),
        actionType: 'COMPLETE',
        line: 2,
        description: `Successfully placed all ${n} non-attacking Queens on the board!`,
        col,
      });
      return true;
    }

    for (let row = 0; row < n; row++) {
      steps.push({
        board: board.map((r) => [...r]),
        actionType: 'VISIT',
        line: 3,
        description: `Testing placement of Queen at row ${row}, column ${col}...`,
        col,
        row,
      });

      if (isSafe(board, row, col)) {
        board[row][col] = 1;
        steps.push({
          board: board.map((r) => [...r]),
          actionType: 'COMPARE',
          line: 5,
          description: `Safe! Placed Queen at (row ${row}, col ${col}). Moving to next column ${col + 1}.`,
          col,
          row,
        });

        if (solve(col + 1)) return true;

        board[row][col] = 0; // BACKTRACK
        steps.push({
          board: board.map((r) => [...r]),
          actionType: 'SWAP',
          line: 7,
          description: `Dead end hit in subsequent columns. BACKTRACK: Removed Queen from (row ${row}, col ${col}).`,
          col,
          row,
        });
      } else {
        steps.push({
          board: board.map((r) => [...r]),
          actionType: 'OVERWRITE',
          line: 4,
          description: `Position (row ${row}, col ${col}) is under attack! Moving to next row.`,
          col,
          row,
        });
      }
    }
    return false;
  }

  solve(0);
  return steps;
}

export default function RecursionVisualizer() {
  const { mode } = useColorMode();
  const isDark = mode === 'dark';
  const [n, setN] = useState(4);
  const [steps, setSteps] = useState([]);
  const [currentStepIdx, setCurrentStepIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);
  const timerRef = useRef(null);

  const algorithmData = ALGORITHMS['n-queens'];

  const initSolver = useCallback((boardSize = n) => {
    const generated = generateNQueensSteps(boardSize);
    setSteps(generated);
    setCurrentStepIdx(0);
    setIsPlaying(false);
  }, [n]);

  useEffect(() => {
    initSolver(n);
  }, [n, initSolver]);

  useEffect(() => {
    if (isPlaying) {
      const delay = Math.max(50, Math.floor(600 / speed));
      timerRef.current = setInterval(() => {
        setCurrentStepIdx((prev) => {
          if (prev < steps.length - 1) {
            const nextIdx = prev + 1;
            const nextStep = steps[nextIdx];
            if (nextStep) {
              if (nextStep.actionType === 'COMPARE') soundManager.playSwap(60);
              else if (nextStep.actionType === 'SWAP') soundManager.playCompare(30);
              else if (nextStep.actionType === 'COMPLETE') soundManager.playSuccess();
            }
            return nextIdx;
          } else {
            setIsPlaying(false);
            return prev;
          }
        });
      }, delay);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, steps, speed]);

  const currentStep = steps[currentStepIdx] || {
    board: Array.from({ length: n }, () => Array(n).fill(0)),
    actionType: 'IDLE',
    line: 1,
    description: 'Ready to solve N-Queens.',
    col: 0,
    row: 0,
  };

  const recursionAlgos = [
    { slug: 'n-queens', label: 'N-Queens Backtracking', badge: 'O(N!)' },
    { slug: 'tower-of-hanoi', label: 'Tower of Hanoi', badge: '2ⁿ - 1' },
    { slug: 'fibonacci-tree', label: 'Fibonacci Tree', badge: 'O(2ⁿ)' },
  ];

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: 1600,
        mx: 'auto',
        px: { xs: 1.5, sm: 2, md: 3 },
        py: 3,
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        gap: { xs: 2, md: 3 },
        alignItems: 'flex-start',
      }}
    >
      {/* Secondary Left Sidebar / SideDrawer for Recursion */}
      <SecondarySidebar
        title="Recursion Trees"
        category="Recursion"
        items={recursionAlgos}
        activeSlug="n-queens"
        onSelect={() => {}}
      />

      {/* Main Content Area */}
      <Box sx={{ flex: 1, minWidth: 0, width: '100%' }}>
        <AlgorithmHeader algorithm={algorithmData} />

      {/* Hero Visualizer Canvas */}
      <Paper
        elevation={0}
        sx={{
          p: { xs: 2, sm: 3 },
          borderRadius: 3,
          backgroundColor: isDark ? 'rgba(13, 19, 34, 0.75)' : 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(16px)',
          border: isDark ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid rgba(0, 0, 0, 0.08)',
          boxShadow: isDark ? '0 20px 40px rgba(0, 0, 0, 0.4)' : '0 10px 30px rgba(0, 0, 0, 0.06)',
          mb: 3,
        }}
      >
        <StepExplanation
          stepNumber={currentStepIdx + 1}
          totalSteps={steps.length}
          actionType={currentStep.actionType}
          description={currentStep.description}
        />

        {/* N-Queens Chessboard */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            p: 3,
            backgroundColor: isDark ? 'rgba(9, 13, 22, 0.8)' : 'rgba(241, 245, 249, 0.95)',
            borderRadius: 2,
            border: isDark ? '1px solid rgba(255, 255, 255, 0.05)' : '1px solid rgba(0, 0, 0, 0.06)',
            overflowX: 'auto',
          }}
        >
          <Box
            sx={{
              display: 'inline-grid',
              gridTemplateColumns: `repeat(${n}, 1fr)`,
              border: isDark ? '3px solid #334155' : '3px solid #94a3b8',
              borderRadius: 2,
              overflow: 'hidden',
              boxShadow: isDark ? '0 10px 30px rgba(0, 0, 0, 0.5)' : '0 10px 25px rgba(0, 0, 0, 0.08)',
            }}
          >
            {currentStep.board.map((rowArr, rIdx) =>
              rowArr.map((cell, cIdx) => {
                const isLight = (rIdx + cIdx) % 2 === 0;
                const isQueen = cell === 1;
                const isCurrent = currentStep.row === rIdx && currentStep.col === cIdx;

                let cellBg = isLight
                  ? (isDark ? '#1e293b' : '#ffffff')
                  : (isDark ? '#0f172a' : '#e2e8f0');
                if (isCurrent) cellBg = isDark ? 'rgba(245, 158, 11, 0.35)' : 'rgba(245, 158, 11, 0.25)';
                if (isQueen) cellBg = isDark ? 'rgba(16, 185, 129, 0.35)' : 'rgba(16, 185, 129, 0.25)';

                return (
                  <Box
                    key={`${rIdx}-${cIdx}`}
                    sx={{
                      width: { xs: 44, sm: 58, md: 66 },
                      height: { xs: 44, sm: 58, md: 66 },
                      backgroundColor: cellBg,
                      border: isCurrent
                        ? '2px solid #f59e0b'
                        : isDark
                        ? '1px solid rgba(255, 255, 255, 0.05)'
                        : '1px solid rgba(0, 0, 0, 0.06)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: { xs: '1.4rem', sm: '1.8rem' },
                      userSelect: 'none',
                      transition: 'background-color 0.2s ease',
                    }}
                  >
                    {isQueen && (
                      <span
                        style={{
                          filter: 'drop-shadow(0 0 8px #10b981)',
                          animation: 'pulse 1s infinite alternate',
                        }}
                      >
                        👑
                      </span>
                    )}
                  </Box>
                );
              })
            )}
          </Box>
        </Box>

        {/* Board size selector & Playback controls */}
        <Box sx={{ mt: 3 }}>
          <VisualizationControls
            isPlaying={isPlaying}
            onPlayPause={() => {
              if (currentStepIdx >= steps.length - 1) {
                setCurrentStepIdx(0);
                setIsPlaying(true);
              } else {
                setIsPlaying(!isPlaying);
              }
            }}
            onStepBack={() => {
              if (currentStepIdx > 0) {
                setCurrentStepIdx((p) => p - 1);
                setIsPlaying(false);
              }
            }}
            onStepForward={() => {
              if (currentStepIdx < steps.length - 1) {
                setCurrentStepIdx((p) => p + 1);
                setIsPlaying(false);
              }
            }}
            onRestart={() => {
              setCurrentStepIdx(0);
              setIsPlaying(false);
            }}
            onRandomize={() => initSolver(n)}
            canStepBack={currentStepIdx > 0}
            canStepForward={currentStepIdx < steps.length - 1}
            speed={speed}
            onSpeedChange={setSpeed}
            size={n}
            onSizeChange={setN}
            sizeLabel="N (Queens)"
            minSize={4}
            maxSize={6}
          />
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
        <PseudocodeViewer pseudocode={algorithmData.pseudocode} activeLine={currentStep.line} />
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
    </Box>
  );
}

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
import { ALGORITHMS } from '../../data/algorithmsData';
import { soundManager } from '../../utils/audio';

const DEFAULT_ITEMS = [
  { name: 'Item 1', weight: 2, val: 3 },
  { name: 'Item 2', weight: 3, val: 4 },
  { name: 'Item 3', weight: 4, val: 5 },
  { name: 'Item 4', weight: 5, val: 6 },
];

function generateKnapsackSteps(items, capacity) {
  const steps = [];
  const n = items.length;
  const W = capacity;

  // Initialize DP table
  const dp = Array.from({ length: n + 1 }, () => Array(W + 1).fill(0));

  steps.push({
    dp: dp.map((r) => [...r]),
    activeCell: { i: 0, w: 0 },
    actionType: 'IDLE',
    line: 1,
    description: `Initialized 2D DP table with dimensions ${n + 1}×${W + 1}.`,
  });

  for (let i = 1; i <= n; i++) {
    const item = items[i - 1];
    for (let w = 1; w <= W; w++) {
      if (item.weight <= w) {
        const includeVal = item.val + dp[i - 1][w - item.weight];
        const excludeVal = dp[i - 1][w];
        dp[i][w] = Math.max(includeVal, excludeVal);

        steps.push({
          dp: dp.map((r) => [...r]),
          activeCell: { i, w },
          includeCell: { i: i - 1, w: w - item.weight },
          excludeCell: { i: i - 1, w },
          actionType: 'COMPARE',
          line: 6,
          description: `Considering ${item.name} (wt: ${item.weight}, val: ${item.val}) for capacity ${w}: max(include: ${includeVal}, exclude: ${excludeVal}) = ${dp[i][w]}.`,
        });
      } else {
        dp[i][w] = dp[i - 1][w];
        steps.push({
          dp: dp.map((r) => [...r]),
          activeCell: { i, w },
          excludeCell: { i: i - 1, w },
          actionType: 'OVERWRITE',
          line: 7,
          description: `${item.name} weight (${item.weight}) > capacity (${w}). Cannot fit. dp[${i}][${w}] = dp[${i - 1}][${w}] = ${dp[i][w]}.`,
        });
      }
    }
  }

  // Backtrack chosen items
  const selectedItems = [];
  let currW = W;
  for (let i = n; i > 0 && currW > 0; i--) {
    if (dp[i][currW] !== dp[i - 1][currW]) {
      selectedItems.push(items[i - 1]);
      currW -= items[i - 1].weight;
    }
  }

  steps.push({
    dp: dp.map((r) => [...r]),
    activeCell: { i: n, w: W },
    actionType: 'COMPLETE',
    line: 8,
    description: `Optimal knapsack value calculated = ${dp[n][W]}! Selected: ${selectedItems.map((it) => it.name).join(', ')}.`,
    selectedItems,
  });

  return steps;
}

export default function DynamicProgrammingVisualizer() {
  const [capacity, setCapacity] = useState(7);
  const [items, setItems] = useState(DEFAULT_ITEMS);
  const [steps, setSteps] = useState([]);
  const [currentStepIdx, setCurrentStepIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);
  const timerRef = useRef(null);

  const algorithmData = ALGORITHMS['knapsack'];

  const initDP = useCallback((cap = capacity) => {
    const generated = generateKnapsackSteps(items, cap);
    setSteps(generated);
    setCurrentStepIdx(0);
    setIsPlaying(false);
  }, [items, capacity]);

  useEffect(() => {
    initDP(capacity);
  }, [capacity, initDP]);

  useEffect(() => {
    if (isPlaying) {
      const delay = Math.max(40, Math.floor(450 / speed));
      timerRef.current = setInterval(() => {
        setCurrentStepIdx((prev) => {
          if (prev < steps.length - 1) {
            const nextIdx = prev + 1;
            const nextStep = steps[nextIdx];
            if (nextStep) {
              if (nextStep.actionType === 'COMPARE') soundManager.playCompare(50);
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
    dp: Array.from({ length: items.length + 1 }, () => Array(capacity + 1).fill(0)),
    activeCell: { i: 0, w: 0 },
    actionType: 'IDLE',
    line: 1,
    description: 'Ready to solve 0/1 Knapsack.',
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
        <StepExplanation
          stepNumber={currentStepIdx + 1}
          totalSteps={steps.length}
          actionType={currentStep.actionType}
          description={currentStep.description}
        />

        {/* Item Cards Bar */}
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 1.5,
            mb: 3,
            p: 1.5,
            borderRadius: 2,
            backgroundColor: 'rgba(255, 255, 255, 0.02)',
            border: '1px solid rgba(255, 255, 255, 0.05)',
          }}
        >
          {items.map((it, idx) => (
            <Box
              key={idx}
              sx={{
                px: 2,
                py: 1,
                borderRadius: 1.5,
                backgroundColor: currentStep.activeCell?.i === idx + 1 ? 'rgba(56, 189, 248, 0.15)' : 'rgba(15, 23, 42, 0.6)',
                border: `1px solid ${currentStep.activeCell?.i === idx + 1 ? '#38bdf8' : 'rgba(255, 255, 255, 0.08)'}`,
                display: 'flex',
                alignItems: 'center',
                gap: 1.5,
              }}
            >
              <Typography variant="body2" sx={{ fontWeight: 700, color: '#f8fafc' }}>
                {it.name}:
              </Typography>
              <Typography variant="caption" sx={{ color: '#94a3b8' }}>
                Weight = <strong style={{ color: '#f59e0b' }}>{it.weight}</strong>
              </Typography>
              <Typography variant="caption" sx={{ color: '#94a3b8' }}>
                Value = <strong style={{ color: '#10b981' }}>${it.val}</strong>
              </Typography>
            </Box>
          ))}
        </Box>

        {/* 2D Dynamic Programming Grid */}
        <Box
          sx={{
            p: 2,
            borderRadius: 2,
            backgroundColor: 'rgba(9, 13, 22, 0.8)',
            border: '1px solid rgba(255, 255, 255, 0.04)',
            overflowX: 'auto',
          }}
        >
          <table style={{ borderCollapse: 'collapse', margin: '0 auto' }}>
            <thead>
              <tr>
                <th style={{ padding: '8px 12px', color: '#64748b', fontSize: '0.75rem', fontFamily: 'monospace' }}>
                  Item \ Cap
                </th>
                {Array.from({ length: capacity + 1 }, (_, w) => (
                  <th key={w} style={{ padding: '8px 12px', color: '#38bdf8', fontSize: '0.8rem', fontFamily: 'monospace' }}>
                    W={w}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {currentStep.dp.map((rowArr, i) => (
                <tr key={i}>
                  <td
                    style={{
                      padding: '8px 12px',
                      color: '#cbd5e1',
                      fontWeight: 700,
                      fontSize: '0.75rem',
                      fontFamily: 'monospace',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {i === 0 ? 'Base 0' : items[i - 1]?.name}
                  </td>
                  {rowArr.map((val, w) => {
                    const isActive = currentStep.activeCell?.i === i && currentStep.activeCell?.w === w;
                    const isInclude = currentStep.includeCell?.i === i && currentStep.includeCell?.w === w;
                    const isExclude = currentStep.excludeCell?.i === i && currentStep.excludeCell?.w === w;

                    let bg = 'rgba(15, 23, 42, 0.6)';
                    let border = '1px solid rgba(255, 255, 255, 0.08)';
                    let color = '#f8fafc';

                    if (isActive) {
                      bg = 'rgba(16, 185, 129, 0.3)';
                      border = '2px solid #10b981';
                      color = '#10b981';
                    } else if (isInclude) {
                      bg = 'rgba(56, 189, 248, 0.2)';
                      border = '1px solid #38bdf8';
                      color = '#38bdf8';
                    } else if (isExclude) {
                      bg = 'rgba(245, 158, 11, 0.2)';
                      border = '1px solid #f59e0b';
                      color = '#f59e0b';
                    }

                    return (
                      <td
                        key={w}
                        style={{
                          width: '44px',
                          height: '44px',
                          textAlign: 'center',
                          backgroundColor: bg,
                          border,
                          color,
                          fontWeight: 700,
                          fontFamily: 'monospace',
                          fontSize: '0.9rem',
                          borderRadius: '4px',
                          transition: 'all 0.2s ease',
                        }}
                      >
                        {val}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
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
            <Box sx={{ width: 14, height: 14, borderRadius: 0.5, backgroundColor: 'rgba(16, 185, 129, 0.5)', border: '1px solid #10b981' }} />
            <Typography variant="caption" sx={{ color: '#94a3b8' }}>Active dp[i][w]</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
            <Box sx={{ width: 14, height: 14, borderRadius: 0.5, backgroundColor: 'rgba(56, 189, 248, 0.4)', border: '1px solid #38bdf8' }} />
            <Typography variant="caption" sx={{ color: '#94a3b8' }}>Include Subproblem: dp[i-1][w-wt]</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
            <Box sx={{ width: 14, height: 14, borderRadius: 0.5, backgroundColor: 'rgba(245, 158, 11, 0.4)', border: '1px solid #f59e0b' }} />
            <Typography variant="caption" sx={{ color: '#94a3b8' }}>Exclude Subproblem: dp[i-1][w]</Typography>
          </Box>
        </Box>

        {/* Controls */}
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
            canStepBack={currentStepIdx > 0}
            canStepForward={currentStepIdx < steps.length - 1}
            speed={speed}
            onSpeedChange={setSpeed}
            size={capacity}
            onSizeChange={setCapacity}
            sizeLabel="Capacity W"
            minSize={5}
            maxSize={10}
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
  );
}

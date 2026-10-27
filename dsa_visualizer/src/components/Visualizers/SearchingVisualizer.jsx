'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
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

// Searching Step Generators
function generateLinearSearchSteps(arr, target) {
  const steps = [];
  const n = arr.length;
  let comparisons = 0;

  steps.push({
    actionType: 'IDLE',
    currentIndex: -1,
    foundIndex: -1,
    line: 1,
    description: `Starting Linear Search for target value: ${target}.`,
    comparisons: 0,
  });

  for (let i = 0; i < n; i++) {
    comparisons++;
    steps.push({
      actionType: 'COMPARE',
      currentIndex: i,
      foundIndex: -1,
      line: 3,
      description: `Checking index ${i}: Is arr[${i}] (${arr[i]}) == target (${target})?`,
      comparisons,
    });

    if (arr[i] === target) {
      steps.push({
        actionType: 'FOUND',
        currentIndex: i,
        foundIndex: i,
        line: 4,
        description: `Target ${target} successfully found at index ${i}!`,
        comparisons,
      });
      return steps;
    }
  }

  steps.push({
    actionType: 'COMPLETE',
    currentIndex: -1,
    foundIndex: -1,
    line: 7,
    description: `Target ${target} was not found in the array.`,
    comparisons,
  });

  return steps;
}

function generateBinarySearchSteps(arr, target) {
  const steps = [];
  let low = 0;
  let high = arr.length - 1;
  let comparisons = 0;

  steps.push({
    actionType: 'IDLE',
    low,
    high,
    mid: -1,
    foundIndex: -1,
    line: 1,
    description: `Starting Binary Search for target value: ${target} in sorted array.`,
    comparisons: 0,
  });

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    comparisons++;

    steps.push({
      actionType: 'COMPARE',
      low,
      high,
      mid,
      foundIndex: -1,
      line: 6,
      description: `Calculated mid index = ${mid} (value = ${arr[mid]}). Range: [${low}..${high}].`,
      comparisons,
    });

    if (arr[mid] === target) {
      steps.push({
        actionType: 'FOUND',
        low,
        high,
        mid,
        foundIndex: mid,
        line: 7,
        description: `Target ${target} found at mid index ${mid}!`,
        comparisons,
      });
      return steps;
    }

    if (arr[mid] < target) {
      steps.push({
        actionType: 'VISIT',
        low,
        high,
        mid,
        foundIndex: -1,
        line: 9,
        description: `arr[mid] (${arr[mid]}) < ${target}. Discarding left half. Moving low to ${mid + 1}.`,
        comparisons,
      });
      low = mid + 1;
    } else {
      steps.push({
        actionType: 'VISIT',
        low,
        high,
        mid,
        foundIndex: -1,
        line: 11,
        description: `arr[mid] (${arr[mid]}) > ${target}. Discarding right half. Moving high to ${mid - 1}.`,
        comparisons,
      });
      high = mid - 1;
    }
  }

  steps.push({
    actionType: 'COMPLETE',
    low,
    high,
    mid: -1,
    foundIndex: -1,
    line: 14,
    description: `Search space exhausted (low > high). Target ${target} does not exist in array.`,
    comparisons,
  });

  return steps;
}

export default function SearchingVisualizer({ initialAlgorithm = 'binary-search' }) {
  const { mode } = useColorMode();
  const isDark = mode === 'dark';
  const [selectedAlgo, setSelectedAlgo] = useState(initialAlgorithm);
  const [arraySize, setArraySize] = useState(12);
  const [array, setArray] = useState([]);
  const [target, setTarget] = useState(42);
  const [steps, setSteps] = useState([]);
  const [currentStepIdx, setCurrentStepIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);
  const timerRef = useRef(null);

  const algorithmData = ALGORITHMS[selectedAlgo] || ALGORITHMS['binary-search'];

  const initData = useCallback((size = arraySize, algo = selectedAlgo) => {
    let newArr = [];
    if (algo === 'binary-search') {
      // Sorted distinct array
      const set = new Set();
      while (set.size < size) {
        set.add(Math.floor(Math.random() * 88) + 5);
      }
      newArr = Array.from(set).sort((a, b) => a - b);
    } else {
      // Linear search: can be unsorted
      newArr = Array.from({ length: size }, () => Math.floor(Math.random() * 88) + 5);
    }
    setArray(newArr);

    // Pick target: 70% chance from array, 30% outside
    const pickTarget = Math.random() > 0.3 ? newArr[Math.floor(Math.random() * newArr.length)] : 42;
    setTarget(pickTarget);

    const generated = algo === 'binary-search'
      ? generateBinarySearchSteps(newArr, pickTarget)
      : generateLinearSearchSteps(newArr, pickTarget);

    setSteps(generated);
    setCurrentStepIdx(0);
    setIsPlaying(false);
  }, [arraySize, selectedAlgo]);

  useEffect(() => {
    initData(arraySize, selectedAlgo);
  }, [selectedAlgo, arraySize, initData]);

  // Playback timer
  useEffect(() => {
    if (isPlaying) {
      const delay = Math.max(30, Math.floor(500 / speed));
      timerRef.current = setInterval(() => {
        setCurrentStepIdx((prev) => {
          if (prev < steps.length - 1) {
            const nextIdx = prev + 1;
            const nextStep = steps[nextIdx];
            if (nextStep) {
              if (nextStep.actionType === 'COMPARE') soundManager.playCompare(nextStep.mid || 50);
              else if (nextStep.actionType === 'FOUND') soundManager.playSuccess();
              else if (nextStep.actionType === 'VISIT') soundManager.playVisit();
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
    actionType: 'IDLE',
    currentIndex: -1,
    low: 0,
    high: array.length - 1,
    mid: -1,
    foundIndex: -1,
    line: 1,
    description: 'Ready to search.',
    comparisons: 0,
  };

  const handleApplyTarget = (val) => {
    const num = parseInt(val, 10);
    if (!isNaN(num)) {
      setTarget(num);
      const generated = selectedAlgo === 'binary-search'
        ? generateBinarySearchSteps(array, num)
        : generateLinearSearchSteps(array, num);
      setSteps(generated);
      setCurrentStepIdx(0);
      setIsPlaying(false);
    }
  };

  const searchAlgos = [
    { slug: 'binary-search', label: 'Binary Search', badge: 'O(log n)' },
    { slug: 'linear-search', label: 'Linear Search', badge: 'O(n)' },
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
      {/* Secondary Left Sidebar / SideDrawer for Searching */}
      <SecondarySidebar
        title="Searching Suite"
        category="Searching"
        items={searchAlgos}
        activeSlug={selectedAlgo}
        onSelect={setSelectedAlgo}
      />

      {/* Main Content Area */}
      <Box sx={{ flex: 1, minWidth: 0, width: '100%' }}>
        {/* Header */}
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
        {/* Step Explanation Banner */}
        <StepExplanation
          stepNumber={currentStepIdx + 1}
          totalSteps={steps.length}
          actionType={currentStep.actionType}
          description={currentStep.description}
          stats={{ comparisons: currentStep.comparisons }}
        />

        {/* Target Selector Bar */}
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 2,
            mb: 3,
            p: 1.5,
            borderRadius: 2,
            backgroundColor: isDark ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.03)',
            border: isDark ? '1px solid rgba(255, 255, 255, 0.06)' : '1px solid rgba(0, 0, 0, 0.06)',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Typography variant="body2" sx={{ color: isDark ? '#cbd5e1' : '#0f172a', fontWeight: 700 }}>
              Search Target:
            </Typography>
            <Box
              sx={{
                px: 2,
                py: 0.5,
                borderRadius: 1.5,
                backgroundColor: isDark ? 'rgba(56, 189, 248, 0.15)' : 'rgba(2, 132, 199, 0.12)',
                border: isDark ? '1px solid #38bdf8' : '1px solid #0284c7',
                color: isDark ? '#38bdf8' : '#0369a1',
                fontWeight: 800,
                fontSize: '1rem',
                fontFamily: 'monospace',
              }}
            >
              {target}
            </Box>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="caption" sx={{ color: isDark ? '#64748b' : '#475569', fontWeight: 600 }}>Change Target:</Typography>
            <Box sx={{ display: 'flex', gap: 0.75, flexWrap: 'wrap' }}>
              {array.slice(0, 5).map((val) => (
                <Button
                  key={val}
                  size="small"
                  onClick={() => handleApplyTarget(val)}
                  sx={{
                    minWidth: 36,
                    px: 1,
                    py: 0.25,
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    color: target === val ? '#ffffff' : (isDark ? '#94a3b8' : '#334155'),
                    backgroundColor: target === val ? '#0284c7' : (isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.06)'),
                    borderRadius: 1.5,
                  }}
                >
                  {val}
                </Button>
              ))}
            </Box>
          </Box>
        </Box>

        {/* Search Array Elements Stage */}
        <Box
          sx={{
            minHeight: 220,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: 1.5,
            p: 3,
            borderRadius: 2,
            backgroundColor: isDark ? 'rgba(9, 13, 22, 0.6)' : 'rgba(241, 245, 249, 0.95)',
            border: isDark ? '1px solid rgba(255, 255, 255, 0.04)' : '1px solid rgba(0, 0, 0, 0.06)',
          }}
        >
          {array.map((val, idx) => {
            let isCurrent = false;
            let isMid = false;
            let isFound = currentStep.foundIndex === idx;
            let isOutsideRange = false;

            if (selectedAlgo === 'linear-search') {
              isCurrent = currentStep.currentIndex === idx;
            } else {
              isMid = currentStep.mid === idx;
              isOutsideRange = idx < currentStep.low || idx > currentStep.high;
            }

            let boxBg = isDark ? 'rgba(15, 23, 42, 0.8)' : '#ffffff';
            let borderColor = isDark ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.12)';
            let textColor = isDark ? '#f8fafc' : '#0f172a';

            if (isFound) {
              boxBg = isDark ? 'rgba(16, 185, 129, 0.25)' : 'rgba(16, 185, 129, 0.2)';
              borderColor = '#10b981';
              textColor = isDark ? '#10b981' : '#047857';
            } else if (isMid) {
              boxBg = isDark ? 'rgba(245, 158, 11, 0.25)' : 'rgba(249, 115, 22, 0.18)';
              borderColor = '#f97316';
              textColor = isDark ? '#f97316' : '#c2410c';
            } else if (isCurrent) {
              boxBg = isDark ? 'rgba(56, 189, 248, 0.25)' : 'rgba(2, 132, 199, 0.18)';
              borderColor = '#0ea5e9';
              textColor = isDark ? '#38bdf8' : '#0369a1';
            } else if (isOutsideRange && selectedAlgo === 'binary-search') {
              boxBg = isDark ? 'rgba(15, 23, 42, 0.2)' : 'rgba(0, 0, 0, 0.04)';
              borderColor = isDark ? 'rgba(255, 255, 255, 0.04)' : 'rgba(0, 0, 0, 0.06)';
              textColor = isDark ? '#475569' : '#94a3b8';
            }

            return (
              <Box
                key={idx}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 0.5,
                }}
              >
                {/* Pointer Badge above element */}
                <Box sx={{ height: 22, display: 'flex', alignItems: 'center' }}>
                  {selectedAlgo === 'binary-search' && currentStep.low === idx && (
                    <Typography variant="caption" sx={{ color: isDark ? '#38bdf8' : '#0284c7', fontWeight: 800, fontSize: '0.7rem' }}>
                      L
                    </Typography>
                  )}
                  {selectedAlgo === 'binary-search' && currentStep.mid === idx && (
                    <Typography variant="caption" sx={{ color: isDark ? '#f59e0b' : '#d97706', fontWeight: 800, fontSize: '0.7rem', mx: 0.5 }}>
                      MID
                    </Typography>
                  )}
                  {selectedAlgo === 'binary-search' && currentStep.high === idx && (
                    <Typography variant="caption" sx={{ color: isDark ? '#ec4899' : '#be185d', fontWeight: 800, fontSize: '0.7rem' }}>
                      R
                    </Typography>
                  )}
                  {selectedAlgo === 'linear-search' && isCurrent && (
                    <Typography variant="caption" sx={{ color: isDark ? '#38bdf8' : '#0284c7', fontWeight: 800, fontSize: '0.7rem' }}>
                      ▼
                    </Typography>
                  )}
                </Box>

                {/* Main Value Box */}
                <Box
                  sx={{
                    width: { xs: 46, sm: 54 },
                    height: { xs: 54, sm: 62 },
                    borderRadius: 2,
                    backgroundColor: boxBg,
                    border: `2px solid ${borderColor}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: isFound ? '0 0 20px #10b981' : isMid ? '0 0 15px #f59e0b' : isCurrent ? '0 0 15px #38bdf8' : (isDark ? 'none' : '0 2px 4px rgba(0,0,0,0.05)'),
                    transition: 'all 0.2s ease',
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 800,
                      color: textColor,
                      fontFamily: 'monospace',
                    }}
                  >
                    {val}
                  </Typography>
                </Box>

                {/* Index label below */}
                <Typography variant="caption" sx={{ color: isDark ? '#64748b' : '#64748b', fontSize: '0.7rem', fontFamily: 'monospace', fontWeight: 600 }}>
                  [{idx}]
                </Typography>
              </Box>
            );
          })}
        </Box>

        {/* Legend */}
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 2.5,
            mt: 2.5,
            pt: 2,
            borderTop: isDark ? '1px solid rgba(255, 255, 255, 0.06)' : '1px solid rgba(0, 0, 0, 0.08)',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
            <Box sx={{ width: 12, height: 12, borderRadius: 0.5, backgroundColor: isDark ? '#38bdf8' : '#0284c7' }} />
            <Typography variant="caption" sx={{ color: isDark ? '#94a3b8' : '#475569', fontWeight: 600 }}>Low (L) / Current</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
            <Box sx={{ width: 12, height: 12, borderRadius: 0.5, backgroundColor: isDark ? '#f59e0b' : '#d97706' }} />
            <Typography variant="caption" sx={{ color: isDark ? '#94a3b8' : '#475569', fontWeight: 600 }}>Mid (M)</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
            <Box sx={{ width: 12, height: 12, borderRadius: 0.5, backgroundColor: '#ec4899' }} />
            <Typography variant="caption" sx={{ color: isDark ? '#94a3b8' : '#475569', fontWeight: 600 }}>High (R)</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
            <Box sx={{ width: 12, height: 12, borderRadius: 0.5, backgroundColor: '#10b981' }} />
            <Typography variant="caption" sx={{ color: isDark ? '#94a3b8' : '#475569', fontWeight: 600 }}>Found Target</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
            <Box sx={{ width: 12, height: 12, borderRadius: 0.5, backgroundColor: isDark ? '#475569' : '#94a3b8' }} />
            <Typography variant="caption" sx={{ color: isDark ? '#94a3b8' : '#475569', fontWeight: 600 }}>Discarded Range</Typography>
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
            onRandomize={() => initData(arraySize, selectedAlgo)}
            canStepBack={currentStepIdx > 0}
            canStepForward={currentStepIdx < steps.length - 1}
            speed={speed}
            onSpeedChange={setSpeed}
            size={arraySize}
            onSizeChange={setArraySize}
            sizeLabel="Elements"
            minSize={6}
            maxSize={20}
          />
        </Box>
      </Paper>

      {/* Synchronized Pseudocode & Implementation Code */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', lg: '1fr 1fr' },
          gap: 3,
          mb: 4,
        }}
      >
        <PseudocodeViewer
          pseudocode={algorithmData.pseudocode}
          activeLine={currentStep.line}
        />

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

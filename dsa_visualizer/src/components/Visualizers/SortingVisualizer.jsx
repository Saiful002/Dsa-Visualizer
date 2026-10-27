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

// Sorting Algorithms Step Generators
function generateBubbleSortSteps(initialArr) {
  const steps = [];
  const arr = [...initialArr];
  const n = arr.length;
  let comparisons = 0;
  let swaps = 0;

  steps.push({
    array: [...arr],
    actionType: 'IDLE',
    indices: [],
    line: 1,
    description: 'Starting Bubble Sort on array.',
    comparisons,
    swaps,
    sortedIndices: [],
  });

  const sorted = [];
  for (let i = 0; i < n - 1; i++) {
    let swapped = false;
    for (let j = 0; j < n - i - 1; j++) {
      comparisons++;
      steps.push({
        array: [...arr],
        actionType: 'COMPARE',
        indices: [j, j + 1],
        line: 6,
        description: `Comparing elements arr[${j}] = ${arr[j]} and arr[${j + 1}] = ${arr[j + 1]}.`,
        comparisons,
        swaps,
        sortedIndices: [...sorted],
      });

      if (arr[j] > arr[j + 1]) {
        swaps++;
        const temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
        swapped = true;

        steps.push({
          array: [...arr],
          actionType: 'SWAP',
          indices: [j, j + 1],
          line: 7,
          description: `${temp} > ${arr[j]}, swapping arr[${j}] and arr[${j + 1}].`,
          comparisons,
          swaps,
          sortedIndices: [...sorted],
        });
      }
    }
    sorted.push(n - i - 1);
    if (!swapped) break;
  }
  for (let i = 0; i < n; i++) if (!sorted.includes(i)) sorted.push(i);

  steps.push({
    array: [...arr],
    actionType: 'COMPLETE',
    indices: [],
    line: 13,
    description: 'Bubble Sort completed! All elements are sorted in ascending order.',
    comparisons,
    swaps,
    sortedIndices: sorted,
  });

  return steps;
}

function generateSelectionSortSteps(initialArr) {
  const steps = [];
  const arr = [...initialArr];
  const n = arr.length;
  let comparisons = 0;
  let swaps = 0;
  const sorted = [];

  steps.push({
    array: [...arr],
    actionType: 'IDLE',
    indices: [],
    line: 1,
    description: 'Starting Selection Sort.',
    comparisons,
    swaps,
    sortedIndices: [],
  });

  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;
    steps.push({
      array: [...arr],
      actionType: 'VISIT',
      indices: [i],
      line: 4,
      description: `Assuming arr[${i}] = ${arr[i]} is minimum for position ${i}.`,
      comparisons,
      swaps,
      sortedIndices: [...sorted],
    });

    for (let j = i + 1; j < n; j++) {
      comparisons++;
      steps.push({
        array: [...arr],
        actionType: 'COMPARE',
        indices: [minIdx, j],
        line: 6,
        description: `Comparing current minimum arr[${minIdx}] = ${arr[minIdx]} with arr[${j}] = ${arr[j]}.`,
        comparisons,
        swaps,
        sortedIndices: [...sorted],
      });

      if (arr[j] < arr[minIdx]) {
        minIdx = j;
        steps.push({
          array: [...arr],
          actionType: 'VISIT',
          indices: [minIdx],
          line: 7,
          description: `Found new smaller minimum: arr[${minIdx}] = ${arr[minIdx]}.`,
          comparisons,
          swaps,
          sortedIndices: [...sorted],
        });
      }
    }

    if (minIdx !== i) {
      swaps++;
      const temp = arr[i];
      arr[i] = arr[minIdx];
      arr[minIdx] = temp;

      steps.push({
        array: [...arr],
        actionType: 'SWAP',
        indices: [i, minIdx],
        line: 11,
        description: `Swapping found minimum ${arr[i]} into sorted index ${i}.`,
        comparisons,
        swaps,
        sortedIndices: [...sorted],
      });
    }
    sorted.push(i);
  }
  sorted.push(n - 1);

  steps.push({
    array: [...arr],
    actionType: 'COMPLETE',
    indices: [],
    line: 14,
    description: 'Selection Sort completed! Array is fully sorted.',
    comparisons,
    swaps,
    sortedIndices: sorted,
  });

  return steps;
}

function generateInsertionSortSteps(initialArr) {
  const steps = [];
  const arr = [...initialArr];
  const n = arr.length;
  let comparisons = 0;
  let swaps = 0;
  const sorted = [0];

  steps.push({
    array: [...arr],
    actionType: 'IDLE',
    indices: [],
    line: 1,
    description: 'Starting Insertion Sort. The first element is trivially sorted.',
    comparisons,
    swaps,
    sortedIndices: [0],
  });

  for (let i = 1; i < n; i++) {
    const key = arr[i];
    let j = i - 1;

    steps.push({
      array: [...arr],
      actionType: 'VISIT',
      indices: [i],
      line: 3,
      description: `Picking key arr[${i}] = ${key} to insert into sorted prefix.`,
      comparisons,
      swaps,
      sortedIndices: [...sorted],
    });

    while (j >= 0) {
      comparisons++;
      steps.push({
        array: [...arr],
        actionType: 'COMPARE',
        indices: [j, j + 1],
        line: 5,
        description: `Comparing prefix element arr[${j}] = ${arr[j]} with key = ${key}.`,
        comparisons,
        swaps,
        sortedIndices: [...sorted],
      });

      if (arr[j] > key) {
        swaps++;
        arr[j + 1] = arr[j];
        steps.push({
          array: [...arr],
          actionType: 'OVERWRITE',
          indices: [j + 1],
          line: 6,
          description: `${arr[j]} > ${key}: shifting arr[${j}] right to position ${j + 1}.`,
          comparisons,
          swaps,
          sortedIndices: [...sorted],
        });
        j--;
      } else {
        break;
      }
    }
    arr[j + 1] = key;
    sorted.push(i);

    steps.push({
      array: [...arr],
      actionType: 'OVERWRITE',
      indices: [j + 1],
      line: 9,
      description: `Inserted key ${key} into position ${j + 1}.`,
      comparisons,
      swaps,
      sortedIndices: [...sorted],
    });
  }

  steps.push({
    array: [...arr],
    actionType: 'COMPLETE',
    indices: [],
    line: 11,
    description: 'Insertion Sort completed!',
    comparisons,
    swaps,
    sortedIndices: Array.from({ length: n }, (_, idx) => idx),
  });

  return steps;
}

function generateQuickSortSteps(initialArr) {
  const steps = [];
  const arr = [...initialArr];
  let comparisons = 0;
  let swaps = 0;
  const sorted = [];

  function partition(low, high) {
    const pivot = arr[high];
    let i = low - 1;

    steps.push({
      array: [...arr],
      actionType: 'VISIT',
      indices: [high],
      pivotIdx: high,
      line: 9,
      description: `Selected pivot arr[${high}] = ${pivot}. Partitioning range [${low}..${high}].`,
      comparisons,
      swaps,
      sortedIndices: [...sorted],
    });

    for (let j = low; j < high; j++) {
      comparisons++;
      steps.push({
        array: [...arr],
        actionType: 'COMPARE',
        indices: [j, high],
        pivotIdx: high,
        line: 12,
        description: `Comparing arr[${j}] = ${arr[j]} with pivot = ${pivot}.`,
        comparisons,
        swaps,
        sortedIndices: [...sorted],
      });

      if (arr[j] < pivot) {
        i++;
        swaps++;
        const temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;

        steps.push({
          array: [...arr],
          actionType: 'SWAP',
          indices: [i, j],
          pivotIdx: high,
          line: 13,
          description: `${arr[i]} < ${pivot}: swapping to smaller section at index ${i}.`,
          comparisons,
          swaps,
          sortedIndices: [...sorted],
        });
      }
    }

    swaps++;
    const temp = arr[i + 1];
    arr[i + 1] = arr[high];
    arr[high] = temp;
    sorted.push(i + 1);

    steps.push({
      array: [...arr],
      actionType: 'SWAP',
      indices: [i + 1, high],
      pivotIdx: i + 1,
      line: 14,
      description: `Placed pivot ${pivot} into its correct sorted location at index ${i + 1}.`,
      comparisons,
      swaps,
      sortedIndices: [...sorted],
    });

    return i + 1;
  }

  function qSort(low, high) {
    if (low < high) {
      const pi = partition(low, high);
      qSort(low, pi - 1);
      qSort(pi + 1, high);
    } else if (low === high) {
      if (!sorted.includes(low)) sorted.push(low);
    }
  }

  qSort(0, arr.length - 1);

  steps.push({
    array: [...arr],
    actionType: 'COMPLETE',
    indices: [],
    line: 7,
    description: 'Quick Sort completed! All partitions sorted.',
    comparisons,
    swaps,
    sortedIndices: Array.from({ length: arr.length }, (_, idx) => idx),
  });

  return steps;
}

function generateMergeSortSteps(initialArr) {
  const steps = [];
  const arr = [...initialArr];
  let comparisons = 0;
  let swaps = 0;
  const sorted = [];

  function merge(l, m, r) {
    const leftArr = arr.slice(l, m + 1);
    const rightArr = arr.slice(m + 1, r + 1);
    let i = 0, j = 0, k = l;

    steps.push({
      array: [...arr],
      actionType: 'VISIT',
      indices: [l, r],
      line: 6,
      description: `Merging sorted segments [${l}..${m}] and [${m + 1}..${r}].`,
      comparisons,
      swaps,
      sortedIndices: [...sorted],
    });

    while (i < leftArr.length && j < rightArr.length) {
      comparisons++;
      steps.push({
        array: [...arr],
        actionType: 'COMPARE',
        indices: [l + i, m + 1 + j],
        line: 6,
        description: `Comparing ${leftArr[i]} and ${rightArr[j]}.`,
        comparisons,
        swaps,
        sortedIndices: [...sorted],
      });

      if (leftArr[i] <= rightArr[j]) {
        arr[k] = leftArr[i];
        i++;
      } else {
        arr[k] = rightArr[j];
        j++;
      }
      swaps++;
      steps.push({
        array: [...arr],
        actionType: 'OVERWRITE',
        indices: [k],
        line: 6,
        description: `Placed ${arr[k]} at index ${k}.`,
        comparisons,
        swaps,
        sortedIndices: [...sorted],
      });
      k++;
    }

    while (i < leftArr.length) {
      arr[k] = leftArr[i];
      swaps++;
      steps.push({
        array: [...arr],
        actionType: 'OVERWRITE',
        indices: [k],
        line: 6,
        description: `Flushed remaining left element ${arr[k]} to index ${k}.`,
        comparisons,
        swaps,
        sortedIndices: [...sorted],
      });
      i++;
      k++;
    }

    while (j < rightArr.length) {
      arr[k] = rightArr[j];
      swaps++;
      steps.push({
        array: [...arr],
        actionType: 'OVERWRITE',
        indices: [k],
        line: 6,
        description: `Flushed remaining right element ${arr[k]} to index ${k}.`,
        comparisons,
        swaps,
        sortedIndices: [...sorted],
      });
      j++;
      k++;
    }
  }

  function mSort(l, r) {
    if (l < r) {
      const m = Math.floor((l + r) / 2);
      mSort(l, m);
      mSort(m + 1, r);
      merge(l, m, r);
    }
  }

  mSort(0, arr.length - 1);

  steps.push({
    array: [...arr],
    actionType: 'COMPLETE',
    indices: [],
    line: 8,
    description: 'Merge Sort completed! Halves recursively merged in sorted order.',
    comparisons,
    swaps,
    sortedIndices: Array.from({ length: arr.length }, (_, idx) => idx),
  });

  return steps;
}

function generateHeapSortSteps(initialArr) {
  const steps = [];
  const arr = [...initialArr];
  const n = arr.length;
  let comparisons = 0;
  let swaps = 0;
  const sorted = [];

  function heapify(size, i) {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;

    if (left < size) {
      comparisons++;
      if (arr[left] > arr[largest]) largest = left;
    }
    if (right < size) {
      comparisons++;
      if (arr[right] > arr[largest]) largest = right;
    }

    if (largest !== i) {
      swaps++;
      const temp = arr[i];
      arr[i] = arr[largest];
      arr[largest] = temp;

      steps.push({
        array: [...arr],
        actionType: 'SWAP',
        indices: [i, largest],
        line: 4,
        description: `Heapify: swapped parent ${temp} with larger child ${arr[i]}.`,
        comparisons,
        swaps,
        sortedIndices: [...sorted],
      });

      heapify(size, largest);
    }
  }

  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(n, i);
  }

  for (let i = n - 1; i > 0; i--) {
    swaps++;
    const temp = arr[0];
    arr[0] = arr[i];
    arr[i] = temp;
    sorted.push(i);

    steps.push({
      array: [...arr],
      actionType: 'SWAP',
      indices: [0, i],
      line: 6,
      description: `Extracted maximum root ${temp} and placed at sorted end index ${i}.`,
      comparisons,
      swaps,
      sortedIndices: [...sorted],
    });

    heapify(i, 0);
  }
  sorted.push(0);

  steps.push({
    array: [...arr],
    actionType: 'COMPLETE',
    indices: [],
    line: 8,
    description: 'Heap Sort completed!',
    comparisons,
    swaps,
    sortedIndices: sorted,
  });

  return steps;
}

export default function SortingVisualizer({ initialAlgorithm = 'bubble-sort' }) {
  const [selectedAlgo, setSelectedAlgo] = useState(initialAlgorithm);
  const [arraySize, setArraySize] = useState(15);
  const [array, setArray] = useState([]);
  const [steps, setSteps] = useState([]);
  const [currentStepIdx, setCurrentStepIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);
  const timerRef = useRef(null);

  const algorithmData = ALGORITHMS[selectedAlgo] || ALGORITHMS['bubble-sort'];

  // Generate random array
  const generateRandomArray = useCallback((size = arraySize) => {
    const newArr = Array.from({ length: size }, () => Math.floor(Math.random() * 85) + 10);
    setArray(newArr);
    return newArr;
  }, [arraySize]);

  // Compute steps for current algorithm and array
  const computeSteps = useCallback((arr, algo) => {
    let generated = [];
    switch (algo) {
      case 'selection-sort':
        generated = generateSelectionSortSteps(arr);
        break;
      case 'insertion-sort':
        generated = generateInsertionSortSteps(arr);
        break;
      case 'quick-sort':
        generated = generateQuickSortSteps(arr);
        break;
      case 'merge-sort':
        generated = generateMergeSortSteps(arr);
        break;
      case 'heap-sort':
        generated = generateHeapSortSteps(arr);
        break;
      case 'bubble-sort':
      default:
        generated = generateBubbleSortSteps(arr);
        break;
    }
    setSteps(generated);
    setCurrentStepIdx(0);
    setIsPlaying(false);
  }, []);

  // Initial load
  useEffect(() => {
    const initial = generateRandomArray(arraySize);
    computeSteps(initial, selectedAlgo);
  }, [selectedAlgo, arraySize, computeSteps, generateRandomArray]);

  // Playback timer
  useEffect(() => {
    if (isPlaying) {
      const delay = Math.max(20, Math.floor(400 / speed));
      timerRef.current = setInterval(() => {
        setCurrentStepIdx((prev) => {
          if (prev < steps.length - 1) {
            const nextIdx = prev + 1;
            const nextStep = steps[nextIdx];
            if (nextStep) {
              if (nextStep.actionType === 'COMPARE') {
                soundManager.playCompare(nextStep.array[nextStep.indices[0]] || 50);
              } else if (nextStep.actionType === 'SWAP' || nextStep.actionType === 'OVERWRITE') {
                soundManager.playSwap(nextStep.array[nextStep.indices[0]] || 50);
              } else if (nextStep.actionType === 'COMPLETE') {
                soundManager.playSuccess();
              }
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
    array,
    actionType: 'IDLE',
    indices: [],
    line: 1,
    description: 'Ready to visualize.',
    comparisons: 0,
    swaps: 0,
    sortedIndices: [],
  };

  const currentDisplayArray = currentStep.array || array;

  // Handlers
  const handlePlayPause = () => {
    if (currentStepIdx >= steps.length - 1) {
      setCurrentStepIdx(0);
      setIsPlaying(true);
    } else {
      setIsPlaying(!isPlaying);
    }
  };

  const handleStepBack = () => {
    if (currentStepIdx > 0) {
      setCurrentStepIdx((prev) => prev - 1);
      setIsPlaying(false);
    }
  };

  const handleStepForward = () => {
    if (currentStepIdx < steps.length - 1) {
      setCurrentStepIdx((prev) => prev + 1);
      setIsPlaying(false);
    }
  };

  const handleRestart = () => {
    setCurrentStepIdx(0);
    setIsPlaying(false);
  };

  const handleRandomize = () => {
    const newArr = generateRandomArray(arraySize);
    computeSteps(newArr, selectedAlgo);
  };

  const handleCustomInput = (inputStr) => {
    const parsed = inputStr
      .split(',')
      .map((s) => parseInt(s.trim(), 10))
      .filter((n) => !isNaN(n) && n > 0 && n <= 100);

    if (parsed.length >= 3) {
      setArray(parsed);
      setArraySize(parsed.length);
      computeSteps(parsed, selectedAlgo);
    }
  };

  const sortingAlgos = [
    { slug: 'bubble-sort', label: 'Bubble Sort', badge: 'O(n²)' },
    { slug: 'selection-sort', label: 'Selection Sort', badge: 'O(n²)' },
    { slug: 'insertion-sort', label: 'Insertion Sort', badge: 'O(n²)' },
    { slug: 'merge-sort', label: 'Merge Sort', badge: 'O(n log n)' },
    { slug: 'quick-sort', label: 'Quick Sort', badge: 'O(n log n)' },
    { slug: 'heap-sort', label: 'Heap Sort', badge: 'O(n log n)' },
  ];

  const maxVal = Math.max(...currentDisplayArray, 100);

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
      {/* Secondary Left Sidebar / SideDrawer for Algorithms */}
      <SecondarySidebar
        title="Sorting Suite"
        category="Sorting"
        items={sortingAlgos}
        activeSlug={selectedAlgo}
        onSelect={setSelectedAlgo}
      />

      {/* Main Content Area */}
      <Box sx={{ flex: 1, minWidth: 0, width: '100%' }}>
        {/* Header with Title and Complexity Cards */}
        <AlgorithmHeader algorithm={algorithmData} />

        {/* Hero Visualizer Canvas */}
        <Paper
          elevation={0}
          sx={{
            p: { xs: 2, sm: 3 },
            borderRadius: 3,
            backgroundColor: (theme) =>
              theme.palette.mode === 'dark' ? 'rgba(15, 23, 42, 0.75)' : 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(16px)',
            border: (theme) =>
              theme.palette.mode === 'dark' ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid rgba(0, 0, 0, 0.08)',
            boxShadow: (theme) =>
              theme.palette.mode === 'dark' ? '0 20px 40px rgba(0, 0, 0, 0.4)' : '0 10px 30px rgba(0, 0, 0, 0.05)',
            mb: 3,
          }}
        >
        {/* Step Explanation Banner */}
        <StepExplanation
          stepNumber={currentStepIdx + 1}
          totalSteps={steps.length}
          actionType={currentStep.actionType}
          description={currentStep.description}
          stats={{
            comparisons: currentStep.comparisons,
            swaps: currentStep.swaps,
          }}
        />

        {/* Visualizer Bar Chart Canvas */}
        <Box
          sx={{
            height: { xs: 260, sm: 340, md: 380 },
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'center',
            gap: { xs: 0.5, sm: 1 },
            px: { xs: 1, sm: 2 },
            pb: 2,
            pt: 4,
            borderRadius: 2,
            backgroundColor: (theme) =>
              theme.palette.mode === 'dark' ? 'rgba(9, 13, 22, 0.6)' : 'rgba(241, 245, 249, 0.95)',
            border: (theme) =>
              theme.palette.mode === 'dark' ? '1px solid rgba(255, 255, 255, 0.04)' : '1px solid rgba(0, 0, 0, 0.06)',
            overflowX: 'auto',
          }}
        >
          {currentDisplayArray.map((val, idx) => {
            const isComparing = currentStep.indices?.includes(idx) && currentStep.actionType === 'COMPARE';
            const isSwapping = currentStep.indices?.includes(idx) && (currentStep.actionType === 'SWAP' || currentStep.actionType === 'OVERWRITE');
            const isPivot = currentStep.pivotIdx === idx;
            const isSorted = currentStep.sortedIndices?.includes(idx) || currentStep.actionType === 'COMPLETE';
            const isVisiting = currentStep.indices?.includes(idx) && currentStep.actionType === 'VISIT';

            let barColor = '#0ea5e9'; // brand cyan (D)
            if (isSorted) barColor = '#10b981'; // brand emerald (S)
            if (isVisiting) barColor = '#38bdf8'; // light cyan
            if (isPivot) barColor = '#f59e0b'; // amber
            if (isComparing) barColor = '#f97316'; // brand sunset orange (A)
            if (isSwapping) barColor = '#ef4444'; // coral red

            const heightPct = Math.max(12, Math.round((val / maxVal) * 100));

            return (
              <Box
                key={idx}
                sx={{
                  flex: 1,
                  maxWidth: 48,
                  minWidth: 14,
                  height: `${heightPct}%`,
                  backgroundColor: barColor,
                  borderRadius: '6px 6px 2px 2px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  pt: 0.75,
                  pb: 0.5,
                  boxShadow: isComparing || isSwapping ? `0 0 16px ${barColor}` : 'none',
                  transition: isPlaying ? 'height 0.1s ease, background-color 0.1s ease' : 'all 0.2s ease',
                  cursor: 'default',
                }}
              >
                <Typography
                  variant="caption"
                  sx={{
                    color: '#ffffff',
                    fontWeight: 700,
                    fontSize: { xs: '0.65rem', sm: '0.75rem' },
                    userSelect: 'none',
                    display: currentDisplayArray.length > 25 ? 'none' : 'block',
                  }}
                >
                  {val}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    color: 'rgba(255, 255, 255, 0.7)',
                    fontSize: '0.6rem',
                    fontFamily: 'monospace',
                    display: { xs: 'none', sm: currentDisplayArray.length > 30 ? 'none' : 'block' },
                  }}
                >
                  {idx}
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
            borderTop: (theme) =>
              theme.palette.mode === 'dark' ? '1px solid rgba(255, 255, 255, 0.06)' : '1px solid rgba(0, 0, 0, 0.08)',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
            <Box sx={{ width: 12, height: 12, borderRadius: 0.5, backgroundColor: '#0ea5e9' }} />
            <Typography variant="caption" sx={{ color: (theme) => theme.palette.mode === 'dark' ? '#94a3b8' : '#475569', fontWeight: 600 }}>Default (D)</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
            <Box sx={{ width: 12, height: 12, borderRadius: 0.5, backgroundColor: '#f97316' }} />
            <Typography variant="caption" sx={{ color: (theme) => theme.palette.mode === 'dark' ? '#94a3b8' : '#475569', fontWeight: 600 }}>Comparing (A)</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
            <Box sx={{ width: 12, height: 12, borderRadius: 0.5, backgroundColor: '#ef4444' }} />
            <Typography variant="caption" sx={{ color: (theme) => theme.palette.mode === 'dark' ? '#94a3b8' : '#475569', fontWeight: 600 }}>Swapping</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
            <Box sx={{ width: 12, height: 12, borderRadius: 0.5, backgroundColor: '#f59e0b' }} />
            <Typography variant="caption" sx={{ color: (theme) => theme.palette.mode === 'dark' ? '#94a3b8' : '#475569', fontWeight: 600 }}>Pivot</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
            <Box sx={{ width: 12, height: 12, borderRadius: 0.5, backgroundColor: '#10b981' }} />
            <Typography variant="caption" sx={{ color: (theme) => theme.palette.mode === 'dark' ? '#94a3b8' : '#475569', fontWeight: 600 }}>Sorted (S)</Typography>
          </Box>
        </Box>

        {/* Interactive Controls Toolbar */}
        <Box sx={{ mt: 3 }}>
          <VisualizationControls
            isPlaying={isPlaying}
            onPlayPause={handlePlayPause}
            onStepBack={handleStepBack}
            onStepForward={handleStepForward}
            onRestart={handleRestart}
            onRandomize={handleRandomize}
            canStepBack={currentStepIdx > 0}
            canStepForward={currentStepIdx < steps.length - 1}
            speed={speed}
            onSpeedChange={setSpeed}
            size={arraySize}
            onSizeChange={(val) => setArraySize(val)}
            onCustomInput={handleCustomInput}
            sizeLabel="Elements"
            minSize={6}
            maxSize={35}
          />
        </Box>
      </Paper>

      {/* Synchronized Pseudocode & Implementation Code Columns */}
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

      {/* Theory & Learning Guide */}
      <TheorySection theory={algorithmData.theory} />
      </Box>
    </Box>
  );
}

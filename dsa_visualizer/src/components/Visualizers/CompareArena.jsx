'use client';

import React, { useState, useEffect, useRef } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';
import Slider from '@mui/material/Slider';
import { soundManager } from '../../utils/audio';

export default function CompareArena() {
  const [arraySize, setArraySize] = useState(25);
  const [initialArray, setInitialArray] = useState([]);
  const [isRacing, setIsRacing] = useState(false);
  const [speed, setSpeed] = useState(1);

  // States for each competitor algorithm
  const [bubbleState, setBubbleState] = useState({ arr: [], comparisons: 0, swaps: 0, finished: false, step: 0 });
  const [insertionState, setInsertionState] = useState({ arr: [], comparisons: 0, swaps: 0, finished: false, step: 0 });
  const [quickState, setQuickState] = useState({ arr: [], comparisons: 0, swaps: 0, finished: false, step: 0 });
  const [mergeState, setMergeState] = useState({ arr: [], comparisons: 0, swaps: 0, finished: false, step: 0 });

  const timerRef = useRef(null);
  const generatorsRef = useRef({});

  const generateData = (size = arraySize) => {
    const raw = Array.from({ length: size }, () => Math.floor(Math.random() * 85) + 10);
    setInitialArray(raw);
    resetRacers(raw);
  };

  const resetRacers = (raw = initialArray) => {
    if (timerRef.current) clearInterval(timerRef.current);
    setIsRacing(false);
    setBubbleState({ arr: [...raw], comparisons: 0, swaps: 0, finished: false, step: 0 });
    setInsertionState({ arr: [...raw], comparisons: 0, swaps: 0, finished: false, step: 0 });
    setQuickState({ arr: [...raw], comparisons: 0, swaps: 0, finished: false, step: 0 });
    setMergeState({ arr: [...raw], comparisons: 0, swaps: 0, finished: false, step: 0 });
  };

  useEffect(() => {
    generateData(arraySize);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [arraySize]);

  // Step generators for comparison race
  function* bubbleSortGen(arr) {
    const n = arr.length;
    let comparisons = 0, swaps = 0;
    for (let i = 0; i < n - 1; i++) {
      let swapped = false;
      for (let j = 0; j < n - i - 1; j++) {
        comparisons++;
        if (arr[j] > arr[j + 1]) {
          swaps++;
          const t = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = t;
          swapped = true;
        }
        yield { arr: [...arr], comparisons, swaps, finished: false };
      }
      if (!swapped) break;
    }
    yield { arr: [...arr], comparisons, swaps, finished: true };
  }

  function* insertionSortGen(arr) {
    const n = arr.length;
    let comparisons = 0, swaps = 0;
    for (let i = 1; i < n; i++) {
      const key = arr[i];
      let j = i - 1;
      while (j >= 0) {
        comparisons++;
        if (arr[j] > key) {
          swaps++;
          arr[j + 1] = arr[j];
          j--;
          yield { arr: [...arr], comparisons, swaps, finished: false };
        } else {
          break;
        }
      }
      arr[j + 1] = key;
      yield { arr: [...arr], comparisons, swaps, finished: false };
    }
    yield { arr: [...arr], comparisons, swaps, finished: true };
  }

  function* quickSortGen(arr) {
    let comparisons = 0, swaps = 0;
    function* partition(low, high) {
      const pivot = arr[high];
      let i = low - 1;
      for (let j = low; j < high; j++) {
        comparisons++;
        if (arr[j] < pivot) {
          i++;
          swaps++;
          const t = arr[i];
          arr[i] = arr[j];
          arr[j] = t;
          yield { arr: [...arr], comparisons, swaps, finished: false };
        }
      }
      swaps++;
      const t = arr[i + 1];
      arr[i + 1] = arr[high];
      arr[high] = t;
      yield { arr: [...arr], comparisons, swaps, finished: false };
      return i + 1;
    }

    function* qSort(low, high) {
      if (low < high) {
        const pi = yield* partition(low, high);
        yield* qSort(low, pi - 1);
        yield* qSort(pi + 1, high);
      }
    }

    yield* qSort(0, arr.length - 1);
    yield { arr: [...arr], comparisons, swaps, finished: true };
  }

  function* mergeSortGen(arr) {
    let comparisons = 0, swaps = 0;
    function* merge(l, m, r) {
      const left = arr.slice(l, m + 1);
      const right = arr.slice(m + 1, r + 1);
      let i = 0, j = 0, k = l;
      while (i < left.length && j < right.length) {
        comparisons++;
        if (left[i] <= right[j]) {
          arr[k++] = left[i++];
        } else {
          arr[k++] = right[j++];
        }
        swaps++;
        yield { arr: [...arr], comparisons, swaps, finished: false };
      }
      while (i < left.length) {
        arr[k++] = left[i++];
        swaps++;
        yield { arr: [...arr], comparisons, swaps, finished: false };
      }
      while (j < right.length) {
        arr[k++] = right[j++];
        swaps++;
        yield { arr: [...arr], comparisons, swaps, finished: false };
      }
    }

    function* mSort(l, r) {
      if (l < r) {
        const m = Math.floor((l + r) / 2);
        yield* mSort(l, m);
        yield* mSort(m + 1, r);
        yield* merge(l, m, r);
      }
    }

    yield* mSort(0, arr.length - 1);
    yield { arr: [...arr], comparisons, swaps, finished: true };
  }

  const startRace = () => {
    resetRacers();
    setIsRacing(true);

    generatorsRef.current = {
      bubble: bubbleSortGen([...initialArray]),
      insertion: insertionSortGen([...initialArray]),
      quick: quickSortGen([...initialArray]),
      merge: mergeSortGen([...initialArray]),
    };

    const delay = Math.max(10, Math.floor(60 / speed));

    timerRef.current = setInterval(() => {
      let anyActive = false;

      // Bubble tick
      const bRes = generatorsRef.current.bubble?.next();
      if (bRes && !bRes.done) {
        setBubbleState(bRes.value);
        anyActive = true;
      } else {
        setBubbleState((s) => ({ ...s, finished: true }));
      }

      // Insertion tick
      const iRes = generatorsRef.current.insertion?.next();
      if (iRes && !iRes.done) {
        setInsertionState(iRes.value);
        anyActive = true;
      } else {
        setInsertionState((s) => ({ ...s, finished: true }));
      }

      // Quick tick
      const qRes = generatorsRef.current.quick?.next();
      if (qRes && !qRes.done) {
        setQuickState(qRes.value);
        anyActive = true;
      } else {
        setQuickState((s) => ({ ...s, finished: true }));
      }

      // Merge tick
      const mRes = generatorsRef.current.merge?.next();
      if (mRes && !mRes.done) {
        setMergeState(mRes.value);
        anyActive = true;
      } else {
        setMergeState((s) => ({ ...s, finished: true }));
      }

      if (!anyActive) {
        clearInterval(timerRef.current);
        setIsRacing(false);
        soundManager.playSuccess();
      }
    }, delay);
  };

  const renderMiniBars = (arr, isFinished, color) => {
    const maxVal = Math.max(...arr, 100);
    return (
      <Box
        sx={{
          height: 120,
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'center',
          gap: '2px',
          p: 1,
          backgroundColor: 'rgba(9, 13, 22, 0.7)',
          borderRadius: 2,
        }}
      >
        {arr.map((val, idx) => {
          const h = Math.max(8, Math.round((val / maxVal) * 100));
          return (
            <Box
              key={idx}
              sx={{
                flex: 1,
                height: `${h}%`,
                backgroundColor: isFinished ? '#10b981' : color,
                borderRadius: '2px 2px 0 0',
                transition: 'height 0.05s ease',
              }}
            />
          );
        })}
      </Box>
    );
  };

  return (
    <Box sx={{ width: '100%', maxWidth: 1400, mx: 'auto', px: { xs: 2, md: 4 }, py: 3 }}>
      <Box sx={{ mb: 3 }}>
        <Chip
          label="ALGORITHM COMPARISON"
          size="small"
          sx={{
            backgroundColor: 'rgba(236, 72, 153, 0.15)',
            color: '#ec4899',
            border: '1px solid rgba(236, 72, 153, 0.3)',
            fontWeight: 700,
            mb: 1,
          }}
        />
        <Typography
          variant="h4"
          sx={{
            fontWeight: 800,
            background: 'linear-gradient(135deg, #ffffff 0%, #cbd5e1 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            mb: 1,
          }}
        >
          Algorithm Race Arena
        </Typography>
        <Typography variant="body1" sx={{ color: '#94a3b8' }}>
          Watch Bubble Sort, Insertion Sort, Quick Sort, and Merge Sort execute simultaneously on the <em>identical dataset</em> to compare operation efficiency and runtime in real time.
        </Typography>
      </Box>

      {/* Arena Grid */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
          gap: 2.5,
          mb: 3,
        }}
      >
        {/* Quick Sort Card */}
        <Paper
          elevation={0}
          sx={{
            p: 2.5,
            borderRadius: 3,
            backgroundColor: 'rgba(15, 23, 42, 0.7)',
            border: `1px solid ${quickState.finished ? '#10b981' : 'rgba(255, 255, 255, 0.08)'}`,
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5 }}>
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 700, color: '#38bdf8' }}>
                Quick Sort (O(n log n))
              </Typography>
              <Typography variant="caption" sx={{ color: '#64748b' }}>
                Divide and Conquer (Pivot Partition)
              </Typography>
            </Box>
            {quickState.finished && <Chip label="FINISHED" size="small" color="success" />}
          </Box>
          {renderMiniBars(quickState.arr, quickState.finished, '#38bdf8')}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1.5, pt: 1, borderTop: '1px solid rgba(255, 255, 255, 0.05)' }}>
            <Typography variant="caption" sx={{ color: '#94a3b8', fontFamily: 'monospace' }}>
              Comparisons: <strong style={{ color: '#f59e0b' }}>{quickState.comparisons}</strong>
            </Typography>
            <Typography variant="caption" sx={{ color: '#94a3b8', fontFamily: 'monospace' }}>
              Swaps: <strong style={{ color: '#ef4444' }}>{quickState.swaps}</strong>
            </Typography>
          </Box>
        </Paper>

        {/* Merge Sort Card */}
        <Paper
          elevation={0}
          sx={{
            p: 2.5,
            borderRadius: 3,
            backgroundColor: 'rgba(15, 23, 42, 0.7)',
            border: `1px solid ${mergeState.finished ? '#10b981' : 'rgba(255, 255, 255, 0.08)'}`,
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5 }}>
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 700, color: '#a855f7' }}>
                Merge Sort (O(n log n))
              </Typography>
              <Typography variant="caption" sx={{ color: '#64748b' }}>
                Divide, Recurse & Merge Halves
              </Typography>
            </Box>
            {mergeState.finished && <Chip label="FINISHED" size="small" color="success" />}
          </Box>
          {renderMiniBars(mergeState.arr, mergeState.finished, '#a855f7')}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1.5, pt: 1, borderTop: '1px solid rgba(255, 255, 255, 0.05)' }}>
            <Typography variant="caption" sx={{ color: '#94a3b8', fontFamily: 'monospace' }}>
              Comparisons: <strong style={{ color: '#f59e0b' }}>{mergeState.comparisons}</strong>
            </Typography>
            <Typography variant="caption" sx={{ color: '#94a3b8', fontFamily: 'monospace' }}>
              Writes: <strong style={{ color: '#ef4444' }}>{mergeState.swaps}</strong>
            </Typography>
          </Box>
        </Paper>

        {/* Insertion Sort Card */}
        <Paper
          elevation={0}
          sx={{
            p: 2.5,
            borderRadius: 3,
            backgroundColor: 'rgba(15, 23, 42, 0.7)',
            border: `1px solid ${insertionState.finished ? '#10b981' : 'rgba(255, 255, 255, 0.08)'}`,
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5 }}>
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 700, color: '#f59e0b' }}>
                Insertion Sort (O(n²))
              </Typography>
              <Typography variant="caption" sx={{ color: '#64748b' }}>
                Insert key into sorted prefix
              </Typography>
            </Box>
            {insertionState.finished && <Chip label="FINISHED" size="small" color="success" />}
          </Box>
          {renderMiniBars(insertionState.arr, insertionState.finished, '#f59e0b')}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1.5, pt: 1, borderTop: '1px solid rgba(255, 255, 255, 0.05)' }}>
            <Typography variant="caption" sx={{ color: '#94a3b8', fontFamily: 'monospace' }}>
              Comparisons: <strong style={{ color: '#f59e0b' }}>{insertionState.comparisons}</strong>
            </Typography>
            <Typography variant="caption" sx={{ color: '#94a3b8', fontFamily: 'monospace' }}>
              Shifts: <strong style={{ color: '#ef4444' }}>{insertionState.swaps}</strong>
            </Typography>
          </Box>
        </Paper>

        {/* Bubble Sort Card */}
        <Paper
          elevation={0}
          sx={{
            p: 2.5,
            borderRadius: 3,
            backgroundColor: 'rgba(15, 23, 42, 0.7)',
            border: `1px solid ${bubbleState.finished ? '#10b981' : 'rgba(255, 255, 255, 0.08)'}`,
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5 }}>
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 700, color: '#ef4444' }}>
                Bubble Sort (O(n²))
              </Typography>
              <Typography variant="caption" sx={{ color: '#64748b' }}>
                Adjacent pairwise comparisons
              </Typography>
            </Box>
            {bubbleState.finished && <Chip label="FINISHED" size="small" color="success" />}
          </Box>
          {renderMiniBars(bubbleState.arr, bubbleState.finished, '#ef4444')}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1.5, pt: 1, borderTop: '1px solid rgba(255, 255, 255, 0.05)' }}>
            <Typography variant="caption" sx={{ color: '#94a3b8', fontFamily: 'monospace' }}>
              Comparisons: <strong style={{ color: '#f59e0b' }}>{bubbleState.comparisons}</strong>
            </Typography>
            <Typography variant="caption" sx={{ color: '#94a3b8', fontFamily: 'monospace' }}>
              Swaps: <strong style={{ color: '#ef4444' }}>{bubbleState.swaps}</strong>
            </Typography>
          </Box>
        </Paper>
      </Box>

      {/* Control Toolbar */}
      <Paper
        elevation={0}
        sx={{
          p: 2.5,
          borderRadius: 2.5,
          backgroundColor: 'rgba(15, 23, 42, 0.8)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 2,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Button
            variant="contained"
            onClick={startRace}
            disabled={isRacing}
            sx={{
              background: 'linear-gradient(135deg, #ec4899 0%, #be185d 100%)',
              fontWeight: 700,
              px: 3,
              py: 1,
              borderRadius: 2,
              boxShadow: '0 0 15px rgba(236, 72, 153, 0.4)',
            }}
          >
            🏁 Start Race
          </Button>

          <Button
            variant="outlined"
            onClick={() => generateData(arraySize)}
            disabled={isRacing}
            sx={{ borderColor: 'rgba(255, 255, 255, 0.2)', color: '#cbd5e1' }}
          >
            Generate New Array
          </Button>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, minWidth: 240 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, width: '100%' }}>
            <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 600, whiteSpace: 'nowrap' }}>
              Array Size: {arraySize}
            </Typography>
            <Slider
              value={arraySize}
              min={15}
              max={45}
              onChange={(e, v) => setArraySize(v)}
              disabled={isRacing}
              sx={{ color: '#ec4899' }}
            />
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}

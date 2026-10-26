'use client';

import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';
import Link from 'next/link';
import DsaScene from '../components/Three/DsaScene';
import {
  PlayIcon,
  RotateCcwIcon,
  ArrowRightIcon,
  SparklesIcon,
  BarChartIcon,
  LayersIcon,
  GridIcon,
} from '../components/Common/Icons';

export default function Home() {
  const [activeTab, setActiveTab] = useState('sorting'); // 'sorting' | 'searching' | 'graph'

  // Mini interactive sorting simulator
  const [heroArr, setHeroArr] = useState([38, 14, 76, 22, 90, 45, 60, 18, 52]);
  const [activeIndices, setActiveIndices] = useState([]);
  const [sortedIndices, setSortedIndices] = useState([]);
  const [isSorting, setIsSorting] = useState(false);

  // Binary search mini simulator
  const searchArr = [10, 20, 35, 48, 62, 75, 88, 94];
  const [searchPointers, setSearchPointers] = useState({ low: 0, mid: 3, high: 7, found: -1 });

  const runMiniSort = async () => {
    if (isSorting) return;
    setIsSorting(true);
    const arr = [...heroArr];
    const n = arr.length;
    const sorted = [];

    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        setActiveIndices([j, j + 1]);
        await new Promise((r) => setTimeout(r, 110));

        if (arr[j] > arr[j + 1]) {
          const temp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = temp;
          setHeroArr([...arr]);
          await new Promise((r) => setTimeout(r, 110));
        }
      }
      sorted.push(n - i - 1);
      setSortedIndices([...sorted]);
    }
    setSortedIndices(Array.from({ length: n }, (_, idx) => idx));
    setActiveIndices([]);
    setIsSorting(false);
  };

  const resetMiniSort = () => {
    setHeroArr([38, 14, 76, 22, 90, 45, 60, 18, 52]);
    setActiveIndices([]);
    setSortedIndices([]);
    setIsSorting(false);
  };

  const runMiniSearch = async () => {
    let l = 0;
    let r = searchArr.length - 1;
    const target = 62;

    while (l <= r) {
      const m = Math.floor((l + r) / 2);
      setSearchPointers({ low: l, mid: m, high: r, found: -1 });
      await new Promise((res) => setTimeout(res, 600));

      if (searchArr[m] === target) {
        setSearchPointers({ low: l, mid: m, high: r, found: m });
        break;
      }
      if (searchArr[m] < target) {
        l = m + 1;
      } else {
        r = m - 1;
      }
    }
  };

  return (
    <Box sx={{ width: '100%', position: 'relative', overflow: 'hidden' }}>
      {/* 1. Subtle, continuous ambient Three.js 3D Background */}
      <DsaScene opacity={0.22} />

      <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1, pt: { xs: 5, md: 8 }, pb: 12 }}>
        {/* HERO SECTION */}
        <Box sx={{ textAlign: 'center', maxWidth: 860, mx: 'auto', mb: { xs: 6, md: 8 } }}>
          {/* Brand Tagline Chip */}
          <Box
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 1.25,
              px: 2.25,
              py: 0.8,
              borderRadius: 8,
              backgroundColor: 'rgba(14, 165, 233, 0.08)',
              border: '1px solid rgba(14, 165, 233, 0.25)',
              mb: 3,
            }}
          >
            <Box sx={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#0ea5e9' }} />
            <Box sx={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#10b981' }} />
            <Box sx={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#f97316' }} />
            <Typography variant="caption" sx={{ fontWeight: 700, letterSpacing: '0.08em', color: '#e2e8f0' }}>
              LEARN • VISUALIZE • PRACTICE • MASTER
            </Typography>
          </Box>

          {/* Main Title */}
          <Typography
            variant="h1"
            sx={{
              fontWeight: 900,
              letterSpacing: '-0.035em',
              lineHeight: 1.1,
              fontSize: { xs: '2.5rem', sm: '3.6rem', md: '4.5rem' },
              mb: 2.5,
              background: 'linear-gradient(135deg, #ffffff 0%, #cbd5e1 55%, #94a3b8 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Algorithms Made <span style={{ color: '#0ea5e9', WebkitTextFillColor: '#0ea5e9' }}>Intuitive</span> &{' '}
            <span style={{ color: '#10b981', WebkitTextFillColor: '#10b981' }}>Visual</span>.
          </Typography>

          <Typography
            variant="body1"
            sx={{
              color: '#94a3b8',
              fontSize: { xs: '1rem', md: '1.2rem' },
              lineHeight: 1.6,
              maxWidth: 680,
              mx: 'auto',
              mb: 4,
            }}
          >
            Step through execution in real time with synchronized pseudocode, interactive 3D graphs, verified <strong>C</strong> and <strong>Python</strong> source code, and instant file downloads.
          </Typography>

          {/* Action CTAs */}
          <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 2 }}>
            <Link href="/sorting" style={{ textDecoration: 'none' }}>
              <Button
                variant="contained"
                size="large"
                endIcon={<ArrowRightIcon size={18} />}
                sx={{
                  background: 'linear-gradient(135deg, #0ea5e9 0%, #2563eb 100%)',
                  color: '#ffffff',
                  fontWeight: 700,
                  px: 3.5,
                  py: 1.4,
                  borderRadius: 2.5,
                  boxShadow: '0 0 25px rgba(14, 165, 233, 0.4)',
                  fontSize: '0.95rem',
                  '&:hover': {
                    filter: 'brightness(1.1)',
                  },
                }}
              >
                Start Visualizing
              </Button>
            </Link>

            <Link href="/compare" style={{ textDecoration: 'none' }}>
              <Button
                variant="outlined"
                size="large"
                sx={{
                  borderColor: 'rgba(249, 115, 22, 0.4)',
                  backgroundColor: 'rgba(249, 115, 22, 0.08)',
                  color: '#f97316',
                  fontWeight: 700,
                  px: 3,
                  py: 1.4,
                  borderRadius: 2.5,
                  fontSize: '0.95rem',
                  '&:hover': {
                    borderColor: '#f97316',
                    backgroundColor: 'rgba(249, 115, 22, 0.15)',
                  },
                }}
              >
                Race Arena 🏁
              </Button>
            </Link>

            <Link href="/data-structures" style={{ textDecoration: 'none' }}>
              <Button
                variant="text"
                size="large"
                sx={{
                  color: '#10b981',
                  fontWeight: 600,
                  fontSize: '0.95rem',
                  px: 2,
                  '&:hover': { color: '#34d399' },
                }}
              >
                Data Structures →
              </Button>
            </Link>
          </Box>
        </Box>

        {/* 2. INTERACTIVE LIVE ALGORITHM SANDBOX (Visual Hero Stage) */}
        <Paper
          elevation={0}
          sx={{
            maxWidth: 1040,
            mx: 'auto',
            borderRadius: 4,
            backgroundColor: 'rgba(13, 19, 34, 0.8)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.7)',
            overflow: 'hidden',
            mb: 10,
          }}
        >
          {/* Sandbox Top Bar with 3 Visualizer Modes */}
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              alignItems: 'center',
              px: { xs: 2, sm: 3 },
              py: 1.5,
              backgroundColor: 'rgba(255, 255, 255, 0.03)',
              borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
              gap: 1.5,
            }}
          >
            {/* Visualizer Mode Switcher */}
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button
                size="small"
                onClick={() => setActiveTab('sorting')}
                sx={{
                  px: 1.75,
                  py: 0.5,
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  color: activeTab === 'sorting' ? '#0ea5e9' : '#94a3b8',
                  backgroundColor: activeTab === 'sorting' ? 'rgba(14, 165, 233, 0.12)' : 'transparent',
                  border: `1px solid ${activeTab === 'sorting' ? 'rgba(14, 165, 233, 0.3)' : 'transparent'}`,
                  borderRadius: 2,
                }}
              >
                Sorting Array
              </Button>

              <Button
                size="small"
                onClick={() => setActiveTab('searching')}
                sx={{
                  px: 1.75,
                  py: 0.5,
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  color: activeTab === 'searching' ? '#10b981' : '#94a3b8',
                  backgroundColor: activeTab === 'searching' ? 'rgba(16, 185, 129, 0.12)' : 'transparent',
                  border: `1px solid ${activeTab === 'searching' ? 'rgba(16, 185, 129, 0.3)' : 'transparent'}`,
                  borderRadius: 2,
                }}
              >
                Binary Search Range
              </Button>
            </Box>

            {/* Sandbox Trigger Controls */}
            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
              {activeTab === 'sorting' ? (
                <>
                  <Button
                    size="small"
                    variant="contained"
                    onClick={runMiniSort}
                    disabled={isSorting}
                    startIcon={<PlayIcon size={14} />}
                    sx={{
                      backgroundColor: '#0ea5e9',
                      fontSize: '0.78rem',
                      fontWeight: 700,
                      px: 2,
                    }}
                  >
                    {isSorting ? 'Sorting...' : 'Animate Bubble Sort'}
                  </Button>
                  <Button
                    size="small"
                    onClick={resetMiniSort}
                    disabled={isSorting}
                    sx={{ color: '#94a3b8', minWidth: 32 }}
                  >
                    <RotateCcwIcon size={16} />
                  </Button>
                </>
              ) : (
                <Button
                  size="small"
                  variant="contained"
                  onClick={runMiniSearch}
                  startIcon={<PlayIcon size={14} />}
                  sx={{
                    backgroundColor: '#10b981',
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    px: 2,
                  }}
                >
                  Step Binary Search
                </Button>
              )}
            </Box>
          </Box>

          {/* Sandbox Live Canvas */}
          <Box
            sx={{
              p: { xs: 3, sm: 4 },
              minHeight: 240,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'rgba(7, 10, 19, 0.6)',
            }}
          >
            {activeTab === 'sorting' && (
              <Box
                sx={{
                  width: '100%',
                  height: 190,
                  display: 'flex',
                  alignItems: 'flex-end',
                  justifyContent: 'center',
                  gap: { xs: 1, sm: 1.5 },
                }}
              >
                {heroArr.map((val, idx) => {
                  const isActive = activeIndices.includes(idx);
                  const isSorted = sortedIndices.includes(idx);
                  const h = Math.max(16, Math.round((val / 95) * 100));

                  // 3 Brand Colors from Logo
                  let barBg = '#0ea5e9'; // Cyan
                  if (isActive) barBg = '#f97316'; // Sunset Orange
                  if (isSorted) barBg = '#10b981'; // Mint Emerald

                  return (
                    <Box
                      key={idx}
                      sx={{
                        flex: 1,
                        maxWidth: 44,
                        height: `${h}%`,
                        backgroundColor: barBg,
                        borderRadius: '6px 6px 2px 2px',
                        display: 'flex',
                        alignItems: 'flex-start',
                        justifyContent: 'center',
                        pt: 0.5,
                        boxShadow: isActive ? '0 0 16px #f97316' : isSorted ? '0 0 12px #10b981' : 'none',
                        transition: 'height 0.12s ease, background-color 0.12s ease',
                      }}
                    >
                      <Typography
                        variant="caption"
                        sx={{ color: '#ffffff', fontWeight: 800, fontSize: '0.75rem' }}
                      >
                        {val}
                      </Typography>
                    </Box>
                  );
                })}
              </Box>
            )}

            {activeTab === 'searching' && (
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                <Typography variant="body2" sx={{ color: '#94a3b8' }}>
                  Target: <strong style={{ color: '#10b981' }}>62</strong> (Halving search space logarithmically)
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', justifyContent: 'center' }}>
                  {searchArr.map((val, idx) => {
                    const isMid = searchPointers.mid === idx;
                    const isFound = searchPointers.found === idx;
                    const isOutside = idx < searchPointers.low || idx > searchPointers.high;

                    let bg = 'rgba(13, 19, 34, 0.8)';
                    let border = 'rgba(255, 255, 255, 0.15)';
                    let textCol = '#ffffff';

                    if (isFound) {
                      bg = 'rgba(16, 185, 129, 0.3)';
                      border = '#10b981';
                      textCol = '#10b981';
                    } else if (isMid) {
                      bg = 'rgba(249, 115, 22, 0.25)';
                      border = '#f97316';
                      textCol = '#f97316';
                    } else if (isOutside) {
                      bg = 'rgba(255, 255, 255, 0.02)';
                      border = 'rgba(255, 255, 255, 0.05)';
                      textCol = '#475569';
                    }

                    return (
                      <Box key={idx} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.5 }}>
                        <Typography variant="caption" sx={{ color: isMid ? '#f97316' : '#64748b', fontSize: '0.7rem' }}>
                          {isMid ? 'MID' : idx === searchPointers.low ? 'L' : idx === searchPointers.high ? 'R' : ''}
                        </Typography>
                        <Box
                          sx={{
                            width: 50,
                            height: 52,
                            borderRadius: 2,
                            backgroundColor: bg,
                            border: `2px solid ${border}`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontWeight: 800,
                            color: textCol,
                            fontFamily: 'monospace',
                            boxShadow: isFound ? '0 0 15px #10b981' : isMid ? '0 0 12px #f97316' : 'none',
                          }}
                        >
                          {val}
                        </Box>
                      </Box>
                    );
                  })}
                </Box>
              </Box>
            )}
          </Box>
        </Paper>

        {/* 3. THE 3 BRAND PILLARS (Clean, uncluttered, aligned with Logo D-S-A) */}
        <Box sx={{ mb: 6 }}>
          <Box sx={{ textAlign: 'center', mb: 5 }}>
            <Typography variant="caption" sx={{ color: '#0ea5e9', fontWeight: 700, letterSpacing: '0.1em' }}>
              ALGORITHMIC PLATFORM SUITE
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 800, color: '#f8fafc', mt: 0.5 }}>
              Choose a Core Domain
            </Typography>
          </Box>

          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
              gap: 3,
            }}
          >
            {/* Pillar 1: Blue - D (Data & Execution) */}
            <Link href="/sorting" style={{ textDecoration: 'none' }}>
              <Paper
                elevation={0}
                sx={{
                  p: 3.5,
                  height: '100%',
                  borderRadius: 3.5,
                  backgroundColor: 'rgba(13, 19, 34, 0.75)',
                  backdropFilter: 'blur(16px)',
                  border: '1px solid rgba(14, 165, 233, 0.25)',
                  transition: 'all 0.25s ease',
                  '&:hover': {
                    transform: 'translateY(-6px)',
                    borderColor: '#0ea5e9',
                    boxShadow: '0 16px 35px rgba(14, 165, 233, 0.2)',
                  },
                }}
              >
                <Box
                  sx={{
                    width: 44,
                    height: 44,
                    borderRadius: 2,
                    backgroundColor: 'rgba(14, 165, 233, 0.15)',
                    border: '1px solid rgba(14, 165, 233, 0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mb: 2.5,
                  }}
                >
                  <BarChartIcon size={22} color="#0ea5e9" />
                </Box>
                <Chip
                  label="D • SORTING & SEARCHING"
                  size="small"
                  sx={{
                    backgroundColor: 'rgba(14, 165, 233, 0.12)',
                    color: '#0ea5e9',
                    fontSize: '0.7rem',
                    fontWeight: 800,
                    mb: 1.5,
                  }}
                />
                <Typography variant="h5" sx={{ fontWeight: 800, color: '#f8fafc', mb: 1 }}>
                  Data & Sorting
                </Typography>
                <Typography variant="body2" sx={{ color: '#94a3b8', lineHeight: 1.6, mb: 3 }}>
                  Bubble, Selection, Insertion, Merge, Quick, and Heap Sort with step-by-step swaps, pivots, and logarithmic binary search.
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: '#0ea5e9', fontWeight: 700 }}>
                  <span>Launch Visualizer</span>
                  <ArrowRightIcon size={16} />
                </Box>
              </Paper>
            </Link>

            {/* Pillar 2: Green - S (Structures & Memory) */}
            <Link href="/data-structures" style={{ textDecoration: 'none' }}>
              <Paper
                elevation={0}
                sx={{
                  p: 3.5,
                  height: '100%',
                  borderRadius: 3.5,
                  backgroundColor: 'rgba(13, 19, 34, 0.75)',
                  backdropFilter: 'blur(16px)',
                  border: '1px solid rgba(16, 185, 129, 0.25)',
                  transition: 'all 0.25s ease',
                  '&:hover': {
                    transform: 'translateY(-6px)',
                    borderColor: '#10b981',
                    boxShadow: '0 16px 35px rgba(16, 185, 129, 0.2)',
                  },
                }}
              >
                <Box
                  sx={{
                    width: 44,
                    height: 44,
                    borderRadius: 2,
                    backgroundColor: 'rgba(16, 185, 129, 0.15)',
                    border: '1px solid rgba(16, 185, 129, 0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mb: 2.5,
                  }}
                >
                  <LayersIcon size={22} color="#10b981" />
                </Box>
                <Chip
                  label="S • DATA STRUCTURES"
                  size="small"
                  sx={{
                    backgroundColor: 'rgba(16, 185, 129, 0.12)',
                    color: '#10b981',
                    fontSize: '0.7rem',
                    fontWeight: 800,
                    mb: 1.5,
                  }}
                />
                <Typography variant="h5" sx={{ fontWeight: 800, color: '#f8fafc', mb: 1 }}>
                  Structures & Trees
                </Typography>
                <Typography variant="body2" sx={{ color: '#94a3b8', lineHeight: 1.6, mb: 3 }}>
                  Arrays, Linked Lists, LIFO Stacks, FIFO Queues, and dynamic SVG Binary Search Trees with real-time operations.
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: '#10b981', fontWeight: 700 }}>
                  <span>Interact with Nodes</span>
                  <ArrowRightIcon size={16} />
                </Box>
              </Paper>
            </Link>

            {/* Pillar 3: Orange - A (Algorithms & Graph Intelligence) */}
            <Link href="/pathfinding" style={{ textDecoration: 'none' }}>
              <Paper
                elevation={0}
                sx={{
                  p: 3.5,
                  height: '100%',
                  borderRadius: 3.5,
                  backgroundColor: 'rgba(13, 19, 34, 0.75)',
                  backdropFilter: 'blur(16px)',
                  border: '1px solid rgba(249, 115, 22, 0.25)',
                  transition: 'all 0.25s ease',
                  '&:hover': {
                    transform: 'translateY(-6px)',
                    borderColor: '#f97316',
                    boxShadow: '0 16px 35px rgba(249, 115, 22, 0.2)',
                  },
                }}
              >
                <Box
                  sx={{
                    width: 44,
                    height: 44,
                    borderRadius: 2,
                    backgroundColor: 'rgba(249, 115, 22, 0.15)',
                    border: '1px solid rgba(249, 115, 22, 0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mb: 2.5,
                  }}
                >
                  <GridIcon size={22} color="#f97316" />
                </Box>
                <Chip
                  label="A • PATHFINDING & GRAPHS"
                  size="small"
                  sx={{
                    backgroundColor: 'rgba(249, 115, 22, 0.12)',
                    color: '#f97316',
                    fontSize: '0.7rem',
                    fontWeight: 800,
                    mb: 1.5,
                  }}
                />
                <Typography variant="h5" sx={{ fontWeight: 800, color: '#f8fafc', mb: 1 }}>
                  Pathfinding & Graphs
                </Typography>
                <Typography variant="body2" sx={{ color: '#94a3b8', lineHeight: 1.6, mb: 3 }}>
                  Draw walls on 2D grids, generate mazes, and solve shortest paths using A*, Dijkstra, BFS, and N-Queens backtracking.
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: '#f97316', fontWeight: 700 }}>
                  <span>Solve Pathfinding</span>
                  <ArrowRightIcon size={16} />
                </Box>
              </Paper>
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

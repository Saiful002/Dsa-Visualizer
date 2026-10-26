'use client';

import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';
import Link from 'next/link';
import {
  BarChartIcon,
  SearchIcon,
  LayersIcon,
  GridIcon,
  GitBranchIcon,
  ZapIcon,
  SparklesIcon,
  ArrowRightIcon,
  DownloadIcon,
  CodeIcon,
  PlayIcon,
  RotateCcwIcon,
} from '../components/Common/Icons';

export default function Home() {
  // Mini interactive sorting demo on hero
  const [heroArr, setHeroArr] = useState([45, 12, 85, 32, 60, 20, 95, 10, 50, 75]);
  const [isSorting, setIsSorting] = useState(false);
  const [activeIndices, setActiveIndices] = useState([]);
  const [sortedIndices, setSortedIndices] = useState([]);

  const resetHeroArr = () => {
    setHeroArr([45, 12, 85, 32, 60, 20, 95, 10, 50, 75]);
    setActiveIndices([]);
    setSortedIndices([]);
    setIsSorting(false);
  };

  const runHeroSort = async () => {
    if (isSorting) return;
    setIsSorting(true);
    const arr = [...heroArr];
    const n = arr.length;
    const sorted = [];

    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        setActiveIndices([j, j + 1]);
        await new Promise((r) => setTimeout(r, 120));

        if (arr[j] > arr[j + 1]) {
          const temp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = temp;
          setHeroArr([...arr]);
          await new Promise((r) => setTimeout(r, 120));
        }
      }
      sorted.push(n - i - 1);
      setSortedIndices([...sorted]);
    }
    setSortedIndices(Array.from({ length: n }, (_, idx) => idx));
    setActiveIndices([]);
    setIsSorting(false);
  };

  const categories = [
    {
      title: 'Sorting Algorithms',
      desc: 'Visualize Bubble, Selection, Insertion, Merge, Quick, and Heap Sort with step-by-step swaps and pivot tracking.',
      icon: <BarChartIcon size={24} color="#38bdf8" />,
      path: '/sorting',
      badge: '6 Algorithms',
      color: '#38bdf8',
    },
    {
      title: 'Searching Algorithms',
      desc: 'Master Linear Search and logarithmic Binary Search with animated Low, Mid, and High range elimination pointers.',
      icon: <SearchIcon size={24} color="#10b981" />,
      path: '/searching',
      badge: '2 Algorithms',
      color: '#10b981',
    },
    {
      title: 'Data Structures',
      desc: 'Interact with Arrays, Linked Lists, LIFO Stacks, FIFO Queues, and Binary Search Trees with real-time insertions and deletions.',
      icon: <LayersIcon size={24} color="#8b5cf6" />,
      path: '/data-structures',
      badge: '5 Structures',
      color: '#8b5cf6',
    },
    {
      title: 'Pathfinding Visualizer',
      desc: 'Draw walls on a 2D matrix, generate mazes, and watch A*, Dijkstra, and BFS find optimal shortest paths in real time.',
      icon: <GridIcon size={24} color="#f59e0b" />,
      path: '/pathfinding',
      badge: 'Interactive Grid',
      color: '#f59e0b',
    },
    {
      title: 'Graph Algorithms',
      desc: 'Explore network nodes and weighted edges using BFS, DFS, and Dijkstra shortest path edge relaxation.',
      icon: <GitBranchIcon size={24} color="#ec4899" />,
      path: '/graph',
      badge: 'Node-Link Graphs',
      color: '#ec4899',
    },
    {
      title: 'Recursion & Backtracking',
      desc: 'Watch the N-Queens solver test constraint configurations row by row, automatically backtracking at dead ends.',
      icon: <ZapIcon size={24} color="#eab308" />,
      path: '/recursion',
      badge: 'N-Queens Solver',
      color: '#eab308',
    },
    {
      title: 'Dynamic Programming',
      desc: 'Observe the 2D DP matrix fill cell-by-cell for 0/1 Knapsack, tracking subproblem dependencies and backtracks.',
      icon: <CodeIcon size={24} color="#06b6d4" />,
      path: '/dynamic-programming',
      badge: '0/1 Knapsack DP',
      color: '#06b6d4',
    },
    {
      title: 'Algorithm Comparison Arena',
      desc: 'Race 4 sorting algorithms simultaneously on identical input arrays to compare operations, swaps, and execution speed.',
      icon: <SparklesIcon size={24} color="#f43f5e" />,
      path: '/compare',
      badge: 'Multi-Algo Race',
      color: '#f43f5e',
    },
    {
      title: 'Big-O Complexity Guide',
      desc: 'Plot asymptotic growth curves O(1), O(log n), O(n), O(n²), O(2^n) interactively and reference the complete cheat sheet.',
      icon: <BarChartIcon size={24} color="#14b8a6" />,
      path: '/complexity',
      badge: 'Curves & Tables',
      color: '#14b8a6',
    },
  ];

  return (
    <Box sx={{ width: '100%', py: { xs: 4, md: 8 } }}>
      <Container maxWidth="xl">
        {/* HERO SECTION */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', lg: '1.2fr 1fr' },
            gap: 6,
            alignItems: 'center',
            mb: { xs: 8, md: 12 },
          }}
        >
          {/* Hero Pitch */}
          <Box>
            <Box
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 1,
                px: 2,
                py: 0.75,
                borderRadius: 5,
                backgroundColor: 'rgba(56, 189, 248, 0.1)',
                border: '1px solid rgba(56, 189, 248, 0.25)',
                color: '#38bdf8',
                fontWeight: 700,
                fontSize: '0.8rem',
                mb: 2.5,
              }}
            >
              <SparklesIcon size={16} />
              <span>Interactive Computer Science Education</span>
            </Box>

            <Typography
              variant="h2"
              component="h1"
              sx={{
                fontWeight: 800,
                letterSpacing: '-0.03em',
                lineHeight: 1.15,
                background: 'linear-gradient(135deg, #ffffff 0%, #cbd5e1 50%, #94a3b8 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4rem' },
                mb: 2.5,
              }}
            >
              Learn Data Structures & Algorithms <span style={{ color: '#38bdf8', WebkitTextFillColor: '#38bdf8' }}>Visually</span>.
            </Typography>

            <Typography
              variant="h6"
              sx={{
                color: '#94a3b8',
                fontWeight: 400,
                lineHeight: 1.6,
                maxWidth: 620,
                mb: 4,
                fontSize: { xs: '1rem', md: '1.2rem' },
              }}
            >
              Stop memorizing static textbook code. Watch algorithms execute step-by-step with synchronized pseudocode, full interactive controls, real-world analogies, verified <strong>C</strong> and <strong>PHP</strong> implementations, and one-click code downloads.
            </Typography>

            {/* CTAs */}
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, alignItems: 'center' }}>
              <Link href="/sorting" style={{ textDecoration: 'none' }}>
                <Button
                  variant="contained"
                  size="large"
                  endIcon={<ArrowRightIcon size={18} />}
                  sx={{
                    background: 'linear-gradient(135deg, #38bdf8 0%, #2563eb 100%)',
                    color: '#ffffff',
                    fontWeight: 700,
                    px: 3.5,
                    py: 1.5,
                    borderRadius: 2.5,
                    boxShadow: '0 0 25px rgba(56, 189, 248, 0.4)',
                    textTransform: 'none',
                    fontSize: '1rem',
                    '&:hover': {
                      filter: 'brightness(1.1)',
                    },
                  }}
                >
                  Start Visualizing
                </Button>
              </Link>

              <Link href="/data-structures" style={{ textDecoration: 'none' }}>
                <Button
                  variant="outlined"
                  size="large"
                  sx={{
                    borderColor: 'rgba(255, 255, 255, 0.2)',
                    color: '#f8fafc',
                    fontWeight: 600,
                    px: 3,
                    py: 1.5,
                    borderRadius: 2.5,
                    textTransform: 'none',
                    fontSize: '1rem',
                    '&:hover': {
                      borderColor: '#38bdf8',
                      backgroundColor: 'rgba(56, 189, 248, 0.08)',
                    },
                  }}
                >
                  Explore Structures
                </Button>
              </Link>

              <Link href="/compare" style={{ textDecoration: 'none' }}>
                <Button
                  variant="text"
                  size="large"
                  sx={{
                    color: '#ec4899',
                    fontWeight: 600,
                    textTransform: 'none',
                    fontSize: '0.95rem',
                    '&:hover': { color: '#f472b6' },
                  }}
                >
                  Race Arena 🏁
                </Button>
              </Link>
            </Box>
          </Box>

          {/* Interactive Live Hero Card Preview */}
          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 4,
              backgroundColor: 'rgba(15, 23, 42, 0.75)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7)',
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Box sx={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: '#ef4444' }} />
                <Box sx={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: '#f59e0b' }} />
                <Box sx={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: '#10b981' }} />
                <Typography variant="caption" sx={{ color: '#94a3b8', ml: 1, fontFamily: 'monospace' }}>
                  bubble_sort_interactive_preview.js
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', gap: 1 }}>
                <Button
                  size="small"
                  variant="contained"
                  onClick={runHeroSort}
                  disabled={isSorting}
                  startIcon={<PlayIcon size={14} />}
                  sx={{
                    backgroundColor: '#2563eb',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    px: 1.5,
                  }}
                >
                  {isSorting ? 'Sorting...' : 'Play Demo'}
                </Button>
                <Button
                  size="small"
                  variant="outlined"
                  onClick={resetHeroArr}
                  disabled={isSorting}
                  sx={{
                    borderColor: 'rgba(255, 255, 255, 0.15)',
                    color: '#94a3b8',
                    minWidth: 32,
                    p: 0.5,
                  }}
                >
                  <RotateCcwIcon size={14} />
                </Button>
              </Box>
            </Box>

            {/* Mini Bars */}
            <Box
              sx={{
                height: 200,
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'center',
                gap: 1,
                p: 2,
                borderRadius: 2.5,
                backgroundColor: 'rgba(9, 13, 22, 0.8)',
                border: '1px solid rgba(255, 255, 255, 0.04)',
              }}
            >
              {heroArr.map((val, idx) => {
                const isActive = activeIndices.includes(idx);
                const isSorted = sortedIndices.includes(idx);
                const h = Math.max(15, Math.round((val / 100) * 100));

                let barColor = '#3b82f6';
                if (isActive) barColor = '#f59e0b';
                if (isSorted) barColor = '#10b981';

                return (
                  <Box
                    key={idx}
                    sx={{
                      flex: 1,
                      height: `${h}%`,
                      backgroundColor: barColor,
                      borderRadius: '4px 4px 1px 1px',
                      display: 'flex',
                      alignItems: 'flex-start',
                      justifyContent: 'center',
                      pt: 0.5,
                      boxShadow: isActive ? '0 0 12px #f59e0b' : 'none',
                      transition: 'height 0.15s ease, background-color 0.15s ease',
                    }}
                  >
                    <Typography variant="caption" sx={{ color: '#fff', fontSize: '0.65rem', fontWeight: 700 }}>
                      {val}
                    </Typography>
                  </Box>
                );
              })}
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
              <Typography variant="caption" sx={{ color: '#64748b' }}>
                Interactive visual state playback
              </Typography>
              <Link href="/sorting" style={{ color: '#38bdf8', fontSize: '0.8rem', fontWeight: 600 }}>
                Open Full Sorting Suite →
              </Link>
            </Box>
          </Paper>
        </Box>

        {/* 4-STEP LEARNING FLOW */}
        <Box sx={{ mb: { xs: 8, md: 12 } }}>
          <Box sx={{ textAlign: 'center', mb: 5 }}>
            <Typography variant="caption" sx={{ color: '#38bdf8', fontWeight: 700, letterSpacing: '0.1rem' }}>
              THE PEDAGOGICAL FLOW
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 800, color: '#f8fafc', mt: 0.5 }}>
              Learn → Visualize → Practice → Understand
            </Typography>
          </Box>

          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' },
              gap: 2.5,
            }}
          >
            {[
              { step: '01', title: 'Learn the Concept', desc: 'Read intuitive real-world analogies, step-by-step procedures, and Big-O trade-offs.' },
              { step: '02', title: 'Control the Animation', desc: 'Play, pause, step backward, step forward, adjust speed, and try custom input data.' },
              { step: '03', title: 'Synchronize Pseudocode', desc: 'Watch active code lines highlight in sync with element comparisons and swaps.' },
              { step: '04', title: 'Study & Download Code', desc: 'Inspect clean C and PHP implementations, copy code, and download source files.' },
            ].map((card) => (
              <Paper
                key={card.step}
                elevation={0}
                sx={{
                  p: 3,
                  borderRadius: 3,
                  backgroundColor: 'rgba(15, 23, 42, 0.6)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <Typography
                  variant="h3"
                  sx={{
                    fontFamily: 'monospace',
                    fontWeight: 900,
                    color: 'rgba(56, 189, 248, 0.15)',
                    position: 'absolute',
                    top: 10,
                    right: 15,
                  }}
                >
                  {card.step}
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: 700, color: '#f8fafc', mb: 1 }}>
                  {card.title}
                </Typography>
                <Typography variant="body2" sx={{ color: '#94a3b8', lineHeight: 1.6 }}>
                  {card.desc}
                </Typography>
              </Paper>
            ))}
          </Box>
        </Box>

        {/* ALGORITHM & DATA STRUCTURE CATEGORIES GRID */}
        <Box sx={{ mb: 8 }}>
          <Box sx={{ mb: 4 }}>
            <Typography variant="h4" sx={{ fontWeight: 800, color: '#f8fafc' }}>
              Explore Algorithm Categories
            </Typography>
            <Typography variant="body1" sx={{ color: '#94a3b8', mt: 0.5 }}>
              Choose a topic below to enter its specialized interactive visualizer.
            </Typography>
          </Box>

          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' },
              gap: 3,
            }}
          >
            {categories.map((cat) => (
              <Link key={cat.title} href={cat.path} style={{ textDecoration: 'none' }}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 3,
                    height: '100%',
                    borderRadius: 3,
                    backgroundColor: 'rgba(15, 23, 42, 0.6)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    transition: 'all 0.25s ease',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      borderColor: cat.color,
                      boxShadow: `0 12px 30px ${cat.color}20`,
                    },
                  }}
                >
                  <Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                      <Box
                        sx={{
                          p: 1.25,
                          borderRadius: 2,
                          backgroundColor: `${cat.color}15`,
                          border: `1px solid ${cat.color}30`,
                          display: 'inline-flex',
                        }}
                      >
                        {cat.icon}
                      </Box>
                      <Chip
                        label={cat.badge}
                        size="small"
                        sx={{
                          backgroundColor: 'rgba(255, 255, 255, 0.05)',
                          color: '#cbd5e1',
                          fontSize: '0.75rem',
                          fontWeight: 600,
                        }}
                      />
                    </Box>

                    <Typography variant="h6" sx={{ fontWeight: 700, color: '#f8fafc', mb: 1 }}>
                      {cat.title}
                    </Typography>

                    <Typography variant="body2" sx={{ color: '#94a3b8', lineHeight: 1.6 }}>
                      {cat.desc}
                    </Typography>
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 3, color: cat.color, fontWeight: 700, fontSize: '0.85rem' }}>
                    <span>Launch Visualizer</span>
                    <ArrowRightIcon size={16} />
                  </Box>
                </Paper>
              </Link>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

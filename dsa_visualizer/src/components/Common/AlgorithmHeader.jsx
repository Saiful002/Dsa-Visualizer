'use client';

import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import { useColorMode } from '../../app/ThemeRegistry';

export default function AlgorithmHeader({ algorithm }) {
  const { mode } = useColorMode();
  const isDark = mode === 'dark';

  if (!algorithm) return null;

  const difficultyColors = {
    Easy: { bg: 'rgba(16, 185, 129, 0.15)', text: isDark ? '#10b981' : '#059669', border: 'rgba(16, 185, 129, 0.3)' },
    Medium: { bg: 'rgba(245, 158, 11, 0.15)', text: isDark ? '#f59e0b' : '#d97706', border: 'rgba(245, 158, 11, 0.3)' },
    Hard: { bg: 'rgba(239, 68, 68, 0.15)', text: '#ef4444', border: 'rgba(239, 68, 68, 0.3)' },
  };

  const diffStyle = difficultyColors[algorithm.difficulty] || difficultyColors.Easy;

  const MASCOTS = {
    'Data Structures': {
      name: 'Nodey Caterpillar',
      quote: 'Linked by pointers & contiguous memory addresses!',
      emoji: '🐛',
      color: isDark ? '#38bdf8' : '#0284c7',
    },
    'Sorting': {
      name: 'Sorty Juggler',
      quote: 'Bubbling, partitioning, and swapping into sorted harmony!',
      emoji: '🤖',
      color: isDark ? '#38bdf8' : '#0284c7',
    },
    'Searching': {
      name: 'Detective ScoutBot',
      quote: 'Halving the search universe with logarithmic precision!',
      emoji: '🔍',
      color: isDark ? '#10b981' : '#059669',
    },
    'Graph': {
      name: 'Netty Cyber Spider',
      quote: 'Traversing vertices & weaving optimal shortest paths!',
      emoji: '🕷️',
      color: isDark ? '#10b981' : '#059669',
    },
    'Recursion': {
      name: 'Hanoi the Wizard',
      quote: 'To conquer the large, first master the small self-call!',
      emoji: '🧙‍♂️',
      color: '#9333ea',
    },
    'Dynamic Programming': {
      name: 'Chef MemoBot',
      quote: 'Sizzling cache: solve once, memoize, never recompute!',
      emoji: '🍳',
      color: isDark ? '#f97316' : '#ea580c',
    },
    'Pathfinding': {
      name: 'Pathy Grid Rover',
      quote: 'Steering through obstacles with A* and Dijkstra heuristics!',
      emoji: '🚀',
      color: isDark ? '#10b981' : '#059669',
    },
  };

  const mascot = MASCOTS[algorithm.category] || MASCOTS['Sorting'];

  const cardStyle = {
    p: 1.5,
    borderRadius: 2,
    backgroundColor: isDark ? 'rgba(15, 23, 42, 0.6)' : 'rgba(255, 255, 255, 0.9)',
    border: isDark ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid rgba(0, 0, 0, 0.08)',
    boxShadow: isDark ? 'none' : '0 2px 10px rgba(0, 0, 0, 0.04)',
    transition: 'all 0.2s ease',
  };

  return (
    <Box sx={{ mb: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 2, mb: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 1.5 }}>
          <Chip
            label={algorithm.category}
            size="small"
            sx={{
              backgroundColor: isDark ? 'rgba(56, 189, 248, 0.12)' : 'rgba(2, 132, 199, 0.1)',
              color: isDark ? '#38bdf8' : '#0284c7',
              border: `1px solid ${isDark ? 'rgba(56, 189, 248, 0.25)' : 'rgba(2, 132, 199, 0.25)'}`,
              fontWeight: 800,
              fontSize: '0.75rem',
            }}
          />
          <Chip
            label={algorithm.difficulty}
            size="small"
            sx={{
              backgroundColor: diffStyle.bg,
              color: diffStyle.text,
              border: `1px solid ${diffStyle.border}`,
              fontWeight: 800,
              fontSize: '0.75rem',
            }}
          />
        </Box>

        {/* Mascot Companion Badge */}
        <Box
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 1.25,
            px: 1.75,
            py: 0.75,
            borderRadius: 3,
            backgroundColor: isDark ? 'rgba(14, 165, 233, 0.1)' : 'rgba(2, 132, 199, 0.08)',
            border: `1px solid ${isDark ? 'rgba(14, 165, 233, 0.25)' : 'rgba(2, 132, 199, 0.25)'}`,
            boxShadow: isDark ? '0 4px 15px rgba(0,0,0,0.2)' : '0 2px 8px rgba(0,0,0,0.04)',
          }}
        >
          <Typography sx={{ fontSize: '1.25rem', animation: 'bounceSpring 4s infinite' }}>
            {mascot.emoji}
          </Typography>
          <Box>
            <Typography variant="caption" sx={{ color: mascot.color, fontWeight: 800, display: 'block', lineHeight: 1.2 }}>
              {mascot.name}
            </Typography>
            <Typography variant="caption" sx={{ color: isDark ? '#94a3b8' : '#475569', fontSize: '0.72rem', display: 'block' }}>
              "{mascot.quote}"
            </Typography>
          </Box>
        </Box>
      </Box>

      <Typography
        variant="h4"
        component="h1"
        sx={{
          fontWeight: 900,
          letterSpacing: '-0.02em',
          color: isDark ? '#f8fafc' : '#0f172a',
          mb: 1,
        }}
      >
        {algorithm.name}
      </Typography>

      <Typography
        variant="body1"
        sx={{
          color: isDark ? '#94a3b8' : '#334155',
          maxWidth: 800,
          lineHeight: 1.6,
          mb: 2.5,
          fontSize: '0.95rem',
        }}
      >
        {algorithm.description}
      </Typography>

      {/* Complexity Cards */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' },
          gap: 1.5,
        }}
      >
        <Box sx={cardStyle}>
          <Typography variant="caption" sx={{ color: isDark ? '#64748b' : '#64748b', fontWeight: 600, display: 'block' }}>
            BEST TIME
          </Typography>
          <Typography variant="h6" sx={{ fontFamily: 'monospace', color: isDark ? '#10b981' : '#059669', fontWeight: 700, mt: 0.5 }}>
            {algorithm.timeComplexity?.best || 'N/A'}
          </Typography>
        </Box>

        <Box sx={cardStyle}>
          <Typography variant="caption" sx={{ color: isDark ? '#64748b' : '#64748b', fontWeight: 600, display: 'block' }}>
            AVERAGE TIME
          </Typography>
          <Typography variant="h6" sx={{ fontFamily: 'monospace', color: isDark ? '#f59e0b' : '#d97706', fontWeight: 700, mt: 0.5 }}>
            {algorithm.timeComplexity?.average || 'N/A'}
          </Typography>
        </Box>

        <Box sx={cardStyle}>
          <Typography variant="caption" sx={{ color: isDark ? '#64748b' : '#64748b', fontWeight: 600, display: 'block' }}>
            WORST TIME
          </Typography>
          <Typography variant="h6" sx={{ fontFamily: 'monospace', color: '#ef4444', fontWeight: 700, mt: 0.5 }}>
            {algorithm.timeComplexity?.worst || 'N/A'}
          </Typography>
        </Box>

        <Box sx={cardStyle}>
          <Typography variant="caption" sx={{ color: isDark ? '#64748b' : '#64748b', fontWeight: 600, display: 'block' }}>
            SPACE COMPLEXITY
          </Typography>
          <Typography variant="h6" sx={{ fontFamily: 'monospace', color: isDark ? '#38bdf8' : '#0284c7', fontWeight: 700, mt: 0.5 }}>
            {algorithm.spaceComplexity || 'O(1)'}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

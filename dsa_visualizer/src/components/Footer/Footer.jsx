'use client';

import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from 'next/link';
import { useColorMode } from '../../app/ThemeRegistry';

export default function Footer() {
  const { mode } = useColorMode();
  const isDark = mode === 'dark';

  return (
    <Box
      component="footer"
      sx={{
        position: 'relative',
        zIndex: 10,
        mt: { xs: 8, md: 10 },
        py: 6,
        backgroundColor: isDark ? '#070a13' : '#ffffff',
        borderTop: isDark ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.08)',
        boxShadow: isDark ? '0 -10px 30px rgba(0, 0, 0, 0.35)' : '0 -4px 20px rgba(0, 0, 0, 0.04)',
        transition: 'background 0.25s ease, border-color 0.25s ease',
      }}
    >
      <Container maxWidth="xl">
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: '2fr 1fr 1fr 1fr' },
            gap: 4,
            mb: 4,
          }}
        >
          {/* Brand info with enlarged Logo */}
          <Box>
            <Box
              component="img"
              src="/logo.png"
              alt="DSA Visualizer Logo"
              sx={{
                height: 52,
                width: 'auto',
                mb: 2,
                filter: isDark
                  ? 'drop-shadow(0 2px 10px rgba(14, 165, 233, 0.25))'
                  : 'drop-shadow(0 2px 6px rgba(0, 0, 0, 0.08))',
              }}
            />
            <Typography variant="body2" sx={{ color: isDark ? '#94a3b8' : '#475569', maxWidth: 360, lineHeight: 1.7 }}>
              Interactive visual learning platform for Data Structures and Algorithms. Master core computational logic through animated execution, 3D constellations, and verified C & Python code.
            </Typography>
          </Box>

          {/* Quick Links */}
          <Box>
            <Typography variant="subtitle2" sx={{ fontWeight: 700, color: isDark ? '#f8fafc' : '#0f172a', mb: 1.5 }}>
              Algorithms
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Link href="/sorting" style={{ color: isDark ? '#94a3b8' : '#64748b', fontSize: '0.875rem' }}>Sorting Suite</Link>
              <Link href="/searching" style={{ color: isDark ? '#94a3b8' : '#64748b', fontSize: '0.875rem' }}>Binary Search</Link>
              <Link href="/pathfinding" style={{ color: isDark ? '#94a3b8' : '#64748b', fontSize: '0.875rem' }}>A* Pathfinding</Link>
              <Link href="/graph" style={{ color: isDark ? '#94a3b8' : '#64748b', fontSize: '0.875rem' }}>Dijkstra Graph</Link>
            </Box>
          </Box>

          {/* Structures */}
          <Box>
            <Typography variant="subtitle2" sx={{ fontWeight: 700, color: isDark ? '#f8fafc' : '#0f172a', mb: 1.5 }}>
              Structures
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Link href="/data-structures" style={{ color: isDark ? '#94a3b8' : '#64748b', fontSize: '0.875rem' }}>Arrays & Linked Lists</Link>
              <Link href="/data-structures" style={{ color: isDark ? '#94a3b8' : '#64748b', fontSize: '0.875rem' }}>Stacks & Queues</Link>
              <Link href="/data-structures" style={{ color: isDark ? '#94a3b8' : '#64748b', fontSize: '0.875rem' }}>Binary Search Trees</Link>
              <Link href="/dynamic-programming" style={{ color: isDark ? '#94a3b8' : '#64748b', fontSize: '0.875rem' }}>0/1 Knapsack DP</Link>
            </Box>
          </Box>

          {/* Practice & Analysis */}
          <Box>
            <Typography variant="subtitle2" sx={{ fontWeight: 700, color: isDark ? '#f8fafc' : '#0f172a', mb: 1.5 }}>
              Interactive
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Link href="/compare" style={{ color: isDark ? '#94a3b8' : '#64748b', fontSize: '0.875rem' }}>Race Arena 🏁</Link>
              <Link href="/recursion" style={{ color: isDark ? '#94a3b8' : '#64748b', fontSize: '0.875rem' }}>N-Queens Backtracking</Link>
              <Link href="/complexity" style={{ color: isDark ? '#94a3b8' : '#64748b', fontSize: '0.875rem' }}>Big-O Curves & Cheat Sheet</Link>
            </Box>
          </Box>
        </Box>

        <Box
          sx={{
            pt: 4,
            borderTop: isDark ? '1px solid rgba(255, 255, 255, 0.05)' : '1px solid rgba(0, 0, 0, 0.05)',
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <Typography variant="caption" sx={{ color: isDark ? '#64748b' : '#94a3b8' }}>
            © {new Date().getFullYear()} DSA Visualizer. Crafted with precision for visual algorithmic mastery.
          </Typography>
          <Box sx={{ display: 'flex', gap: 3 }}>
            <Link href="/" style={{ color: isDark ? '#64748b' : '#94a3b8', fontSize: '0.75rem' }}>Home</Link>
            <Link href="/complexity" style={{ color: isDark ? '#64748b' : '#94a3b8', fontSize: '0.75rem' }}>Documentation</Link>
            <Link href="/compare" style={{ color: isDark ? '#64748b' : '#94a3b8', fontSize: '0.75rem' }}>Benchmarks</Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

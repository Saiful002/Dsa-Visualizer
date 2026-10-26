'use client';

import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from 'next/link';

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        mt: 8,
        py: 6,
        backgroundColor: '#070a12',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
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
          {/* Brand info */}
          <Box>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 800,
                letterSpacing: '0.1rem',
                color: '#38bdf8',
                mb: 1.5,
                fontFamily: 'monospace',
              }}
            >
              DSA VISUALIZER
            </Typography>
            <Typography variant="body2" sx={{ color: '#94a3b8', maxWidth: 360, lineHeight: 1.7 }}>
              An interactive visual learning platform for Data Structures and Algorithms. Master core computational thinking through real-time step execution, animated data flows, verified C & PHP code, and algorithmic theory.
            </Typography>
          </Box>

          {/* Quick Links */}
          <Box>
            <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#f8fafc', mb: 1.5 }}>
              Algorithms
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Link href="/sorting" style={{ color: '#94a3b8', fontSize: '0.875rem' }}>Sorting Suite</Link>
              <Link href="/searching" style={{ color: '#94a3b8', fontSize: '0.875rem' }}>Binary Search</Link>
              <Link href="/pathfinding" style={{ color: '#94a3b8', fontSize: '0.875rem' }}>A* Pathfinding</Link>
              <Link href="/graph" style={{ color: '#94a3b8', fontSize: '0.875rem' }}>Dijkstra Graph</Link>
              <Link href="/recursion" style={{ color: '#94a3b8', fontSize: '0.875rem' }}>N-Queens Solver</Link>
            </Box>
          </Box>

          {/* Data Structures */}
          <Box>
            <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#f8fafc', mb: 1.5 }}>
              Structures
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Link href="/data-structures" style={{ color: '#94a3b8', fontSize: '0.875rem' }}>Arrays & Pointers</Link>
              <Link href="/data-structures" style={{ color: '#94a3b8', fontSize: '0.875rem' }}>Linked Lists</Link>
              <Link href="/data-structures" style={{ color: '#94a3b8', fontSize: '0.875rem' }}>Stacks & Queues</Link>
              <Link href="/data-structures" style={{ color: '#94a3b8', fontSize: '0.875rem' }}>Binary Search Trees</Link>
              <Link href="/dynamic-programming" style={{ color: '#94a3b8', fontSize: '0.875rem' }}>0/1 Knapsack DP</Link>
            </Box>
          </Box>

          {/* Tools */}
          <Box>
            <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#f8fafc', mb: 1.5 }}>
              Tools & Docs
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Link href="/compare" style={{ color: '#94a3b8', fontSize: '0.875rem' }}>Algorithm Race Arena</Link>
              <Link href="/complexity" style={{ color: '#94a3b8', fontSize: '0.875rem' }}>Big-O Cheat Sheet</Link>
              <Link href="/sorting" style={{ color: '#94a3b8', fontSize: '0.875rem' }}>C / PHP Source Downloads</Link>
            </Box>
          </Box>
        </Box>

        <Box
          sx={{
            pt: 4,
            borderTop: '1px solid rgba(255, 255, 255, 0.05)',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <Typography variant="caption" sx={{ color: '#64748b' }}>
            © {new Date().getFullYear()} DSA Visualizer. Crafted for visual computer science learners.
          </Typography>
          <Typography variant="caption" sx={{ color: '#64748b' }}>
            Learn → Visualize → Practice → Understand
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

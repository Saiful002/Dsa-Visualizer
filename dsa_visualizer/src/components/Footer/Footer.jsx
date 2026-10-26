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
        mt: 10,
        py: 6,
        backgroundColor: '#05070e',
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
            <Box
              component="img"
              src="/logo.png"
              alt="DSA Visualizer Logo"
              sx={{ height: 38, width: 'auto', mb: 2 }}
            />
            <Typography variant="body2" sx={{ color: '#94a3b8', maxWidth: 360, lineHeight: 1.7 }}>
              Interactive visual learning platform for Data Structures and Algorithms. Master core computational logic through animated execution, 3D constellations, and verified C & Python code.
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
            </Box>
          </Box>

          {/* Structures */}
          <Box>
            <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#f8fafc', mb: 1.5 }}>
              Structures
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Link href="/data-structures" style={{ color: '#94a3b8', fontSize: '0.875rem' }}>Arrays & Linked Lists</Link>
              <Link href="/data-structures" style={{ color: '#94a3b8', fontSize: '0.875rem' }}>Stacks & Queues</Link>
              <Link href="/data-structures" style={{ color: '#94a3b8', fontSize: '0.875rem' }}>Binary Search Trees</Link>
              <Link href="/dynamic-programming" style={{ color: '#94a3b8', fontSize: '0.875rem' }}>0/1 Knapsack DP</Link>
            </Box>
          </Box>

          {/* Tools */}
          <Box>
            <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#f8fafc', mb: 1.5 }}>
              Interactive
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Link href="/compare" style={{ color: '#f97316', fontSize: '0.875rem', fontWeight: 600 }}>Race Arena 🏁</Link>
              <Link href="/recursion" style={{ color: '#10b981', fontSize: '0.875rem', fontWeight: 600 }}>N-Queens Backtracking</Link>
              <Link href="/complexity" style={{ color: '#0ea5e9', fontSize: '0.875rem', fontWeight: 600 }}>Big-O Curves & Cheat Sheet</Link>
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
            © {new Date().getFullYear()} DSA Visualizer. Learn • Visualize • Practice • Master.
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
            <Box sx={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#0ea5e9' }} />
            <Box sx={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#10b981' }} />
            <Box sx={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#f97316' }} />
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

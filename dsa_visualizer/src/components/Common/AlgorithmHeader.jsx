'use client';

import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';

export default function AlgorithmHeader({ algorithm }) {
  if (!algorithm) return null;

  const difficultyColors = {
    Easy: { bg: 'rgba(16, 185, 129, 0.15)', text: '#10b981', border: 'rgba(16, 185, 129, 0.3)' },
    Medium: { bg: 'rgba(245, 158, 11, 0.15)', text: '#f59e0b', border: 'rgba(245, 158, 11, 0.3)' },
    Hard: { bg: 'rgba(239, 68, 68, 0.15)', text: '#ef4444', border: 'rgba(239, 68, 68, 0.3)' },
  };

  const diffStyle = difficultyColors[algorithm.difficulty] || difficultyColors.Easy;

  return (
    <Box sx={{ mb: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 1.5, mb: 1 }}>
        <Chip
          label={algorithm.category}
          size="small"
          sx={{
            backgroundColor: 'rgba(56, 189, 248, 0.12)',
            color: '#38bdf8',
            border: '1px solid rgba(56, 189, 248, 0.25)',
            fontWeight: 600,
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
            fontWeight: 600,
            fontSize: '0.75rem',
          }}
        />
      </Box>

      <Typography
        variant="h4"
        component="h1"
        sx={{
          fontWeight: 800,
          letterSpacing: '-0.02em',
          background: 'linear-gradient(135deg, #ffffff 0%, #cbd5e1 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          mb: 1,
        }}
      >
        {algorithm.name}
      </Typography>

      <Typography variant="body1" sx={{ color: '#94a3b8', maxWidth: 800, lineHeight: 1.6, mb: 2.5 }}>
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
        <Box
          sx={{
            p: 1.5,
            borderRadius: 2,
            backgroundColor: 'rgba(15, 23, 42, 0.6)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
          }}
        >
          <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 600, display: 'block' }}>
            BEST TIME
          </Typography>
          <Typography variant="h6" sx={{ fontFamily: 'monospace', color: '#10b981', fontWeight: 700, mt: 0.5 }}>
            {algorithm.timeComplexity?.best || 'N/A'}
          </Typography>
        </Box>

        <Box
          sx={{
            p: 1.5,
            borderRadius: 2,
            backgroundColor: 'rgba(15, 23, 42, 0.6)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
          }}
        >
          <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 600, display: 'block' }}>
            AVERAGE TIME
          </Typography>
          <Typography variant="h6" sx={{ fontFamily: 'monospace', color: '#f59e0b', fontWeight: 700, mt: 0.5 }}>
            {algorithm.timeComplexity?.average || 'N/A'}
          </Typography>
        </Box>

        <Box
          sx={{
            p: 1.5,
            borderRadius: 2,
            backgroundColor: 'rgba(15, 23, 42, 0.6)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
          }}
        >
          <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 600, display: 'block' }}>
            WORST TIME
          </Typography>
          <Typography variant="h6" sx={{ fontFamily: 'monospace', color: '#ef4444', fontWeight: 700, mt: 0.5 }}>
            {algorithm.timeComplexity?.worst || 'N/A'}
          </Typography>
        </Box>

        <Box
          sx={{
            p: 1.5,
            borderRadius: 2,
            backgroundColor: 'rgba(15, 23, 42, 0.6)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
          }}
        >
          <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 600, display: 'block' }}>
            SPACE COMPLEXITY
          </Typography>
          <Typography variant="h6" sx={{ fontFamily: 'monospace', color: '#38bdf8', fontWeight: 700, mt: 0.5 }}>
            {algorithm.spaceComplexity || 'O(1)'}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

'use client';

import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import { InfoIcon } from './Icons';

export default function StepExplanation({
  stepNumber = 0,
  totalSteps = 0,
  actionType = 'IDLE',
  description = 'Ready to begin. Click Play or Next Step to start the visualization.',
  stats = {},
}) {
  const getActionBadge = (type) => {
    switch (type) {
      case 'COMPARE':
        return { label: 'COMPARING', bg: 'rgba(245, 158, 11, 0.15)', color: '#f59e0b', border: 'rgba(245, 158, 11, 0.3)' };
      case 'SWAP':
        return { label: 'SWAPPING', bg: 'rgba(239, 68, 68, 0.15)', color: '#ef4444', border: 'rgba(239, 68, 68, 0.3)' };
      case 'OVERWRITE':
        return { label: 'OVERWRITING', bg: 'rgba(168, 85, 247, 0.15)', color: '#a855f7', border: 'rgba(168, 85, 247, 0.3)' };
      case 'VISIT':
        return { label: 'VISITING', bg: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8', border: 'rgba(56, 189, 248, 0.3)' };
      case 'FOUND':
      case 'SORTED':
      case 'COMPLETE':
        return { label: 'COMPLETED', bg: 'rgba(16, 185, 129, 0.15)', color: '#10b981', border: 'rgba(16, 185, 129, 0.3)' };
      default:
        return { label: 'READY', bg: 'rgba(148, 163, 184, 0.15)', color: '#94a3b8', border: 'rgba(148, 163, 184, 0.25)' };
    }
  };

  const badge = getActionBadge(actionType);

  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 2,
        p: 2,
        borderRadius: 2.5,
        backgroundColor: 'rgba(15, 23, 42, 0.7)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        mb: 2.5,
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flex: 1, minWidth: 260 }}>
        <Chip
          label={badge.label}
          size="small"
          sx={{
            backgroundColor: badge.bg,
            color: badge.color,
            border: `1px solid ${badge.border}`,
            fontWeight: 700,
            fontSize: '0.75rem',
            letterSpacing: '0.05em',
          }}
        />
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <InfoIcon size={16} color="#38bdf8" />
          <Typography
            variant="body2"
            sx={{
              color: '#e2e8f0',
              fontWeight: 500,
              fontSize: '0.9rem',
              lineHeight: 1.5,
            }}
          >
            {description}
          </Typography>
        </Box>
      </Box>

      {/* Step Counter & Live Stats */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        {stats.comparisons !== undefined && (
          <Typography variant="caption" sx={{ color: '#94a3b8', fontFamily: 'monospace' }}>
            Comparisons: <strong style={{ color: '#f59e0b' }}>{stats.comparisons}</strong>
          </Typography>
        )}
        {stats.swaps !== undefined && (
          <Typography variant="caption" sx={{ color: '#94a3b8', fontFamily: 'monospace' }}>
            Swaps: <strong style={{ color: '#ef4444' }}>{stats.swaps}</strong>
          </Typography>
        )}
        <Box
          sx={{
            px: 1.5,
            py: 0.5,
            borderRadius: 1.5,
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
          }}
        >
          <Typography variant="caption" sx={{ color: '#cbd5e1', fontWeight: 600, fontFamily: 'monospace' }}>
            Step {stepNumber} / {totalSteps}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

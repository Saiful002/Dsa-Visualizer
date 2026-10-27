'use client';

import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import { InfoIcon } from './Icons';
import { useColorMode } from '../../app/ThemeRegistry';

export default function StepExplanation({
  stepNumber = 0,
  totalSteps = 0,
  actionType = 'IDLE',
  description = 'Ready to begin. Click Play or Next Step to start the visualization.',
  stats = {},
}) {
  const { mode } = useColorMode();
  const isDark = mode === 'dark';

  const getActionBadge = (type) => {
    switch (type) {
      case 'COMPARE':
        return { label: 'COMPARING', bg: 'rgba(245, 158, 11, 0.15)', color: isDark ? '#f59e0b' : '#d97706', border: 'rgba(245, 158, 11, 0.3)' };
      case 'SWAP':
        return { label: 'SWAPPING', bg: 'rgba(239, 68, 68, 0.15)', color: '#ef4444', border: 'rgba(239, 68, 68, 0.3)' };
      case 'OVERWRITE':
        return { label: 'OVERWRITING', bg: 'rgba(168, 85, 247, 0.15)', color: '#a855f7', border: 'rgba(168, 85, 247, 0.3)' };
      case 'VISIT':
        return { label: 'VISITING', bg: 'rgba(56, 189, 248, 0.15)', color: isDark ? '#38bdf8' : '#0284c7', border: 'rgba(56, 189, 248, 0.3)' };
      case 'FOUND':
      case 'SORTED':
      case 'COMPLETE':
        return { label: 'COMPLETED', bg: 'rgba(16, 185, 129, 0.15)', color: isDark ? '#10b981' : '#059669', border: 'rgba(16, 185, 129, 0.3)' };
      default:
        return { label: 'READY', bg: isDark ? 'rgba(148, 163, 184, 0.15)' : 'rgba(100, 116, 139, 0.1)', color: isDark ? '#94a3b8' : '#64748b', border: isDark ? 'rgba(148, 163, 184, 0.25)' : 'rgba(100, 116, 139, 0.2)' };
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
        backgroundColor: isDark ? 'rgba(15, 23, 42, 0.7)' : 'rgba(255, 255, 255, 0.85)',
        border: isDark ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid rgba(0, 0, 0, 0.08)',
        boxShadow: isDark ? 'none' : '0 2px 10px rgba(0, 0, 0, 0.04)',
        mb: 2.5,
        transition: 'all 0.2s ease',
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
          <InfoIcon size={16} color={isDark ? "#38bdf8" : "#0284c7"} />
          <Typography
            variant="body2"
            sx={{
              color: isDark ? '#e2e8f0' : '#1e293b',
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
          <Typography variant="caption" sx={{ color: isDark ? '#94a3b8' : '#64748b', fontFamily: 'monospace' }}>
            Comparisons: <strong style={{ color: isDark ? '#f59e0b' : '#d97706' }}>{stats.comparisons}</strong>
          </Typography>
        )}
        {stats.swaps !== undefined && (
          <Typography variant="caption" sx={{ color: isDark ? '#94a3b8' : '#64748b', fontFamily: 'monospace' }}>
            Swaps: <strong style={{ color: '#ef4444' }}>{stats.swaps}</strong>
          </Typography>
        )}
        <Box
          sx={{
            px: 1.5,
            py: 0.5,
            borderRadius: 1.5,
            backgroundColor: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.04)',
            border: isDark ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid rgba(0, 0, 0, 0.08)',
          }}
        >
          <Typography variant="caption" sx={{ color: isDark ? '#cbd5e1' : '#334155', fontWeight: 600, fontFamily: 'monospace' }}>
            Step {stepNumber} / {totalSteps}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

'use client';

import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useColorMode } from '../../app/ThemeRegistry';

export default function PseudocodeViewer({ pseudocode = [], activeLine = null }) {
  const { mode } = useColorMode();
  const isDark = mode === 'dark';

  if (!pseudocode || pseudocode.length === 0) return null;

  return (
    <Box
      sx={{
        borderRadius: 2.5,
        backgroundColor: isDark ? '#0a0f1d' : '#ffffff',
        border: isDark ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid rgba(0, 0, 0, 0.08)',
        overflow: 'hidden',
        boxShadow: isDark ? '0 8px 24px rgba(0, 0, 0, 0.4)' : '0 4px 16px rgba(0, 0, 0, 0.05)',
        transition: 'all 0.2s ease',
      }}
    >
      <Box
        sx={{
          px: 2,
          py: 1.25,
          backgroundColor: isDark ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.03)',
          borderBottom: isDark ? '1px solid rgba(255, 255, 255, 0.06)' : '1px solid rgba(0, 0, 0, 0.06)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Typography variant="caption" sx={{ fontWeight: 700, color: isDark ? '#94a3b8' : '#64748b', letterSpacing: '0.05em' }}>
          PSEUDOCODE EXECUTION
        </Typography>
        {activeLine && (
          <Typography variant="caption" sx={{ color: isDark ? '#38bdf8' : '#0284c7', fontFamily: 'monospace', fontWeight: 700 }}>
            Line {activeLine}
          </Typography>
        )}
      </Box>

      <Box
        sx={{
          p: 1.5,
          maxHeight: 280,
          overflowY: 'auto',
          fontFamily: 'Consolas, Monaco, "Courier New", monospace',
          fontSize: '0.82rem',
          lineHeight: 1.6,
        }}
      >
        {pseudocode.map((item) => {
          const isActive = item.line === activeLine;
          return (
            <Box
              key={item.line}
              sx={{
                display: 'flex',
                alignItems: 'center',
                px: 1,
                py: 0.35,
                borderRadius: 1,
                backgroundColor: isActive
                  ? isDark
                    ? 'rgba(56, 189, 248, 0.15)'
                    : 'rgba(2, 132, 199, 0.1)'
                  : 'transparent',
                borderLeft: isActive
                  ? `3px solid ${isDark ? '#38bdf8' : '#0284c7'}`
                  : '3px solid transparent',
                transition: 'all 0.15s ease',
              }}
            >
              <Typography
                component="span"
                sx={{
                  width: 28,
                  userSelect: 'none',
                  color: isActive ? (isDark ? '#38bdf8' : '#0284c7') : isDark ? '#475569' : '#94a3b8',
                  fontWeight: isActive ? 700 : 500,
                  fontSize: '0.75rem',
                  textAlign: 'right',
                  mr: 1.5,
                  fontFamily: 'inherit',
                }}
              >
                {item.line}
              </Typography>
              <Typography
                component="span"
                sx={{
                  color: isActive ? (isDark ? '#f8fafc' : '#0f172a') : isDark ? '#94a3b8' : '#475569',
                  fontWeight: isActive ? 700 : 400,
                  fontFamily: 'inherit',
                  whiteSpace: 'pre',
                }}
              >
                {item.text}
              </Typography>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}

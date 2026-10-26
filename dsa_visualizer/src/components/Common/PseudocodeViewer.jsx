'use client';

import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function PseudocodeViewer({ pseudocode = [], activeLine = null }) {
  if (!pseudocode || pseudocode.length === 0) return null;

  return (
    <Box
      sx={{
        borderRadius: 2.5,
        backgroundColor: '#0a0f1d',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        overflow: 'hidden',
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.4)',
      }}
    >
      <Box
        sx={{
          px: 2,
          py: 1.25,
          backgroundColor: 'rgba(255, 255, 255, 0.03)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Typography variant="caption" sx={{ fontWeight: 700, color: '#94a3b8', letterSpacing: '0.05em' }}>
          PSEUDOCODE EXECUTION
        </Typography>
        {activeLine && (
          <Typography variant="caption" sx={{ color: '#38bdf8', fontFamily: 'monospace' }}>
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
          fontSize: '0.8rem',
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
                py: 0.25,
                borderRadius: 1,
                backgroundColor: isActive ? 'rgba(56, 189, 248, 0.15)' : 'transparent',
                borderLeft: isActive ? '3px solid #38bdf8' : '3px solid transparent',
                transition: 'all 0.15s ease',
              }}
            >
              <Typography
                component="span"
                sx={{
                  width: 28,
                  userSelect: 'none',
                  color: isActive ? '#38bdf8' : '#475569',
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
                  color: isActive ? '#f8fafc' : '#94a3b8',
                  fontWeight: isActive ? 600 : 400,
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

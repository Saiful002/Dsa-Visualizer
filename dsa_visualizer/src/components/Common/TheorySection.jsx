'use client';

import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

export default function TheorySection({ theory }) {
  if (!theory) return null;

  return (
    <Box sx={{ mt: 4 }}>
      <Typography
        variant="h5"
        sx={{
          fontWeight: 700,
          color: '#f8fafc',
          mb: 2.5,
          display: 'flex',
          alignItems: 'center',
          gap: 1.5,
        }}
      >
        <span style={{ color: '#38bdf8' }}>📖</span> Theory & Deep Dive
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
        {/* What & Why Row */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
            gap: 2,
          }}
        >
          <Paper
            elevation={0}
            sx={{
              p: 2.5,
              borderRadius: 2.5,
              backgroundColor: 'rgba(15, 23, 42, 0.6)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
            }}
          >
            <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#38bdf8', mb: 1 }}>
              What is it?
            </Typography>
            <Typography variant="body2" sx={{ color: '#cbd5e1', lineHeight: 1.7 }}>
              {theory.what}
            </Typography>
          </Paper>

          <Paper
            elevation={0}
            sx={{
              p: 2.5,
              borderRadius: 2.5,
              backgroundColor: 'rgba(15, 23, 42, 0.6)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
            }}
          >
            <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#818cf8', mb: 1 }}>
              Why is it used?
            </Typography>
            <Typography variant="body2" sx={{ color: '#cbd5e1', lineHeight: 1.7 }}>
              {theory.why}
            </Typography>
          </Paper>
        </Box>

        {/* Real-World Analogy */}
        {theory.analogy && (
          <Paper
            elevation={0}
            sx={{
              p: 2.5,
              borderRadius: 2.5,
              backgroundColor: 'rgba(56, 189, 248, 0.05)',
              border: '1px solid rgba(56, 189, 248, 0.2)',
            }}
          >
            <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#38bdf8', mb: 0.75 }}>
              💡 Real-World Analogy
            </Typography>
            <Typography variant="body2" sx={{ color: '#e2e8f0', lineHeight: 1.7, fontStyle: 'italic' }}>
              &ldquo;{theory.analogy}&rdquo;
            </Typography>
          </Paper>
        )}

        {/* How It Works Steps */}
        {theory.how && (
          <Paper
            elevation={0}
            sx={{
              p: 2.5,
              borderRadius: 2.5,
              backgroundColor: 'rgba(15, 23, 42, 0.6)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
            }}
          >
            <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#f8fafc', mb: 1.5 }}>
              How It Works: Step-by-Step
            </Typography>
            <Box component="ol" sx={{ pl: 2.5, m: 0, color: '#cbd5e1', lineHeight: 1.8 }}>
              {theory.how.map((step, idx) => (
                <li key={idx} style={{ marginBottom: '6px' }}>
                  <Typography variant="body2" component="span" sx={{ color: '#cbd5e1' }}>
                    {step}
                  </Typography>
                </li>
              ))}
            </Box>
          </Paper>
        )}

        {/* Advantages & Disadvantages */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
            gap: 2,
          }}
        >
          {theory.pros && (
            <Paper
              elevation={0}
              sx={{
                p: 2.5,
                borderRadius: 2.5,
                backgroundColor: 'rgba(16, 185, 129, 0.05)',
                border: '1px solid rgba(16, 185, 129, 0.2)',
              }}
            >
              <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#10b981', mb: 1.5 }}>
                ✓ Advantages
              </Typography>
              <Box component="ul" sx={{ pl: 2, m: 0, color: '#cbd5e1', fontSize: '0.85rem', lineHeight: 1.7 }}>
                {theory.pros.map((pro, idx) => (
                  <li key={idx} style={{ marginBottom: '4px' }}>
                    {pro}
                  </li>
                ))}
              </Box>
            </Paper>
          )}

          {theory.cons && (
            <Paper
              elevation={0}
              sx={{
                p: 2.5,
                borderRadius: 2.5,
                backgroundColor: 'rgba(239, 68, 68, 0.05)',
                border: '1px solid rgba(239, 68, 68, 0.2)',
              }}
            >
              <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#ef4444', mb: 1.5 }}>
                ✗ Disadvantages
              </Typography>
              <Box component="ul" sx={{ pl: 2, m: 0, color: '#cbd5e1', fontSize: '0.85rem', lineHeight: 1.7 }}>
                {theory.cons.map((con, idx) => (
                  <li key={idx} style={{ marginBottom: '4px' }}>
                    {con}
                  </li>
                ))}
              </Box>
            </Paper>
          )}
        </Box>

        {/* When to use vs When not to use */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
            gap: 2,
          }}
        >
          <Paper
            elevation={0}
            sx={{
              p: 2,
              borderRadius: 2,
              backgroundColor: 'rgba(15, 23, 42, 0.5)',
              border: '1px solid rgba(255, 255, 255, 0.06)',
            }}
          >
            <Typography variant="caption" sx={{ fontWeight: 700, color: '#10b981', display: 'block', mb: 0.5 }}>
              WHEN TO USE IT
            </Typography>
            <Typography variant="body2" sx={{ color: '#cbd5e1' }}>
              {theory.whenToUse}
            </Typography>
          </Paper>

          <Paper
            elevation={0}
            sx={{
              p: 2,
              borderRadius: 2,
              backgroundColor: 'rgba(15, 23, 42, 0.5)',
              border: '1px solid rgba(255, 255, 255, 0.06)',
            }}
          >
            <Typography variant="caption" sx={{ fontWeight: 700, color: '#f59e0b', display: 'block', mb: 0.5 }}>
              WHEN NOT TO USE IT
            </Typography>
            <Typography variant="body2" sx={{ color: '#cbd5e1' }}>
              {theory.whenNotToUse}
            </Typography>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
}

'use client';

import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { useColorMode } from '../../app/ThemeRegistry';

export default function TheorySection({ theory }) {
  const { mode } = useColorMode();
  const isDark = mode === 'dark';

  if (!theory) return null;

  const paperBg = isDark ? 'rgba(15, 23, 42, 0.6)' : 'rgba(255, 255, 255, 0.85)';
  const paperBorder = isDark ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid rgba(0, 0, 0, 0.08)';
  const bodyTextColor = isDark ? '#cbd5e1' : '#334155';

  return (
    <Box sx={{ mt: 4 }}>
      <Typography
        variant="h5"
        sx={{
          fontWeight: 700,
          color: isDark ? '#f8fafc' : '#0f172a',
          mb: 2.5,
          display: 'flex',
          alignItems: 'center',
          gap: 1.5,
        }}
      >
        <span style={{ color: '#0ea5e9' }}>📖</span> Theory & Deep Dive
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
              backgroundColor: paperBg,
              border: paperBorder,
              boxShadow: isDark ? 'none' : '0 2px 10px rgba(0,0,0,0.03)',
            }}
          >
            <Typography variant="subtitle1" sx={{ fontWeight: 700, color: isDark ? '#38bdf8' : '#0284c7', mb: 1 }}>
              What is it?
            </Typography>
            <Typography variant="body2" sx={{ color: bodyTextColor, lineHeight: 1.7 }}>
              {theory.what}
            </Typography>
          </Paper>

          <Paper
            elevation={0}
            sx={{
              p: 2.5,
              borderRadius: 2.5,
              backgroundColor: paperBg,
              border: paperBorder,
              boxShadow: isDark ? 'none' : '0 2px 10px rgba(0,0,0,0.03)',
            }}
          >
            <Typography variant="subtitle1" sx={{ fontWeight: 700, color: isDark ? '#818cf8' : '#4f46e5', mb: 1 }}>
              Why is it used?
            </Typography>
            <Typography variant="body2" sx={{ color: bodyTextColor, lineHeight: 1.7 }}>
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
              backgroundColor: isDark ? 'rgba(56, 189, 248, 0.05)' : 'rgba(2, 132, 199, 0.06)',
              border: `1px solid ${isDark ? 'rgba(56, 189, 248, 0.2)' : 'rgba(2, 132, 199, 0.2)'}`,
              boxShadow: isDark ? 'none' : '0 2px 10px rgba(0,0,0,0.03)',
            }}
          >
            <Typography variant="subtitle1" sx={{ fontWeight: 700, color: isDark ? '#38bdf8' : '#0284c7', mb: 0.75 }}>
              💡 Real-World Analogy
            </Typography>
            <Typography variant="body2" sx={{ color: isDark ? '#e2e8f0' : '#1e293b', lineHeight: 1.7, fontStyle: 'italic' }}>
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
              backgroundColor: paperBg,
              border: paperBorder,
              boxShadow: isDark ? 'none' : '0 2px 10px rgba(0,0,0,0.03)',
            }}
          >
            <Typography variant="subtitle1" sx={{ fontWeight: 700, color: isDark ? '#f8fafc' : '#0f172a', mb: 1.5 }}>
              How It Works: Step-by-Step
            </Typography>
            <Box component="ol" sx={{ pl: 2.5, m: 0, color: bodyTextColor, lineHeight: 1.8 }}>
              {theory.how.map((step, idx) => (
                <li key={idx} style={{ marginBottom: '6px' }}>
                  <Typography variant="body2" component="span" sx={{ color: bodyTextColor }}>
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
                backgroundColor: isDark ? 'rgba(16, 185, 129, 0.05)' : 'rgba(5, 150, 105, 0.06)',
                border: `1px solid ${isDark ? 'rgba(16, 185, 129, 0.2)' : 'rgba(5, 150, 105, 0.2)'}`,
              }}
            >
              <Typography variant="subtitle2" sx={{ fontWeight: 700, color: isDark ? '#10b981' : '#059669', mb: 1.5 }}>
                ✓ Advantages
              </Typography>
              <Box component="ul" sx={{ pl: 2, m: 0, color: bodyTextColor, fontSize: '0.85rem', lineHeight: 1.7 }}>
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
                backgroundColor: isDark ? 'rgba(239, 68, 68, 0.05)' : 'rgba(239, 68, 68, 0.06)',
                border: '1px solid rgba(239, 68, 68, 0.2)',
              }}
            >
              <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#ef4444', mb: 1.5 }}>
                ✗ Disadvantages
              </Typography>
              <Box component="ul" sx={{ pl: 2, m: 0, color: bodyTextColor, fontSize: '0.85rem', lineHeight: 1.7 }}>
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
              backgroundColor: paperBg,
              border: paperBorder,
            }}
          >
            <Typography variant="caption" sx={{ fontWeight: 700, color: isDark ? '#10b981' : '#059669', display: 'block', mb: 0.5 }}>
              WHEN TO USE IT
            </Typography>
            <Typography variant="body2" sx={{ color: bodyTextColor }}>
              {theory.whenToUse}
            </Typography>
          </Paper>

          <Paper
            elevation={0}
            sx={{
              p: 2,
              borderRadius: 2,
              backgroundColor: paperBg,
              border: paperBorder,
            }}
          >
            <Typography variant="caption" sx={{ fontWeight: 700, color: isDark ? '#f59e0b' : '#d97706', display: 'block', mb: 0.5 }}>
              WHEN NOT TO USE IT
            </Typography>
            <Typography variant="body2" sx={{ color: bodyTextColor }}>
              {theory.whenNotToUse}
            </Typography>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
}

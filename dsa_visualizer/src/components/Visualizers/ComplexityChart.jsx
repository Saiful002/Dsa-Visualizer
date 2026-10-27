'use client';

import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Slider from '@mui/material/Slider';
import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';
import { COMPLEXITY_CURVES, BIG_O_TABLE } from '../../data/complexityData';
import { useColorMode } from '../../app/ThemeRegistry';

export default function ComplexityChart() {
  const { isDark } = useColorMode();
  const [nValue, setNValue] = useState(16);
  const [searchFilter, setSearchFilter] = useState('');

  const filteredTable = BIG_O_TABLE.filter((row) =>
    row.entity.toLowerCase().includes(searchFilter.toLowerCase()) ||
    row.type.toLowerCase().includes(searchFilter.toLowerCase())
  );

  const getComplexityBadge = (val) => {
    if (!val) return null;
    let bg = 'rgba(255, 255, 255, 0.05)';
    let color = '#94a3b8';
    if (val.includes('1')) { bg = 'rgba(16, 185, 129, 0.15)'; color = '#10b981'; }
    else if (val.includes('log') && !val.includes('n log')) { bg = 'rgba(6, 182, 212, 0.15)'; color = '#06b6d4'; }
    else if (val === 'O(n)') { bg = 'rgba(59, 130, 246, 0.15)'; color = '#3b82f6'; }
    else if (val.includes('n log')) { bg = 'rgba(245, 158, 11, 0.15)'; color = '#f59e0b'; }
    else if (val.includes('²') || val.includes('^2')) { bg = 'rgba(244, 63, 94, 0.15)'; color = '#f43f5e'; }
    else if (val.includes('2^') || val.includes('!')) { bg = 'rgba(220, 38, 38, 0.15)'; color = '#dc2626'; }

    return (
      <span
        style={{
          padding: '3px 8px',
          borderRadius: '4px',
          backgroundColor: bg,
          color,
          fontFamily: 'monospace',
          fontWeight: 700,
          fontSize: '0.8rem',
        }}
      >
        {val}
      </span>
    );
  };

  const cardBg = isDark ? 'rgba(13, 19, 34, 0.75)' : 'rgba(255, 255, 255, 0.9)';
  const cardBorder = isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(15, 23, 42, 0.08)';

  return (
    <Box sx={{ width: '100%', maxWidth: 1400, mx: 'auto', px: { xs: 2, md: 4 }, py: 3 }}>
      <Box sx={{ mb: 3 }}>
          <Chip
            label="ALGORITHMIC COMPLEXITY"
            size="small"
            sx={{
              backgroundColor: 'rgba(56, 189, 248, 0.15)',
              color: '#0284c7',
              border: '1px solid rgba(56, 189, 248, 0.3)',
              fontWeight: 700,
              mb: 1,
            }}
          />
          <Typography
            variant="h4"
            sx={{
              fontWeight: 800,
              color: isDark ? '#f8fafc' : '#0f172a',
              mb: 1,
            }}
          >
            Big-O Complexity Interactive Guide
          </Typography>
          <Typography variant="body1" sx={{ color: isDark ? '#94a3b8' : '#475569' }}>
            Explore how algorithm execution cost explodes as input size N grows. Compare asymptotic orders of growth and reference the full cheat sheet.
          </Typography>
        </Box>

        {/* Interactive Graph Paper */}
        <Paper
          elevation={0}
          sx={{
            p: { xs: 2, sm: 3 },
            borderRadius: 3,
            backgroundColor: cardBg,
            backdropFilter: 'blur(16px)',
            border: `1px solid ${cardBorder}`,
            boxShadow: isDark ? '0 20px 40px rgba(0, 0, 0, 0.4)' : '0 10px 24px rgba(15, 23, 42, 0.06)',
            mb: 4,
          }}
        >
          {/* Slider for N */}
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 2,
              mb: 3,
              p: 2,
              borderRadius: 2,
              backgroundColor: isDark ? 'rgba(255, 255, 255, 0.03)' : 'rgba(15, 23, 42, 0.03)',
              border: `1px solid ${cardBorder}`,
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Typography variant="body2" sx={{ color: isDark ? '#cbd5e1' : '#334155', fontWeight: 600 }}>
                Input Elements (N):
              </Typography>
              <Chip
                label={`N = ${nValue}`}
                size="medium"
                sx={{ backgroundColor: '#0284c7', color: '#fff', fontWeight: 800, fontFamily: 'monospace' }}
              />
            </Box>
            <Box sx={{ width: { xs: '100%', sm: 300 } }}>
              <Slider
                value={nValue}
                min={2}
                max={32}
                onChange={(e, v) => setNValue(v)}
                sx={{ color: '#0284c7' }}
              />
            </Box>
          </Box>

          {/* Dynamic Big-O Operation Costs Cards */}
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: 'repeat(2, 1fr)', sm: 'repeat(3, 1fr)', md: 'repeat(6, 1fr)' },
              gap: 1.5,
              mb: 3,
            }}
          >
            {COMPLEXITY_CURVES.map((curve) => {
              const ops = Math.round(curve.formula(nValue));
              return (
                <Box
                  key={curve.name}
                  sx={{
                    p: 1.5,
                    borderRadius: 2,
                    backgroundColor: isDark ? 'rgba(9, 13, 22, 0.8)' : 'rgba(248, 250, 252, 0.95)',
                    border: `1px solid ${curve.color}40`,
                  }}
                >
                  <Typography variant="caption" sx={{ color: curve.color, fontWeight: 700, display: 'block' }}>
                    {curve.name}
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#64748b', fontSize: '0.65rem' }}>
                    {curve.label}
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{
                      fontFamily: 'monospace',
                      fontWeight: 800,
                      color: isDark ? '#ffffff' : '#0f172a',
                      mt: 0.5,
                    }}
                  >
                    {ops > 10000 ? `${ops.toLocaleString()}+` : ops}
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#64748b', fontSize: '0.65rem' }}>
                    operations
                  </Typography>
                </Box>
              );
            })}
          </Box>

          {/* SVG Plot */}
          <Box
            sx={{
              p: 2,
              backgroundColor: isDark ? 'rgba(9, 13, 22, 0.7)' : 'rgba(241, 245, 249, 0.95)',
              borderRadius: 2,
              border: `1px solid ${cardBorder}`,
              overflowX: 'auto',
            }}
          >
            <svg width="100%" height="280" viewBox="0 0 600 280">
              {/* Grid lines */}
              <line x1="50" y1="20" x2="50" y2="240" stroke={isDark ? "rgba(255,255,255,0.2)" : "rgba(15,23,42,0.2)"} strokeWidth="2" />
              <line x1="50" y1="240" x2="580" y2="240" stroke={isDark ? "rgba(255,255,255,0.2)" : "rgba(15,23,42,0.2)"} strokeWidth="2" />

              <text x="50" y="15" fill="#64748b" fontSize="11" fontFamily="monospace">Operations (Cost)</text>
              <text x="520" y="255" fill="#64748b" fontSize="11" fontFamily="monospace">Elements (N)</text>

              {/* Curves */}
              {/* O(1) Constant */}
              <line x1="50" y1="230" x2="580" y2="230" stroke="#10b981" strokeWidth="3" />

              {/* O(log n) */}
              <path
                d="M 50 240 Q 200 215, 580 195"
                fill="none"
                stroke="#06b6d4"
                strokeWidth="3"
              />

              {/* O(n) */}
              <line x1="50" y1="240" x2="580" y2="120" stroke="#3b82f6" strokeWidth="3" />

              {/* O(n log n) */}
              <path
                d="M 50 240 Q 300 150, 500 40"
                fill="none"
                stroke="#f59e0b"
                strokeWidth="3"
              />

              {/* O(n^2) */}
              <path
                d="M 50 240 Q 240 220, 360 20"
                fill="none"
                stroke="#f43f5e"
                strokeWidth="3"
              />

              {/* O(2^n) */}
              <path
                d="M 50 240 Q 150 220, 200 20"
                fill="none"
                stroke="#dc2626"
                strokeWidth="3"
              />

              {/* Interactive N vertical indicator */}
              {(() => {
                const xPos = 50 + (nValue / 32) * 500;
                return (
                  <line
                    x1={xPos}
                    y1="20"
                    x2={xPos}
                    y2="240"
                    stroke={isDark ? "#ffffff" : "#0284c7"}
                    strokeWidth="2"
                    strokeDasharray="4 4"
                  />
                );
              })()}
            </svg>
          </Box>
        </Paper>

        {/* Comprehensive Big-O Reference Cheat Sheet */}
        <Paper
          elevation={0}
          sx={{
            p: { xs: 2, sm: 3 },
            borderRadius: 3,
            backgroundColor: cardBg,
            backdropFilter: 'blur(16px)',
            border: `1px solid ${cardBorder}`,
            boxShadow: isDark ? '0 10px 30px rgba(0,0,0,0.3)' : '0 10px 24px rgba(15,23,42,0.06)',
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2.5, flexWrap: 'wrap', gap: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 700, color: isDark ? '#f8fafc' : '#0f172a' }}>
              Big-O Complexity Cheat Sheet
            </Typography>
            <TextField
              size="small"
              placeholder="Search structure or algorithm..."
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              sx={{
                width: 260,
                '& .MuiOutlinedInput-root': {
                  color: isDark ? '#ffffff' : '#0f172a',
                  backgroundColor: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(15, 23, 42, 0.04)',
                  '& fieldset': { borderColor: isDark ? 'rgba(255, 255, 255, 0.15)' : 'rgba(15, 23, 42, 0.15)' },
                  '&:hover fieldset': { borderColor: '#0284c7' },
                  '&.Mui-focused fieldset': { borderColor: '#0284c7' },
                },
              }}
            />
          </Box>

          <Box sx={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: `1px solid ${cardBorder}` }}>
                  <th style={{ padding: '10px 14px', color: '#64748b', fontSize: '0.8rem' }}>Name</th>
                  <th style={{ padding: '10px 14px', color: '#64748b', fontSize: '0.8rem' }}>Type</th>
                  <th style={{ padding: '10px 14px', color: '#64748b', fontSize: '0.8rem' }}>Time (Best)</th>
                  <th style={{ padding: '10px 14px', color: '#64748b', fontSize: '0.8rem' }}>Time (Average)</th>
                  <th style={{ padding: '10px 14px', color: '#64748b', fontSize: '0.8rem' }}>Time (Worst)</th>
                  <th style={{ padding: '10px 14px', color: '#64748b', fontSize: '0.8rem' }}>Space</th>
                </tr>
              </thead>
              <tbody>
                {filteredTable.map((row, idx) => (
                  <tr key={idx} style={{ borderBottom: `1px solid ${cardBorder}` }}>
                    <td style={{ padding: '12px 14px', color: isDark ? '#f8fafc' : '#0f172a', fontWeight: 600, fontSize: '0.85rem' }}>
                      {row.entity}
                    </td>
                    <td style={{ padding: '12px 14px' }}>
                      <Chip label={row.type} size="small" sx={{ fontSize: '0.7rem', height: 22 }} />
                    </td>
                    <td style={{ padding: '12px 14px' }}>
                      {getComplexityBadge(row.best || row.access)}
                    </td>
                    <td style={{ padding: '12px 14px' }}>
                      {getComplexityBadge(row.average || row.search)}
                    </td>
                    <td style={{ padding: '12px 14px' }}>
                      {getComplexityBadge(row.worst || row.insert)}
                    </td>
                    <td style={{ padding: '12px 14px' }}>
                      {getComplexityBadge(row.space)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Box>
        </Paper>
      </Box>
  );
}

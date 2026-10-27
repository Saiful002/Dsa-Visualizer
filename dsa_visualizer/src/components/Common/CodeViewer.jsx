'use client';

import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import { CopyIcon, CheckIcon, DownloadIcon, CodeIcon } from './Icons';
import { useColorMode } from '../../app/ThemeRegistry';

export default function CodeViewer({
  cCode = '',
  pythonCode = '',
  cFileName = 'algorithm.c',
  pythonFileName = 'algorithm.py',
}) {
  const { mode } = useColorMode();
  const isDark = mode === 'dark';

  const [selectedLang, setSelectedLang] = React.useState('c');
  const [copied, setCopied] = React.useState(false);

  const activeCode = selectedLang === 'c' ? cCode : pythonCode;
  const activeFileName = selectedLang === 'c' ? cFileName : pythonFileName;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(activeCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  const handleDownload = () => {
    const mimeType = selectedLang === 'c' ? 'text/x-c;charset=utf-8;' : 'text/x-python;charset=utf-8;';
    const blob = new Blob([activeCode], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = activeFileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const codeLines = (activeCode || '').trim().split('\n');

  return (
    <Box
      sx={{
        borderRadius: 2.5,
        backgroundColor: isDark ? '#070a13' : '#ffffff',
        border: isDark ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid rgba(0, 0, 0, 0.08)',
        overflow: 'hidden',
        boxShadow: isDark ? '0 8px 24px rgba(0, 0, 0, 0.4)' : '0 4px 16px rgba(0, 0, 0, 0.05)',
        transition: 'all 0.2s ease',
      }}
    >
      {/* Top Bar with Language Tabs & Actions */}
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          px: 2,
          py: 1.2,
          backgroundColor: isDark ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.03)',
          borderBottom: isDark ? '1px solid rgba(255, 255, 255, 0.06)' : '1px solid rgba(0, 0, 0, 0.06)',
          gap: 1.5,
        }}
      >
        {/* Language Tabs */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Button
            size="small"
            onClick={() => setSelectedLang('c')}
            startIcon={<CodeIcon size={14} color={selectedLang === 'c' ? '#0ea5e9' : isDark ? '#64748b' : '#94a3b8'} />}
            sx={{
              px: 1.5,
              py: 0.5,
              borderRadius: 1.5,
              fontSize: '0.8rem',
              fontWeight: 700,
              color: selectedLang === 'c' ? (isDark ? '#38bdf8' : '#0284c7') : isDark ? '#94a3b8' : '#64748b',
              backgroundColor: selectedLang === 'c' ? 'rgba(14, 165, 233, 0.15)' : 'transparent',
              border: `1px solid ${selectedLang === 'c' ? 'rgba(14, 165, 233, 0.35)' : 'transparent'}`,
              textTransform: 'none',
              '&:hover': {
                backgroundColor: 'rgba(14, 165, 233, 0.1)',
              },
            }}
          >
            C Implementation
          </Button>

          <Button
            size="small"
            onClick={() => setSelectedLang('python')}
            startIcon={<CodeIcon size={14} color={selectedLang === 'python' ? '#10b981' : isDark ? '#64748b' : '#94a3b8'} />}
            sx={{
              px: 1.5,
              py: 0.5,
              borderRadius: 1.5,
              fontSize: '0.8rem',
              fontWeight: 700,
              color: selectedLang === 'python' ? (isDark ? '#34d399' : '#059669') : isDark ? '#94a3b8' : '#64748b',
              backgroundColor: selectedLang === 'python' ? 'rgba(16, 185, 129, 0.15)' : 'transparent',
              border: `1px solid ${selectedLang === 'python' ? 'rgba(16, 185, 129, 0.35)' : 'transparent'}`,
              textTransform: 'none',
              '&:hover': {
                backgroundColor: 'rgba(16, 185, 129, 0.1)',
              },
            }}
          >
            Python Implementation
          </Button>
        </Box>

        {/* Action Buttons: Copy & Download */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Tooltip title={copied ? 'Copied to Clipboard!' : 'Copy Source Code'}>
            <Button
              size="small"
              variant="outlined"
              onClick={handleCopy}
              startIcon={copied ? <CheckIcon size={15} color="#10b981" /> : <CopyIcon size={15} />}
              sx={{
                color: copied ? '#10b981' : isDark ? '#cbd5e1' : '#334155',
                borderColor: copied ? '#10b981' : isDark ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.15)',
                borderRadius: 1.5,
                textTransform: 'none',
                fontSize: '0.75rem',
                fontWeight: 600,
                px: 1.25,
                '&:hover': {
                  borderColor: isDark ? '#ffffff' : '#0f172a',
                },
              }}
            >
              {copied ? 'Copied!' : 'Copy'}
            </Button>
          </Tooltip>

          <Tooltip title={`Download ${activeFileName}`}>
            <Button
              size="small"
              variant="outlined"
              onClick={handleDownload}
              startIcon={<DownloadIcon size={15} />}
              sx={{
                color: selectedLang === 'c' ? '#0ea5e9' : '#10b981',
                borderColor: selectedLang === 'c' ? 'rgba(14, 165, 233, 0.4)' : 'rgba(16, 185, 129, 0.4)',
                borderRadius: 1.5,
                textTransform: 'none',
                fontSize: '0.75rem',
                fontWeight: 600,
                px: 1.25,
                '&:hover': {
                  borderColor: selectedLang === 'c' ? '#0ea5e9' : '#10b981',
                  backgroundColor: selectedLang === 'c' ? 'rgba(14, 165, 233, 0.1)' : 'rgba(16, 185, 129, 0.1)',
                },
              }}
            >
              Download
            </Button>
          </Tooltip>
        </Box>
      </Box>

      {/* Code Display Area */}
      <Box
        sx={{
          p: 2,
          maxHeight: 420,
          overflowY: 'auto',
          fontFamily: 'Consolas, Monaco, "Courier New", monospace',
          fontSize: '0.82rem',
          lineHeight: 1.6,
          backgroundColor: isDark ? '#070a13' : '#ffffff',
        }}
      >
        <table style={{ borderCollapse: 'collapse', width: '100%' }}>
          <tbody>
            {codeLines.map((line, idx) => (
              <tr key={idx} style={{ verticalAlign: 'top' }}>
                <td
                  style={{
                    width: '36px',
                    textAlign: 'right',
                    paddingRight: '16px',
                    color: isDark ? '#475569' : '#94a3b8',
                    userSelect: 'none',
                    fontSize: '0.75rem',
                  }}
                >
                  {idx + 1}
                </td>
                <td style={{ color: isDark ? '#e2e8f0' : '#0f172a', whiteSpace: 'pre', wordBreak: 'break-all' }}>
                  {line}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Box>
    </Box>
  );
}

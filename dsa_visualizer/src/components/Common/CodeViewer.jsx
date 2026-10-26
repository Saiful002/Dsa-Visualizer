'use client';

import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import { CopyIcon, CheckIcon, DownloadIcon, CodeIcon } from './Icons';

export default function CodeViewer({
  cCode = '',
  pythonCode = '',
  cFileName = 'algorithm.c',
  pythonFileName = 'algorithm.py',
}) {
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
        backgroundColor: '#070a13',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        overflow: 'hidden',
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.4)',
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
          backgroundColor: 'rgba(255, 255, 255, 0.03)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
          gap: 1.5,
        }}
      >
        {/* Language Tabs: C & Python */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Button
            size="small"
            onClick={() => setSelectedLang('c')}
            sx={{
              px: 1.75,
              py: 0.5,
              borderRadius: 1.5,
              fontSize: '0.8rem',
              fontWeight: 700,
              color: selectedLang === 'c' ? '#ffffff' : '#94a3b8',
              backgroundColor: selectedLang === 'c' ? '#0ea5e9' : 'transparent',
              textTransform: 'none',
              '&:hover': {
                backgroundColor: selectedLang === 'c' ? '#0284c7' : 'rgba(255, 255, 255, 0.05)',
              },
            }}
          >
            C Implementation
          </Button>

          <Button
            size="small"
            onClick={() => setSelectedLang('python')}
            sx={{
              px: 1.75,
              py: 0.5,
              borderRadius: 1.5,
              fontSize: '0.8rem',
              fontWeight: 700,
              color: selectedLang === 'python' ? '#ffffff' : '#94a3b8',
              backgroundColor: selectedLang === 'python' ? '#10b981' : 'transparent',
              textTransform: 'none',
              '&:hover': {
                backgroundColor: selectedLang === 'python' ? '#059669' : 'rgba(255, 255, 255, 0.05)',
              },
            }}
          >
            Python Implementation
          </Button>

          <Typography
            variant="caption"
            sx={{
              color: '#64748b',
              fontFamily: 'monospace',
              ml: 1,
              display: { xs: 'none', sm: 'inline-block' },
            }}
          >
            {activeFileName}
          </Typography>
        </Box>

        {/* Action Buttons: Copy & Download */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Tooltip title={copied ? 'Copied!' : 'Copy Code'}>
            <Button
              size="small"
              onClick={handleCopy}
              startIcon={copied ? <CheckIcon size={15} color="#10b981" /> : <CopyIcon size={15} />}
              sx={{
                color: copied ? '#10b981' : '#cbd5e1',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                borderRadius: 1.5,
                textTransform: 'none',
                fontSize: '0.75rem',
                fontWeight: 600,
                px: 1.25,
                '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' },
              }}
            >
              {copied ? 'Copied' : 'Copy'}
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
          backgroundColor: '#070a13',
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
                    color: '#475569',
                    userSelect: 'none',
                    fontSize: '0.75rem',
                  }}
                >
                  {idx + 1}
                </td>
                <td style={{ color: '#e2e8f0', whiteSpace: 'pre', wordBreak: 'break-all' }}>
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

'use client';

import * as React from 'react';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v16-appRouter';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// The 3-4 Aesthetic Brand Colors matching the logo:
// 1. Electric Cyan/Blue: #0ea5e9
// 2. Mint Emerald: #10b981
// 3. Sunset Orange: #f97316
// 4. Deep Obsidian Dark: #070a13

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#0ea5e9',
      light: '#38bdf8',
      dark: '#0284c7',
    },
    secondary: {
      main: '#10b981',
      light: '#34d399',
      dark: '#059669',
    },
    warning: {
      main: '#f97316',
      light: '#fb923c',
      dark: '#c2410c',
    },
    background: {
      default: '#070a13',
      paper: '#0d1322',
    },
    text: {
      primary: '#f8fafc',
      secondary: '#94a3b8',
    },
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          textTransform: 'none',
          fontWeight: 600,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
  },
});

export default function ThemeRegistry({ children }) {
  return (
    <AppRouterCacheProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
}

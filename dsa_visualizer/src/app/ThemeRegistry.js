'use client';

import * as React from 'react';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v16-appRouter';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

export const ColorModeContext = React.createContext({
  mode: 'dark',
  isDark: true,
  toggleColorMode: () => {},
});

export const useColorMode = () => React.useContext(ColorModeContext);

export default function ThemeRegistry({ children }) {
  const [mode, setMode] = React.useState('dark');

  // Load user saved theme preference
  React.useEffect(() => {
    try {
      const savedMode = localStorage.getItem('dsa_theme_mode');
      if (savedMode === 'light' || savedMode === 'dark') {
        setMode(savedMode);
      }
    } catch (e) {
      // localStorage may be unavailable
    }
  }, []);

  const colorMode = React.useMemo(
    () => ({
      mode,
      isDark: mode === 'dark',
      toggleColorMode: () => {
        setMode((prevMode) => {
          const nextMode = prevMode === 'light' ? 'dark' : 'light';
          try {
            localStorage.setItem('dsa_theme_mode', nextMode);
          } catch (e) {}
          return nextMode;
        });
      },
    }),
    [mode]
  );

  // Sync with HTML body and document data-theme attribute
  React.useEffect(() => {
    document.documentElement.setAttribute('data-theme', mode);
    document.documentElement.style.colorScheme = mode;
    if (document.body) {
      document.body.className = mode;
      document.body.style.backgroundColor = mode === 'dark' ? '#070a13' : '#f8fafc';
      document.body.style.color = mode === 'dark' ? '#f8fafc' : '#0f172a';
    }
  }, [mode]);

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          ...(mode === 'dark'
            ? {
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
                divider: 'rgba(255, 255, 255, 0.08)',
              }
            : {
                primary: {
                  main: '#0284c7',
                  light: '#38bdf8',
                  dark: '#0369a1',
                },
                secondary: {
                  main: '#059669',
                  light: '#34d399',
                  dark: '#047857',
                },
                warning: {
                  main: '#ea580c',
                  light: '#fb923c',
                  dark: '#c2410c',
                },
                background: {
                  default: '#f8fafc',
                  paper: '#ffffff',
                },
                text: {
                  primary: '#0f172a',
                  secondary: '#475569',
                },
                divider: 'rgba(0, 0, 0, 0.08)',
              }),
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
                transition: 'background-color 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease',
              },
            },
          },
        },
      }),
    [mode]
  );

  return (
    <AppRouterCacheProvider>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {children}
        </ThemeProvider>
      </ColorModeContext.Provider>
    </AppRouterCacheProvider>
  );
}

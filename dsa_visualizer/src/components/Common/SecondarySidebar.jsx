'use client';

import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Chip from '@mui/material/Chip';
import Drawer from '@mui/material/Drawer';
import Tooltip from '@mui/material/Tooltip';
import Paper from '@mui/material/Paper';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  MenuIcon,
  XIcon,
  SmileIcon,
  ZapIcon,
  SparklesIcon,
} from './Icons';
import { useColorMode } from '../../app/ThemeRegistry';

const PLAYFUL_JOKES = [
  "Bubble Sort is like boiling tea: big bubbles rise to the top! 🫧",
  "Binary Search: 1 million items? Found in just 20 steps! 🎯",
  "QuickSort: Divide, conquer, and take a quick victory lap! ⚡",
  "Why did the stack overflow? It had too much on its plate! 🥞",
  "Queue: First Come, First Served. Respect the queue! 🎟️",
  "Recursion: To understand recursion, click me again! 🔄",
  "Dijkstra never asks for directions, he calculates them! 🗺️",
  "O(1) is my favorite workout: instantaneous results! 💪",
  "Dynamic Programming: Remembering your past so you don't repeat it! 🧠",
  "My CPU is chillin' at 35°C right now! ❄️",
];

export default function SecondarySidebar({
  title = 'Algorithms',
  category = 'DSA Suite',
  items = [],
  activeSlug = '',
  onSelect = () => {},
}) {
  const { mode } = useColorMode();
  const isDark = mode === 'dark';
  const [collapsed, setCollapsed] = useState(false);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [jokeIndex, setJokeIndex] = useState(0);
  const [mascotBouncing, setMascotBouncing] = useState(false);

  const triggerNextJoke = () => {
    setMascotBouncing(true);
    setJokeIndex((prev) => (prev + 1) % PLAYFUL_JOKES.length);
    setTimeout(() => setMascotBouncing(false), 500);
  };

  const sidebarContent = (isDrawer = false) => (
    <Box
      sx={{
        width: isDrawer ? 280 : collapsed ? 68 : 260,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        transition: 'width 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
        overflow: 'hidden',
      }}
    >
      {/* Top Header */}
      <Box sx={{ p: collapsed && !isDrawer ? 1.5 : 2, borderBottom: isDark ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid rgba(0, 0, 0, 0.08)' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {(!collapsed || isDrawer) ? (
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Box
                  sx={{
                    width: 10,
                    height: 10,
                    borderRadius: '50%',
                    backgroundColor: '#0ea5e9',
                    boxShadow: '0 0 8px #0ea5e9',
                  }}
                />
                <Typography
                  variant="subtitle2"
                  sx={{
                    fontWeight: 800,
                    fontSize: '0.92rem',
                    color: isDark ? '#f8fafc' : '#0f172a',
                    letterSpacing: '-0.01em',
                  }}
                >
                  {title}
                </Typography>
              </Box>
              <Typography variant="caption" sx={{ color: isDark ? '#94a3b8' : '#64748b', fontSize: '0.72rem' }}>
                {items.length} Options Available
              </Typography>
            </Box>
          ) : (
            <Tooltip title={title} placement="right">
              <Box sx={{ mx: 'auto', p: 0.5 }}>
                <ZapIcon size={20} color="#0ea5e9" />
              </Box>
            </Tooltip>
          )}

          {!isDrawer && (
            <IconButton
              size="small"
              onClick={() => setCollapsed(!collapsed)}
              title={collapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
              sx={{
                color: isDark ? '#94a3b8' : '#64748b',
                backgroundColor: isDark ? 'rgba(255, 255, 255, 0.04)' : 'rgba(0, 0, 0, 0.04)',
                borderRadius: 1.5,
                p: 0.6,
                '&:hover': {
                  backgroundColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)',
                },
              }}
            >
              {collapsed ? <ChevronRightIcon size={16} /> : <ChevronLeftIcon size={16} />}
            </IconButton>
          )}

          {isDrawer && (
            <IconButton size="small" onClick={() => setMobileDrawerOpen(false)} sx={{ color: isDark ? '#94a3b8' : '#64748b' }}>
              <XIcon size={18} />
            </IconButton>
          )}
        </Box>
      </Box>

      {/* Item List */}
      <Box sx={{ p: 1.5, flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 0.75 }}>
        {items.map((item, idx) => {
          const isActive = activeSlug === item.slug;
          const brandColor = idx % 3 === 0 ? '#0ea5e9' : idx % 3 === 1 ? '#10b981' : '#f97316';

          if (collapsed && !isDrawer) {
            return (
              <Tooltip key={item.slug} title={`${item.label} ${item.badge || ''}`} placement="right">
                <IconButton
                  onClick={() => onSelect(item.slug)}
                  sx={{
                    width: 44,
                    height: 44,
                    mx: 'auto',
                    borderRadius: 2,
                    backgroundColor: isActive ? `${brandColor}25` : 'transparent',
                    border: `1.5px solid ${isActive ? brandColor : 'transparent'}`,
                    color: isActive ? brandColor : isDark ? '#94a3b8' : '#64748b',
                    fontWeight: 700,
                    fontSize: '0.8rem',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      backgroundColor: `${brandColor}15`,
                      color: brandColor,
                    },
                  }}
                >
                  {item.label.slice(0, 2)}
                </IconButton>
              </Tooltip>
            );
          }

          return (
            <Box
              key={item.slug}
              onClick={() => {
                onSelect(item.slug);
                if (isDrawer) setMobileDrawerOpen(false);
              }}
              sx={{
                p: 1.25,
                px: 1.5,
                borderRadius: 2,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                backgroundColor: isActive
                  ? isDark
                    ? 'rgba(14, 165, 233, 0.12)'
                    : 'rgba(2, 132, 199, 0.08)'
                  : 'transparent',
                border: `1px solid ${
                  isActive
                    ? isDark
                      ? 'rgba(14, 165, 233, 0.35)'
                      : 'rgba(2, 132, 199, 0.3)'
                    : 'transparent'
                }`,
                borderLeft: isActive ? `3.5px solid ${brandColor}` : '3.5px solid transparent',
                transition: 'all 0.2s ease',
                '&:hover': {
                  backgroundColor: isDark ? 'rgba(255, 255, 255, 0.04)' : 'rgba(0, 0, 0, 0.03)',
                  transform: 'translateX(3px)',
                },
              }}
            >
              <Typography
                variant="body2"
                sx={{
                  fontWeight: isActive ? 700 : 500,
                  fontSize: '0.85rem',
                  color: isActive
                    ? isDark
                      ? '#ffffff'
                      : '#0284c7'
                    : isDark
                    ? '#cbd5e1'
                    : '#334155',
                }}
              >
                {item.label}
              </Typography>

              {item.badge && (
                <Chip
                  label={item.badge}
                  size="small"
                  sx={{
                    height: 20,
                    fontSize: '0.68rem',
                    fontWeight: 600,
                    fontFamily: 'monospace',
                    backgroundColor: isActive ? `${brandColor}25` : isDark ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.05)',
                    color: isActive ? brandColor : isDark ? '#94a3b8' : '#64748b',
                  }}
                />
              )}
            </Box>
          );
        })}
      </Box>

      {/* Playful AlgoBuddy Cartoon Mascot Widget at Bottom */}
      {(!collapsed || isDrawer) ? (
        <Box
          sx={{
            p: 1.5,
            m: 1.5,
            borderRadius: 2.5,
            backgroundColor: isDark ? 'rgba(15, 23, 42, 0.65)' : 'rgba(241, 245, 249, 0.85)',
            border: isDark ? '1px solid rgba(255, 255, 255, 0.07)' : '1px solid rgba(0, 0, 0, 0.06)',
            position: 'relative',
          }}
        >
          {/* Mascot Robot Avatar */}
          <Box
            onClick={triggerNextJoke}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1.25,
              cursor: 'pointer',
              mb: 1,
            }}
          >
            <Box
              sx={{
                width: 38,
                height: 38,
                borderRadius: '50%',
                backgroundColor: '#0f172a',
                border: '2px solid #0ea5e9',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                transform: mascotBouncing ? 'scale(1.2) rotate(10deg)' : 'scale(1)',
                transition: 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
                boxShadow: '0 0 12px rgba(14, 165, 233, 0.3)',
              }}
            >
              {/* Cute Cartoon Bot SVG */}
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <rect x="5" y="6" width="14" height="12" rx="4" fill="#1e293b" stroke="#0ea5e9" strokeWidth="1.5" />
                <circle cx="9" cy="11" r="1.5" fill="#10b981" />
                <circle cx="15" cy="11" r="1.5" fill="#10b981" />
                <path d="M 10 14 Q 12 16 14 14" stroke="#f97316" strokeWidth="1.5" strokeLinecap="round" />
                <line x1="12" y1="6" x2="12" y2="3" stroke="#0ea5e9" strokeWidth="1.5" />
                <circle cx="12" cy="2.5" r="1" fill="#f97316" />
              </svg>
            </Box>

            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <Typography variant="caption" sx={{ fontWeight: 800, color: '#0ea5e9', fontSize: '0.78rem' }}>
                  AlgoBuddy 🤖
                </Typography>
                <SparklesIcon size={12} color="#f97316" />
              </Box>
              <Typography variant="caption" sx={{ color: isDark ? '#64748b' : '#94a3b8', fontSize: '0.68rem', display: 'block' }}>
                Tap me for a fun tip!
              </Typography>
            </Box>
          </Box>

          {/* Funny Speech Bubble */}
          <Box
            sx={{
              backgroundColor: isDark ? 'rgba(7, 10, 19, 0.7)' : '#ffffff',
              borderRadius: 1.75,
              p: 1.25,
              border: isDark ? '1px dashed rgba(14, 165, 233, 0.3)' : '1px dashed rgba(2, 132, 199, 0.3)',
            }}
          >
            <Typography
              variant="caption"
              sx={{
                fontSize: '0.73rem',
                lineHeight: 1.45,
                color: isDark ? '#cbd5e1' : '#334155',
                display: 'block',
              }}
            >
              {PLAYFUL_JOKES[jokeIndex]}
            </Typography>
          </Box>
        </Box>
      ) : (
        <Tooltip title="Tap AlgoBuddy for a fun tip!" placement="right">
          <IconButton
            onClick={triggerNextJoke}
            sx={{
              width: 42,
              height: 42,
              mx: 'auto',
              mb: 2,
              backgroundColor: isDark ? 'rgba(14, 165, 233, 0.15)' : 'rgba(2, 132, 199, 0.1)',
              border: '1.5px solid #0ea5e9',
              borderRadius: '50%',
            }}
          >
            <SmileIcon size={20} color="#0ea5e9" />
          </IconButton>
        </Tooltip>
      )}
    </Box>
  );

  return (
    <>
      {/* Mobile Floating Drawer Button */}
      <Box sx={{ display: { xs: 'block', md: 'none' }, mb: 2 }}>
        <Button
          variant="contained"
          size="small"
          onClick={() => setMobileDrawerOpen(true)}
          startIcon={<MenuIcon size={16} />}
          sx={{
            background: 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)',
            color: '#ffffff',
            fontWeight: 700,
            fontSize: '0.82rem',
            px: 2,
            py: 0.7,
            borderRadius: 2,
            boxShadow: '0 4px 14px rgba(14, 165, 233, 0.3)',
          }}
        >
          Select Algorithm ({items.find((i) => i.slug === activeSlug)?.label || title})
        </Button>
      </Box>

      {/* Mobile Drawer */}
      <Drawer
        anchor="left"
        open={mobileDrawerOpen}
        onClose={() => setMobileDrawerOpen(false)}
        PaperProps={{
          sx: {
            backgroundColor: isDark ? '#070a13' : '#ffffff',
            color: isDark ? '#f8fafc' : '#0f172a',
            borderRight: isDark ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid rgba(0, 0, 0, 0.08)',
          },
        }}
      >
        {sidebarContent(true)}
      </Drawer>

      {/* Desktop Persistent Sidebar */}
      <Paper
        elevation={0}
        sx={{
          display: { xs: 'none', md: 'block' },
          backgroundColor: isDark ? 'rgba(13, 19, 34, 0.75)' : 'rgba(255, 255, 255, 0.85)',
          backdropFilter: 'blur(16px)',
          border: isDark ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid rgba(0, 0, 0, 0.08)',
          borderRadius: 3,
          boxShadow: isDark ? '0 10px 30px rgba(0, 0, 0, 0.3)' : '0 10px 30px rgba(0, 0, 0, 0.05)',
          overflow: 'hidden',
          alignSelf: 'flex-start',
          position: 'sticky',
          top: 90,
          zIndex: 10,
        }}
      >
        {sidebarContent(false)}
      </Paper>
    </>
  );
}

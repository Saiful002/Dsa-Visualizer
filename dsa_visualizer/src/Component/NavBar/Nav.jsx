'use client';

import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Chip from '@mui/material/Chip';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  MenuIcon,
  XIcon,
  SearchIcon,
  Volume2Icon,
  VolumeXIcon,
} from '../../components/Common/Icons';
import { soundManager } from '../../utils/audio';
import { ALGORITHMS } from '../../data/algorithmsData';

const NAV_ITEMS = [
  { label: 'Sorting', path: '/sorting', color: '#0ea5e9' },
  { label: 'Searching', path: '/searching', color: '#10b981' },
  { label: 'Structures', path: '/data-structures', color: '#10b981' },
  { label: 'Pathfinding', path: '/pathfinding', color: '#f97316' },
  { label: 'Graph', path: '/graph', color: '#0ea5e9' },
  { label: 'Recursion', path: '/recursion', color: '#f97316' },
  { label: 'DP', path: '/dynamic-programming', color: '#10b981' },
  { label: 'Race Arena', path: '/compare', color: '#f97316' },
  { label: 'Big-O', path: '/complexity', color: '#0ea5e9' },
];

export default function Nav() {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [audioEnabled, setAudioEnabled] = useState(false);

  const toggleAudio = () => {
    soundManager.enabled = !audioEnabled;
    setAudioEnabled(!audioEnabled);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const allAlgos = Object.values(ALGORITHMS);
  const searchResults = searchQuery.trim()
    ? allAlgos.filter(
        (a) =>
          a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          a.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          a.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : allAlgos.slice(0, 6);

  const getPathForAlgo = (algo) => {
    switch (algo.category) {
      case 'Sorting':
        return '/sorting';
      case 'Searching':
        return '/searching';
      case 'Data Structures':
      case 'Trees':
        return '/data-structures';
      case 'Pathfinding':
        return '/pathfinding';
      case 'Backtracking':
        return '/recursion';
      case 'Dynamic Programming':
        return '/dynamic-programming';
      default:
        return '/sorting';
    }
  };

  const handleSelectSearchResult = (algo) => {
    const dest = getPathForAlgo(algo);
    setSearchOpen(false);
    setSearchQuery('');
    router.push(dest);
  };

  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          background: 'rgba(7, 10, 19, 0.85)',
          backdropFilter: 'blur(18px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          zIndex: 1100,
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters sx={{ py: 1, display: 'flex', justifyContent: 'space-between' }}>
            {/* Logo Image */}
            <Link href="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
              <Box
                component="img"
                src="/logo.png"
                alt="DSA Visualizer Logo"
                sx={{
                  height: { xs: 34, md: 40 },
                  width: 'auto',
                  objectFit: 'contain',
                  filter: 'drop-shadow(0 2px 10px rgba(14, 165, 233, 0.25))',
                  transition: 'transform 0.2s ease',
                  '&:hover': {
                    transform: 'scale(1.02)',
                  },
                }}
              />
            </Link>

            {/* Desktop Navigation Links */}
            <Box sx={{ display: { xs: 'none', lg: 'flex' }, alignItems: 'center', gap: 0.5 }}>
              {NAV_ITEMS.map((item) => {
                const isActive = pathname === item.path;
                return (
                  <Link key={item.path} href={item.path} style={{ textDecoration: 'none' }}>
                    <Button
                      sx={{
                        color: isActive ? item.color : '#94a3b8',
                        backgroundColor: isActive ? `${item.color}15` : 'transparent',
                        borderRadius: 2,
                        textTransform: 'none',
                        fontWeight: isActive ? 700 : 500,
                        fontSize: '0.85rem',
                        px: 1.5,
                        py: 0.7,
                        border: `1px solid ${isActive ? `${item.color}40` : 'transparent'}`,
                        transition: 'all 0.2s ease',
                        '&:hover': {
                          color: '#ffffff',
                          backgroundColor: 'rgba(255, 255, 255, 0.06)',
                        },
                      }}
                    >
                      {item.label}
                    </Button>
                  </Link>
                );
              })}
            </Box>

            {/* Action Buttons: Search & Sound & Mobile Toggle */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25 }}>
              <Button
                variant="outlined"
                size="small"
                onClick={() => setSearchOpen(true)}
                startIcon={<SearchIcon size={15} color="#0ea5e9" />}
                sx={{
                  color: '#cbd5e1',
                  borderColor: 'rgba(255, 255, 255, 0.12)',
                  backgroundColor: 'rgba(255, 255, 255, 0.03)',
                  borderRadius: 2,
                  textTransform: 'none',
                  fontSize: '0.8rem',
                  px: 1.5,
                  py: 0.6,
                  '&:hover': {
                    borderColor: '#0ea5e9',
                    backgroundColor: 'rgba(14, 165, 233, 0.08)',
                  },
                }}
              >
                <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}>Quick Search</Box>
                <Box component="span" sx={{ display: { xs: 'inline', sm: 'none' } }}>Search</Box>
              </Button>

              <IconButton
                onClick={toggleAudio}
                size="small"
                title={audioEnabled ? 'Mute Sound' : 'Enable Audio'}
                sx={{
                  color: audioEnabled ? '#10b981' : '#64748b',
                  backgroundColor: audioEnabled ? 'rgba(16, 185, 129, 0.12)' : 'rgba(255, 255, 255, 0.04)',
                  borderRadius: 2,
                  p: 0.9,
                }}
              >
                {audioEnabled ? <Volume2Icon size={17} /> : <VolumeXIcon size={17} />}
              </IconButton>

              {/* Mobile Drawer Trigger */}
              <IconButton
                onClick={handleDrawerToggle}
                sx={{ display: { xs: 'flex', lg: 'none' }, color: '#cbd5e1' }}
              >
                <MenuIcon size={22} />
              </IconButton>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        PaperProps={{
          sx: {
            width: 280,
            backgroundColor: '#070a13',
            color: '#f8fafc',
            borderLeft: '1px solid rgba(255, 255, 255, 0.08)',
            p: 2.5,
          },
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Box component="img" src="/logo.png" alt="Logo" sx={{ height: 32, width: 'auto' }} />
          <IconButton onClick={handleDrawerToggle} sx={{ color: '#94a3b8' }}>
            <XIcon size={20} />
          </IconButton>
        </Box>

        <List>
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.path;
            return (
              <ListItem key={item.path} disablePadding sx={{ mb: 0.75 }}>
                <ListItemButton
                  onClick={() => {
                    handleDrawerToggle();
                    router.push(item.path);
                  }}
                  sx={{
                    borderRadius: 2,
                    backgroundColor: isActive ? `${item.color}20` : 'transparent',
                    color: isActive ? item.color : '#cbd5e1',
                    border: `1px solid ${isActive ? `${item.color}40` : 'transparent'}`,
                  }}
                >
                  <ListItemText primary={item.label} primaryTypographyProps={{ fontWeight: 600 }} />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Drawer>

      {/* Quick Search Dialog */}
      <Dialog
        open={searchOpen}
        onClose={() => setSearchOpen(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            backgroundColor: '#0d1322',
            color: '#f8fafc',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: 3,
            p: 1.5,
          },
        }}
      >
        <DialogContent sx={{ p: 1.5 }}>
          <TextField
            autoFocus
            fullWidth
            placeholder="Search algorithms, data structures, Big-O..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{
              '& .MuiOutlinedInput-root': {
                color: '#ffffff',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                borderRadius: 2,
                '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.2)' },
                '&:hover fieldset': { borderColor: '#0ea5e9' },
                '&.Mui-focused fieldset': { borderColor: '#0ea5e9' },
              },
            }}
          />

          <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 600, px: 1 }}>
              {searchQuery ? 'SEARCH RESULTS' : 'RECOMMENDED TOPICS'}
            </Typography>

            {searchResults.map((algo) => (
              <Box
                key={algo.id}
                onClick={() => handleSelectSearchResult(algo)}
                sx={{
                  p: 1.5,
                  borderRadius: 2,
                  backgroundColor: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.05)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                  '&:hover': {
                    backgroundColor: 'rgba(14, 165, 233, 0.1)',
                    borderColor: '#0ea5e9',
                  },
                }}
              >
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: 700, color: '#f8fafc' }}>
                    {algo.name}
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#94a3b8' }}>
                    {algo.description.slice(0, 65)}...
                  </Typography>
                </Box>
                <Chip
                  label={algo.category}
                  size="small"
                  sx={{ backgroundColor: 'rgba(14, 165, 233, 0.15)', color: '#0ea5e9', fontSize: '0.7rem' }}
                />
              </Box>
            ))}
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
}

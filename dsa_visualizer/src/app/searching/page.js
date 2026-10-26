'use client';

import React from 'react';
import Box from '@mui/material/Box';
import SearchingVisualizer from '../../components/Visualizers/SearchingVisualizer';
import SubtleBackground from '../../components/Common/SubtleBackground';

export default function SearchingPage() {
  return (
    <Box sx={{ position: 'relative', minHeight: 'calc(100vh - 70px)' }}>
      <SubtleBackground topic="searching" />
      <Box sx={{ position: 'relative', zIndex: 1 }}>
        <SearchingVisualizer initialAlgorithm="binary-search" />
      </Box>
    </Box>
  );
}

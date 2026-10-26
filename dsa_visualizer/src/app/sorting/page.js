'use client';

import React from 'react';
import Box from '@mui/material/Box';
import SortingVisualizer from '../../components/Visualizers/SortingVisualizer';
import SubtleBackground from '../../components/Common/SubtleBackground';

export default function SortingPage() {
  return (
    <Box sx={{ position: 'relative', minHeight: 'calc(100vh - 70px)' }}>
      <SubtleBackground topic="sorting" />
      <Box sx={{ position: 'relative', zIndex: 1 }}>
        <SortingVisualizer initialAlgorithm="bubble-sort" />
      </Box>
    </Box>
  );
}

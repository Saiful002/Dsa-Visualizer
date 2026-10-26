'use client';

import React from 'react';
import Box from '@mui/material/Box';
import PathfindingVisualizer from '../../components/Visualizers/PathfindingVisualizer';
import SubtleBackground from '../../components/Common/SubtleBackground';

export default function PathfindingPage() {
  return (
    <Box sx={{ position: 'relative', minHeight: 'calc(100vh - 70px)' }}>
      <SubtleBackground topic="pathfinding" />
      <Box sx={{ position: 'relative', zIndex: 1 }}>
        <PathfindingVisualizer />
      </Box>
    </Box>
  );
}

'use client';

import React from 'react';
import Box from '@mui/material/Box';
import GraphVisualizer from '../../components/Visualizers/GraphVisualizer';
import SubtleBackground from '../../components/Common/SubtleBackground';

export default function GraphPage() {
  return (
    <Box sx={{ position: 'relative', minHeight: 'calc(100vh - 70px)' }}>
      <SubtleBackground topic="graph" />
      <Box sx={{ position: 'relative', zIndex: 1 }}>
        <GraphVisualizer />
      </Box>
    </Box>
  );
}

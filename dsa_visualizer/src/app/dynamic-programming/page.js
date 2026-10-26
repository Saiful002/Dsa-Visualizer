'use client';

import React from 'react';
import Box from '@mui/material/Box';
import DynamicProgrammingVisualizer from '../../components/Visualizers/DynamicProgrammingVisualizer';
import SubtleBackground from '../../components/Common/SubtleBackground';

export default function DynamicProgrammingPage() {
  return (
    <Box sx={{ position: 'relative', minHeight: 'calc(100vh - 70px)' }}>
      <SubtleBackground topic="dp" />
      <Box sx={{ position: 'relative', zIndex: 1 }}>
        <DynamicProgrammingVisualizer />
      </Box>
    </Box>
  );
}

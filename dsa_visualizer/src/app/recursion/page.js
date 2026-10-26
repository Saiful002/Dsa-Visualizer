'use client';

import React from 'react';
import Box from '@mui/material/Box';
import RecursionVisualizer from '../../components/Visualizers/RecursionVisualizer';
import SubtleBackground from '../../components/Common/SubtleBackground';

export default function RecursionPage() {
  return (
    <Box sx={{ position: 'relative', minHeight: 'calc(100vh - 70px)' }}>
      <SubtleBackground topic="recursion" />
      <Box sx={{ position: 'relative', zIndex: 1 }}>
        <RecursionVisualizer />
      </Box>
    </Box>
  );
}

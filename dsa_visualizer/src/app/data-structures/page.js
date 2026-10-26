'use client';

import React from 'react';
import Box from '@mui/material/Box';
import DataStructuresVisualizer from '../../components/Visualizers/DataStructuresVisualizer';
import SubtleBackground from '../../components/Common/SubtleBackground';

export default function DataStructuresPage() {
  return (
    <Box sx={{ position: 'relative', minHeight: 'calc(100vh - 70px)' }}>
      <SubtleBackground topic="structures" />
      <Box sx={{ position: 'relative', zIndex: 1 }}>
        <DataStructuresVisualizer initialType="array" />
      </Box>
    </Box>
  );
}

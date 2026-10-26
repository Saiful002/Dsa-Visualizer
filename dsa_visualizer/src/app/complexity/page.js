'use client';

import React from 'react';
import Box from '@mui/material/Box';
import ComplexityChart from '../../components/Visualizers/ComplexityChart';
import SubtleBackground from '../../components/Common/SubtleBackground';

export default function ComplexityPage() {
  return (
    <Box sx={{ position: 'relative', minHeight: 'calc(100vh - 70px)' }}>
      <SubtleBackground topic="complexity" />
      <Box sx={{ position: 'relative', zIndex: 1 }}>
        <ComplexityChart />
      </Box>
    </Box>
  );
}

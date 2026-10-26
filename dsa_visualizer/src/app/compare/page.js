'use client';

import React from 'react';
import Box from '@mui/material/Box';
import CompareArena from '../../components/Visualizers/CompareArena';
import SubtleBackground from '../../components/Common/SubtleBackground';

export default function ComparePage() {
  return (
    <Box sx={{ position: 'relative', minHeight: 'calc(100vh - 70px)' }}>
      <SubtleBackground topic="compare" />
      <Box sx={{ position: 'relative', zIndex: 1 }}>
        <CompareArena />
      </Box>
    </Box>
  );
}

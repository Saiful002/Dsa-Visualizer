'use client';

import React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Chip from '@mui/material/Chip';
import { BarChart } from '@mui/x-charts/BarChart';

const Body = ({ arr = [], value = 5 }) => {
  const [skipAnimation, setSkipAnimation] = React.useState(false);

  const highlightScope = {
    highlighted: 'series',
    faded: 'global',
  };

  const currentData = Array.isArray(arr) ? arr.slice(0, value) : [];

  const series = [
    {
      label: 'Array Values',
      data: currentData,
      color: '#3b82f6',
    },
  ].map((s) => ({ ...s, highlightScope }));

  return (
    <Box sx={{ width: '100%', px: { xs: 2, md: 4 }, py: 3 }}>
      <Paper
        elevation={0}
        sx={{
          p: { xs: 2, sm: 3 },
          borderRadius: 3,
          backgroundColor: '#ffffff',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
          border: '1px solid #e2e8f0',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 2,
            gap: 1.5,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, color: '#1e293b' }}>
              Visualization Chart
            </Typography>
            <Chip
              label={`${currentData.length} elements`}
              size="small"
              color="primary"
              variant="outlined"
            />
          </Box>

          <FormControlLabel
            checked={skipAnimation}
            control={
              <Checkbox
                onChange={(event) => setSkipAnimation(event.target.checked)}
                sx={{
                  color: '#64748b',
                  '&.Mui-checked': { color: '#3b82f6' },
                }}
              />
            }
            label={
              <Typography variant="body2" sx={{ color: '#475569', fontWeight: 500 }}>
                Skip Animation
              </Typography>
            }
          />
        </Box>

        {currentData.length > 0 ? (
          <Box sx={{ width: '100%', height: 350 }}>
            <BarChart
              height={340}
              series={series}
              skipAnimation={skipAnimation}
              xAxis={[
                {
                  scaleType: 'band',
                  data: currentData.map((_, index) => `idx ${index}`),
                },
              ]}
              margin={{ top: 20, right: 20, bottom: 40, left: 40 }}
            />
          </Box>
        ) : (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: 250,
              color: '#94a3b8',
            }}
          >
            <Typography variant="body1">No array data available. Adjust array length to generate.</Typography>
          </Box>
        )}

        <Box sx={{ mt: 3, pt: 2, borderTop: '1px solid #f1f5f9' }}>
          <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 500, display: 'block', mb: 1 }}>
            Current Values:
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75 }}>
            {currentData.map((val, idx) => (
              <Chip
                key={idx}
                label={`${val}`}
                size="small"
                sx={{
                  backgroundColor: '#f1f5f9',
                  color: '#334155',
                  fontWeight: 600,
                  fontSize: '0.75rem',
                }}
              />
            ))}
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default Body;

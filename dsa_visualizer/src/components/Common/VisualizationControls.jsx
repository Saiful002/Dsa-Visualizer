'use client';

import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import {
  PlayIcon,
  PauseIcon,
  StepBackIcon,
  StepForwardIcon,
  RotateCcwIcon,
  ShuffleIcon,
  Volume2Icon,
  VolumeXIcon,
} from './Icons';
import { soundManager } from '../../utils/audio';

export default function VisualizationControls({
  isPlaying,
  onPlayPause,
  onStepBack,
  onStepForward,
  onRestart,
  onRandomize,
  canStepBack = true,
  canStepForward = true,
  speed = 1,
  onSpeedChange,
  size = 15,
  onSizeChange,
  showSizeSlider = true,
  onCustomInput,
  sizeLabel = 'Size',
  minSize = 5,
  maxSize = 40,
}) {
  const [audioEnabled, setAudioEnabled] = React.useState(false);
  const [customOpen, setCustomOpen] = React.useState(false);
  const [customValue, setCustomValue] = React.useState('');

  const toggleAudio = () => {
    soundManager.enabled = !audioEnabled;
    setAudioEnabled(!audioEnabled);
  };

  const handleApplyCustom = () => {
    if (onCustomInput && customValue.trim()) {
      onCustomInput(customValue);
    }
    setCustomOpen(false);
  };

  const speedOptions = [0.25, 0.5, 1, 1.5, 2];

  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 2,
        p: 2,
        borderRadius: 2.5,
        backgroundColor: 'rgba(15, 23, 42, 0.8)',
        backdropFilter: 'blur(12px)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
      }}
    >
      {/* Primary Playback Buttons */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Tooltip title={isPlaying ? 'Pause' : 'Play'}>
          <Button
            variant="contained"
            onClick={onPlayPause}
            sx={{
              minWidth: 44,
              height: 44,
              borderRadius: 2,
              background: isPlaying
                ? 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)'
                : 'linear-gradient(135deg, #38bdf8 0%, #2563eb 100%)',
              color: '#ffffff',
              boxShadow: isPlaying
                ? '0 0 15px rgba(245, 158, 11, 0.4)'
                : '0 0 15px rgba(56, 189, 248, 0.4)',
              '&:hover': {
                filter: 'brightness(1.1)',
              },
            }}
          >
            {isPlaying ? <PauseIcon size={20} /> : <PlayIcon size={20} />}
          </Button>
        </Tooltip>

        <Tooltip title="Previous Step">
          <span>
            <IconButton
              onClick={onStepBack}
              disabled={!canStepBack || isPlaying}
              sx={{
                color: '#cbd5e1',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                borderRadius: 2,
                p: 1.25,
                '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' },
                '&.Mui-disabled': { color: '#475569' },
              }}
            >
              <StepBackIcon size={18} />
            </IconButton>
          </span>
        </Tooltip>

        <Tooltip title="Next Step">
          <span>
            <IconButton
              onClick={onStepForward}
              disabled={!canStepForward || isPlaying}
              sx={{
                color: '#cbd5e1',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                borderRadius: 2,
                p: 1.25,
                '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' },
                '&.Mui-disabled': { color: '#475569' },
              }}
            >
              <StepForwardIcon size={18} />
            </IconButton>
          </span>
        </Tooltip>

        <Tooltip title="Restart Visualizer">
          <IconButton
            onClick={onRestart}
            sx={{
              color: '#cbd5e1',
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              borderRadius: 2,
              p: 1.25,
              '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' },
            }}
          >
            <RotateCcwIcon size={18} />
          </IconButton>
        </Tooltip>

        {onRandomize && (
          <Tooltip title="Randomize Data">
            <Button
              variant="outlined"
              size="small"
              onClick={onRandomize}
              startIcon={<ShuffleIcon size={16} />}
              sx={{
                color: '#38bdf8',
                borderColor: 'rgba(56, 189, 248, 0.3)',
                borderRadius: 2,
                textTransform: 'none',
                fontWeight: 600,
                px: 1.5,
                py: 1,
                '&:hover': {
                  borderColor: '#38bdf8',
                  backgroundColor: 'rgba(56, 189, 248, 0.1)',
                },
              }}
            >
              Randomize
            </Button>
          </Tooltip>
        )}

        {onCustomInput && (
          <Button
            variant="text"
            size="small"
            onClick={() => setCustomOpen(true)}
            sx={{
              color: '#94a3b8',
              borderRadius: 2,
              textTransform: 'none',
              fontWeight: 500,
              fontSize: '0.85rem',
              '&:hover': { color: '#ffffff' },
            }}
          >
            Custom Input
          </Button>
        )}
      </Box>

      {/* Speed & Audio & Sliders */}
      <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 2.5 }}>
        {/* Speed Selector */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 600 }}>
            SPEED:
          </Typography>
          <Box sx={{ display: 'flex', backgroundColor: 'rgba(255, 255, 255, 0.05)', borderRadius: 2, p: 0.5 }}>
            {speedOptions.map((s) => (
              <Button
                key={s}
                size="small"
                onClick={() => onSpeedChange && onSpeedChange(s)}
                sx={{
                  minWidth: 36,
                  px: 0.8,
                  py: 0.25,
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  color: speed === s ? '#ffffff' : '#94a3b8',
                  backgroundColor: speed === s ? '#2563eb' : 'transparent',
                  borderRadius: 1.5,
                  textTransform: 'none',
                  '&:hover': { backgroundColor: speed === s ? '#1d4ed8' : 'rgba(255,255,255,0.05)' },
                }}
              >
                {s}x
              </Button>
            ))}
          </Box>
        </Box>

        {/* Size Slider */}
        {showSizeSlider && onSizeChange && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, minWidth: 150 }}>
            <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 600, whiteSpace: 'nowrap' }}>
              {sizeLabel}: {size}
            </Typography>
            <Slider
              value={size}
              min={minSize}
              max={maxSize}
              onChange={(e, val) => onSizeChange(val)}
              disabled={isPlaying}
              sx={{
                color: '#38bdf8',
                '& .MuiSlider-thumb': {
                  width: 14,
                  height: 14,
                  backgroundColor: '#ffffff',
                },
                '& .MuiSlider-rail': {
                  opacity: 0.2,
                },
              }}
            />
          </Box>
        )}

        {/* Sound Toggle */}
        <Tooltip title={audioEnabled ? 'Mute Sound' : 'Enable Audio Feedback'}>
          <IconButton
            onClick={toggleAudio}
            size="small"
            sx={{
              color: audioEnabled ? '#38bdf8' : '#64748b',
              backgroundColor: audioEnabled ? 'rgba(56, 189, 248, 0.1)' : 'rgba(255, 255, 255, 0.05)',
              borderRadius: 2,
              p: 1,
            }}
          >
            {audioEnabled ? <Volume2Icon size={18} /> : <VolumeXIcon size={18} />}
          </IconButton>
        </Tooltip>
      </Box>

      {/* Custom Input Dialog */}
      <Dialog
        open={customOpen}
        onClose={() => setCustomOpen(false)}
        PaperProps={{
          sx: {
            backgroundColor: '#0f172a',
            color: '#f8fafc',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: 3,
            p: 1,
          },
        }}
      >
        <DialogTitle sx={{ fontWeight: 700 }}>Custom Input Values</DialogTitle>
        <DialogContent>
          <Typography variant="body2" sx={{ color: '#94a3b8', mb: 2 }}>
            Enter comma-separated numbers (e.g. <code>25, 10, 85, 4, 32, 60</code>):
          </Typography>
          <TextField
            autoFocus
            fullWidth
            variant="outlined"
            placeholder="25, 10, 85, 4, 32, 60"
            value={customValue}
            onChange={(e) => setCustomValue(e.target.value)}
            sx={{
              '& .MuiOutlinedInput-root': {
                color: '#ffffff',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.2)' },
                '&:hover fieldset': { borderColor: '#38bdf8' },
                '&.Mui-focused fieldset': { borderColor: '#38bdf8' },
              },
            }}
          />
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={() => setCustomOpen(false)} sx={{ color: '#94a3b8' }}>
            Cancel
          </Button>
          <Button onClick={handleApplyCustom} variant="contained" sx={{ backgroundColor: '#2563eb' }}>
            Apply Input
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

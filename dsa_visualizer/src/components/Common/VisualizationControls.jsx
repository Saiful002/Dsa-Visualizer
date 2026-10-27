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
import { useColorMode } from '../../app/ThemeRegistry';

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
  const { isDark } = useColorMode();
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
        backgroundColor: isDark ? 'rgba(13, 19, 34, 0.85)' : 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(12px)',
        border: isDark ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid rgba(15, 23, 42, 0.08)',
        boxShadow: isDark ? '0 8px 32px rgba(0, 0, 0, 0.3)' : '0 8px 24px rgba(15, 23, 42, 0.06)',
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
                color: isDark ? '#cbd5e1' : '#334155',
                backgroundColor: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(15, 23, 42, 0.05)',
                borderRadius: 2,
                p: 1.25,
                '&:hover': { backgroundColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(15, 23, 42, 0.1)' },
                '&.Mui-disabled': { color: isDark ? '#475569' : '#94a3b8' },
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
                color: isDark ? '#cbd5e1' : '#334155',
                backgroundColor: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(15, 23, 42, 0.05)',
                borderRadius: 2,
                p: 1.25,
                '&:hover': { backgroundColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(15, 23, 42, 0.1)' },
                '&.Mui-disabled': { color: isDark ? '#475569' : '#94a3b8' },
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
              color: isDark ? '#cbd5e1' : '#334155',
              backgroundColor: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(15, 23, 42, 0.05)',
              borderRadius: 2,
              p: 1.25,
              '&:hover': { backgroundColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(15, 23, 42, 0.1)' },
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
                color: isDark ? '#38bdf8' : '#0284c7',
                borderColor: isDark ? 'rgba(56, 189, 248, 0.3)' : 'rgba(2, 132, 199, 0.35)',
                borderRadius: 2,
                textTransform: 'none',
                fontWeight: 600,
                px: 1.5,
                py: 1,
                '&:hover': {
                  borderColor: isDark ? '#38bdf8' : '#0284c7',
                  backgroundColor: isDark ? 'rgba(56, 189, 248, 0.1)' : 'rgba(2, 132, 199, 0.08)',
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
              color: isDark ? '#94a3b8' : '#64748b',
              borderRadius: 2,
              textTransform: 'none',
              fontWeight: 600,
              fontSize: '0.85rem',
              '&:hover': { color: isDark ? '#ffffff' : '#0f172a' },
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
          <Typography variant="caption" sx={{ color: isDark ? '#64748b' : '#64748b', fontWeight: 600 }}>
            SPEED:
          </Typography>
          <Box sx={{ display: 'flex', backgroundColor: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(15, 23, 42, 0.05)', borderRadius: 2, p: 0.5 }}>
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
                  color: speed === s ? '#ffffff' : (isDark ? '#94a3b8' : '#475569'),
                  backgroundColor: speed === s ? '#0284c7' : 'transparent',
                  borderRadius: 1.5,
                  textTransform: 'none',
                  '&:hover': { backgroundColor: speed === s ? '#0369a1' : (isDark ? 'rgba(255,255,255,0.05)' : 'rgba(15,23,42,0.05)') },
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
            <Typography variant="caption" sx={{ color: isDark ? '#64748b' : '#475569', fontWeight: 600, whiteSpace: 'nowrap' }}>
              {sizeLabel}: {size}
            </Typography>
            <Slider
              value={size}
              min={minSize}
              max={maxSize}
              onChange={(e, val) => onSizeChange(val)}
              disabled={isPlaying}
              sx={{
                color: isDark ? '#38bdf8' : '#0284c7',
                '& .MuiSlider-thumb': {
                  width: 14,
                  height: 14,
                  backgroundColor: isDark ? '#ffffff' : '#0284c7',
                },
                '& .MuiSlider-rail': {
                  opacity: 0.25,
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
              color: audioEnabled ? (isDark ? '#38bdf8' : '#0284c7') : (isDark ? '#64748b' : '#94a3b8'),
              backgroundColor: audioEnabled
                ? (isDark ? 'rgba(56, 189, 248, 0.1)' : 'rgba(2, 132, 199, 0.1)')
                : (isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(15, 23, 42, 0.05)'),
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
            backgroundColor: isDark ? '#0d1322' : '#ffffff',
            color: isDark ? '#f8fafc' : '#0f172a',
            border: isDark ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(15, 23, 42, 0.1)',
            borderRadius: 3,
            p: 1,
            boxShadow: isDark ? '0 20px 40px rgba(0,0,0,0.5)' : '0 20px 40px rgba(15,23,42,0.12)',
          },
        }}
      >
        <DialogTitle sx={{ fontWeight: 700, color: isDark ? '#f8fafc' : '#0f172a' }}>Custom Input Values</DialogTitle>
        <DialogContent>
          <Typography variant="body2" sx={{ color: isDark ? '#94a3b8' : '#64748b', mb: 2 }}>
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
                color: isDark ? '#ffffff' : '#0f172a',
                backgroundColor: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(15, 23, 42, 0.03)',
                '& fieldset': { borderColor: isDark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(15, 23, 42, 0.2)' },
                '&:hover fieldset': { borderColor: '#0284c7' },
                '&.Mui-focused fieldset': { borderColor: '#0284c7' },
              },
            }}
          />
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={() => setCustomOpen(false)} sx={{ color: isDark ? '#94a3b8' : '#64748b' }}>
            Cancel
          </Button>
          <Button onClick={handleApplyCustom} variant="contained" sx={{ backgroundColor: '#0284c7', color: '#fff' }}>
            Apply Input
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

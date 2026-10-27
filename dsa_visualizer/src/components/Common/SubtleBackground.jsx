'use client';

import React from 'react';
import Box from '@mui/material/Box';
import { useColorMode } from '../../app/ThemeRegistry';

/**
 * SubtleBackground
 * 
 * Clean, subtle, full-viewport animated background.
 * Features:
 *  - Low-opacity continuous cyber circuit traces with gentle electrical pulse animations
 *  - Soft ambient dot matrix
 *  - Floating micro tech tokens (binary bits, memory hex, algorithmic notation)
 *  - High visual elegance with zero clunky slabs or distracting cutoff shapes
 *  - Low opacity in both Light (0.18) and Dark (0.22) modes for maximum readability
 */
export default function SubtleBackground({ topic = 'sorting' }) {
  const { mode } = useColorMode();
  const isDark = mode === 'dark';

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: -1,
        overflow: 'hidden',
        transition: 'background 0.3s ease',
        background: isDark
          ? `
            radial-gradient(circle at 15% 18%, rgba(14, 165, 233, 0.05) 0%, transparent 40%),
            radial-gradient(circle at 85% 80%, rgba(16, 185, 129, 0.05) 0%, transparent 40%),
            radial-gradient(circle at 50% 50%, rgba(249, 115, 22, 0.03) 0%, transparent 50%)
          `
          : `
            radial-gradient(circle at 15% 18%, rgba(2, 132, 199, 0.03) 0%, transparent 40%),
            radial-gradient(circle at 85% 80%, rgba(5, 150, 105, 0.03) 0%, transparent 40%),
            radial-gradient(circle at 50% 50%, rgba(234, 88, 12, 0.02) 0%, transparent 50%)
          `,
      }}
    >
      <style>{`
        @keyframes circuitPulseFlow {
          0% { stroke-dashoffset: 1000; }
          100% { stroke-dashoffset: 0; }
        }
        @keyframes circuitPulseFlowRev {
          0% { stroke-dashoffset: 0; }
          100% { stroke-dashoffset: 1000; }
        }
        @keyframes binaryDrift {
          0% { transform: translateY(0px); opacity: 0.2; }
          50% { transform: translateY(-20px); opacity: 0.6; }
          100% { transform: translateY(0px); opacity: 0.2; }
        }
        @keyframes pulseLuminous {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.1); }
        }
      `}</style>

      {/* FULL-VIEWPORT SUBTLE SVG CANVAS */}
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 1920 1080"
        preserveAspectRatio="xMidYMid slice"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          opacity: isDark ? 0.22 : 0.18,
          transition: 'opacity 0.3s ease',
        }}
      >
        <defs>
          {/* Ambient Dot Grid Pattern */}
          <pattern id="subtleAmbientDotGrid" width="48" height="48" patternUnits="userSpaceOnUse">
            <circle cx="24" cy="24" r="1.5" fill={isDark ? "#38bdf8" : "#64748b"} opacity={isDark ? "0.35" : "0.3"} />
          </pattern>
        </defs>

        {/* 1. Subtle Ambient Dot Grid */}
        <rect width="1920" height="1080" fill="url(#subtleAmbientDotGrid)" />

        {/* 2. CONTINUOUS ANIMATED TECH CIRCUIT BOARD PATTERN */}
        <g>
          {/* Static Circuit Tracks */}
          <path
            d="
              M 0 160 L 320 160 L 390 230 L 720 230 L 780 170 L 1140 170 L 1200 230 L 1600 230 L 1680 150 L 1920 150
              M 0 540 L 220 540 L 290 610 L 580 610 L 640 550 L 960 550 L 1020 610 L 1400 610 L 1460 550 L 1920 550
              M 0 880 L 380 880 L 450 810 L 760 810 L 820 870 L 1260 870 L 1320 810 L 1700 810 L 1760 870 L 1920 870
              M 160 0 L 160 300 L 220 360 L 220 740 L 160 800 L 160 1080
              M 1760 0 L 1760 320 L 1700 380 L 1700 700 L 1760 760 L 1760 1080
            "
            fill="none"
            stroke={isDark ? "#38bdf8" : "#0284c7"}
            strokeWidth="1.2"
            opacity={isDark ? 0.35 : 0.4}
          />

          {/* Animated Electrical Current Pulses */}
          <path
            d="
              M 0 160 L 320 160 L 390 230 L 720 230 L 780 170 L 1140 170 L 1200 230 L 1600 230 L 1680 150 L 1920 150
              M 160 0 L 160 300 L 220 360 L 220 740 L 160 800 L 160 1080
            "
            fill="none"
            stroke={isDark ? "#38bdf8" : "#0284c7"}
            strokeWidth="2.5"
            strokeDasharray="50 260"
            strokeLinecap="round"
            style={{ animation: 'circuitPulseFlow 8s linear infinite' }}
          />

          <path
            d="
              M 0 540 L 220 540 L 290 610 L 580 610 L 640 550 L 960 550 L 1020 610 L 1400 610 L 1460 550 L 1920 550
              M 1760 0 L 1760 320 L 1700 380 L 1700 700 L 1760 760 L 1760 1080
            "
            fill="none"
            stroke={isDark ? "#34d399" : "#059669"}
            strokeWidth="2.5"
            strokeDasharray="60 300"
            strokeLinecap="round"
            style={{ animation: 'circuitPulseFlowRev 9s linear infinite' }}
          />

          <path
            d="
              M 0 880 L 380 880 L 450 810 L 760 810 L 820 870 L 1260 870 L 1320 810 L 1700 810 L 1760 870 L 1920 870
            "
            fill="none"
            stroke={isDark ? "#fb923c" : "#ea580c"}
            strokeWidth="2.2"
            strokeDasharray="40 240"
            strokeLinecap="round"
            style={{ animation: 'circuitPulseFlow 10s linear infinite' }}
          />

          {/* Micro Solder Junction Pads */}
          <circle cx="390" cy="230" r="3.5" fill={isDark ? "#38bdf8" : "#0284c7"} style={{ animation: 'pulseLuminous 3s infinite' }} />
          <circle cx="1200" cy="230" r="3.5" fill={isDark ? "#34d399" : "#059669"} style={{ animation: 'pulseLuminous 3s infinite 1s' }} />
          <circle cx="290" cy="610" r="3.5" fill={isDark ? "#fb923c" : "#ea580c"} style={{ animation: 'pulseLuminous 3s infinite 1.5s' }} />
          <circle cx="1400" cy="610" r="3.5" fill={isDark ? "#38bdf8" : "#0284c7"} style={{ animation: 'pulseLuminous 3s infinite 2s' }} />
          <circle cx="450" cy="810" r="3.5" fill={isDark ? "#34d399" : "#059669"} style={{ animation: 'pulseLuminous 3s infinite 0.5s' }} />
          <circle cx="1320" cy="810" r="3.5" fill={isDark ? "#fb923c" : "#ea580c"} style={{ animation: 'pulseLuminous 3s infinite 2.5s' }} />
        </g>

        {/* 3. CONTINUOUS FLOATING TECH PARTICLES (Subtle, delicate) */}
        <g opacity={isDark ? 0.6 : 0.5}>
          <g transform="translate(80, 260)" style={{ animation: 'binaryDrift 7s ease-in-out infinite' }}>
            <text x="0" y="0" fill={isDark ? "#38bdf8" : "#0284c7"} fontSize="13" fontFamily="monospace" fontWeight="600">01001101</text>
          </g>
          <g transform="translate(180, 700)" style={{ animation: 'binaryDrift 8s ease-in-out infinite 1s' }}>
            <text x="0" y="0" fill={isDark ? "#34d399" : "#059669"} fontSize="12" fontFamily="monospace" fontWeight="600">0x7FFE_A0</text>
          </g>
          <g transform="translate(1750, 280)" style={{ animation: 'binaryDrift 9s ease-in-out infinite 0.5s' }}>
            <text x="0" y="0" fill={isDark ? "#fb923c" : "#ea580c"} fontSize="13" fontFamily="monospace" fontWeight="600">11010010</text>
          </g>
          <g transform="translate(1720, 740)" style={{ animation: 'binaryDrift 7.5s ease-in-out infinite 2s' }}>
            <text x="0" y="0" fill={isDark ? "#38bdf8" : "#0284c7"} fontSize="12" fontFamily="monospace" fontWeight="600">&amp;node-&gt;next</text>
          </g>
          <g transform="translate(920, 100)" style={{ animation: 'binaryDrift 10s ease-in-out infinite 1.5s' }}>
            <text x="0" y="0" fill={isDark ? "#64748b" : "#94a3b8"} fontSize="14" fontFamily="monospace" fontWeight="600">&#123; DSA_ENGINE &#125;</text>
          </g>
        </g>
      </svg>
    </Box>
  );
}

'use client';

import React from 'react';
import Box from '@mui/material/Box';

/**
 * SubtleBackground
 * 
 * Provides an atmospheric, ultra-lightweight, thematic animated background
 * tailored to each DSA topic (Sorting, Searching, Structures, Pathfinding, Graph, Recursion, DP, Compare, Complexity).
 * Uses pure SVG + CSS animations for optimal 60fps performance and zero external dependencies.
 * Brand triad: Cyan (#0ea5e9), Emerald (#10b981), Orange (#f97316).
 */
export default function SubtleBackground({ topic = 'sorting' }) {
  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        pointerEvents: 'none',
        zIndex: 0,
        overflow: 'hidden',
        background: `
          radial-gradient(circle at 10% 15%, rgba(14, 165, 233, 0.035) 0%, transparent 45%),
          radial-gradient(circle at 90% 85%, rgba(16, 185, 129, 0.035) 0%, transparent 45%),
          radial-gradient(circle at 50% 50%, rgba(249, 115, 22, 0.025) 0%, transparent 50%)
        `,
      }}
    >
      <style>{`
        @keyframes subtleFloat {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-12px) rotate(2deg); }
        }
        @keyframes subtlePulse {
          0%, 100% { opacity: 0.25; transform: scale(1); }
          50% { opacity: 0.55; transform: scale(1.05); }
        }
        @keyframes scanBeam {
          0% { transform: translateX(-40px); }
          50% { transform: translateX(180px); }
          100% { transform: translateX(-40px); }
        }
        @keyframes radarSweep {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes packetTravel {
          0% { stroke-dashoffset: 200; }
          100% { stroke-dashoffset: 0; }
        }
        @keyframes barDance1 {
          0%, 100% { height: 40px; }
          50% { height: 95px; }
        }
        @keyframes barDance2 {
          0%, 100% { height: 110px; }
          50% { height: 50px; }
        }
        @keyframes barDance3 {
          0%, 100% { height: 75px; }
          50% { height: 130px; }
        }
        @keyframes hanoiRing1 {
          0%, 100% { transform: translate(60px, 120px); }
          30% { transform: translate(60px, 40px); }
          50% { transform: translate(140px, 40px); }
          70% { transform: translate(140px, 140px); }
        }
        @keyframes treeSway {
          0%, 100% { transform: rotate(-1.5deg); }
          50% { transform: rotate(1.5deg); }
        }
        @keyframes gridTravel {
          0% { transform: translate(20px, 20px); }
          25% { transform: translate(140px, 20px); }
          50% { transform: translate(140px, 100px); }
          75% { transform: translate(220px, 100px); }
          100% { transform: translate(220px, 180px); }
        }
        @keyframes blinkEye {
          0%, 90%, 100% { transform: scaleY(1); }
          95% { transform: scaleY(0.1); }
        }
        @keyframes curveFlow {
          0% { stroke-dashoffset: 400; }
          100% { stroke-dashoffset: 0; }
        }
      `}</style>

      {/* TOPIC 1: SORTING */}
      {topic === 'sorting' && (
        <svg
          width="100%"
          height="100%"
          style={{ position: 'absolute', top: 0, left: 0, opacity: 0.35 }}
        >
          <defs>
            <linearGradient id="sortGrad1" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0.05" />
            </linearGradient>
            <linearGradient id="sortGrad2" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0.05" />
            </linearGradient>
            <linearGradient id="sortGrad3" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f97316" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#f97316" stopOpacity="0.05" />
            </linearGradient>
          </defs>

          {/* Floating Subtle Bar Chart Formation on Left */}
          <g transform="translate(40, 220)" style={{ animation: 'subtleFloat 8s ease-in-out infinite' }}>
            <rect x="0" y="60" width="16" height="80" rx="3" fill="url(#sortGrad1)" style={{ animation: 'barDance1 5s ease-in-out infinite' }} />
            <rect x="24" y="20" width="16" height="120" rx="3" fill="url(#sortGrad2)" style={{ animation: 'barDance2 6s ease-in-out infinite' }} />
            <rect x="48" y="70" width="16" height="70" rx="3" fill="url(#sortGrad3)" style={{ animation: 'barDance3 4.5s ease-in-out infinite' }} />
            <rect x="72" y="40" width="16" height="100" rx="3" fill="url(#sortGrad1)" style={{ animation: 'barDance2 5.5s ease-in-out infinite' }} />
            <rect x="96" y="90" width="16" height="50" rx="3" fill="url(#sortGrad2)" style={{ animation: 'barDance1 6.5s ease-in-out infinite' }} />
            <line x1="-10" y1="145" x2="125" y2="145" stroke="#334155" strokeWidth="1.5" strokeDasharray="3 3" />
            <text x="5" y="165" fill="#64748b" fontSize="10" fontFamily="monospace" letterSpacing="1">arr[i] ↔ arr[j]</text>
          </g>

          {/* Themed Character Animation: "SortBot" (top right ambient mascot) */}
          <g transform="translate(1180, 70)" style={{ animation: 'subtleFloat 6s ease-in-out infinite' }}>
            {/* Robot Head */}
            <rect x="30" y="25" width="60" height="48" rx="12" fill="#0f172a" stroke="#0ea5e9" strokeWidth="1.5" />
            {/* Visor Screen */}
            <rect x="38" y="34" width="44" height="20" rx="6" fill="#070a13" stroke="#10b981" strokeWidth="1" />
            {/* Blinking Visor Eyes */}
            <circle cx="50" cy="44" r="3.5" fill="#0ea5e9" style={{ animation: 'blinkEye 4s infinite' }} />
            <circle cx="70" cy="44" r="3.5" fill="#10b981" style={{ animation: 'blinkEye 4s infinite' }} />
            {/* Antenna with glowing beacon */}
            <line x1="60" y1="25" x2="60" y2="12" stroke="#0ea5e9" strokeWidth="1.5" />
            <circle cx="60" cy="10" r="4" fill="#f97316" style={{ animation: 'subtlePulse 2s infinite' }} />
            {/* Mini comparison paddles */}
            <path d="M 22 55 L 8 45" stroke="#0ea5e9" strokeWidth="2" strokeLinecap="round" />
            <circle cx="8" cy="45" r="4" fill="#0ea5e9" />
            <path d="M 98 55 L 112 45" stroke="#10b981" strokeWidth="2" strokeLinecap="round" />
            <circle cx="112" cy="45" r="4" fill="#10b981" />
            <text x="22" y="90" fill="#64748b" fontSize="9" fontFamily="monospace">SORT-BOT v2</text>
          </g>

          {/* Ambient Algorithm Glyphs */}
          <text x="85%" y="65%" fill="#334155" fontSize="16" fontFamily="monospace" opacity="0.4">O(n log n)</text>
          <text x="12%" y="80%" fill="#334155" fontSize="14" fontFamily="monospace" opacity="0.3">pivot = partition(low, high)</text>
          <text x="75%" y="30%" fill="#334155" fontSize="14" fontFamily="monospace" opacity="0.25">swaps++</text>
        </svg>
      )}

      {/* TOPIC 2: SEARCHING */}
      {topic === 'searching' && (
        <svg
          width="100%"
          height="100%"
          style={{ position: 'absolute', top: 0, left: 0, opacity: 0.35 }}
        >
          <defs>
            <radialGradient id="radarGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Scanning Array Grid on Left */}
          <g transform="translate(60, 240)" style={{ animation: 'subtleFloat 7s ease-in-out infinite' }}>
            {[0, 1, 2, 3, 4, 5, 6].map((i) => (
              <g key={i} transform={`translate(${i * 42}, 0)`}>
                <rect x="0" y="0" width="36" height="36" rx="6" fill="#0f172a" stroke="#334155" strokeWidth="1" />
                <text x="18" y="23" fill="#64748b" fontSize="12" textAnchor="middle" fontFamily="monospace">
                  {[12, 28, 35, 49, 64, 78, 91][i]}
                </text>
                <text x="18" y="48" fill="#475569" fontSize="9" textAnchor="middle" fontFamily="monospace">
                  [{i}]
                </text>
              </g>
            ))}
            {/* Sliding Scan Beam Indicator */}
            <rect
              x="0"
              y="-4"
              width="40"
              height="44"
              rx="8"
              fill="none"
              stroke="#10b981"
              strokeWidth="2"
              strokeDasharray="4 2"
              style={{ animation: 'scanBeam 6s ease-in-out infinite' }}
            />
            <text x="0" y="70" fill="#10b981" fontSize="10" fontFamily="monospace" opacity="0.8">
              mid = ⌊(low + high) / 2⌋
            </text>
          </g>

          {/* Themed Character Animation: "Search Scout" Mascot (top right) */}
          <g transform="translate(1160, 80)" style={{ animation: 'subtleFloat 6s ease-in-out infinite' }}>
            {/* Detective/Radar Scout Bot */}
            <circle cx="60" cy="50" r="30" fill="#0f172a" stroke="#10b981" strokeWidth="1.5" />
            <circle cx="60" cy="50" r="20" fill="url(#radarGlow)" />
            {/* Rotating Radar Scanner line */}
            <g style={{ transformOrigin: '60px 50px', animation: 'radarSweep 4s linear infinite' }}>
              <line x1="60" y1="50" x2="88" y2="50" stroke="#10b981" strokeWidth="1.8" />
            </g>
            {/* Big cute magnifying lens */}
            <circle cx="95" cy="55" r="16" fill="none" stroke="#0ea5e9" strokeWidth="2.5" />
            <line x1="106" y1="67" x2="120" y2="81" stroke="#0ea5e9" strokeWidth="3" strokeLinecap="round" />
            <circle cx="95" cy="55" r="5" fill="#f97316" style={{ animation: 'subtlePulse 2s infinite' }} />
            <text x="32" y="98" fill="#64748b" fontSize="9" fontFamily="monospace">SCOUT-BOT v2</text>
          </g>

          <text x="82%" y="60%" fill="#334155" fontSize="16" fontFamily="monospace" opacity="0.35">O(log n) Binary</text>
          <text x="14%" y="82%" fill="#334155" fontSize="14" fontFamily="monospace" opacity="0.3">key == arr[mid] ? return mid</text>
        </svg>
      )}

      {/* TOPIC 3: DATA STRUCTURES */}
      {topic === 'structures' && (
        <svg
          width="100%"
          height="100%"
          style={{ position: 'absolute', top: 0, left: 0, opacity: 0.35 }}
        >
          {/* Linked List Nodes Animation on Bottom-Left */}
          <g transform="translate(50, 260)" style={{ animation: 'subtleFloat 8s ease-in-out infinite' }}>
            {[0, 1, 2, 3].map((i) => (
              <g key={i} transform={`translate(${i * 85}, 0)`}>
                {/* Node Box */}
                <rect x="0" y="0" width="54" height="34" rx="6" fill="#0f172a" stroke="#0ea5e9" strokeWidth="1" />
                <line x1="36" y1="0" x2="36" y2="34" stroke="#334155" strokeWidth="1" />
                <circle cx="45" cy="17" r="3" fill="#10b981" />
                <text x="18" y="21" fill="#e2e8f0" fontSize="11" textAnchor="middle" fontFamily="monospace">
                  {['HEAD', '42', '89', 'NULL'][i]}
                </text>
                {/* Pointer Arrow */}
                {i < 3 && (
                  <g transform="translate(54, 17)">
                    <line x1="0" y1="0" x2="26" y2="0" stroke="#10b981" strokeWidth="1.5" strokeDasharray="3 2" />
                    <polygon points="26,-3 31,0 26,3" fill="#10b981" />
                  </g>
                )}
              </g>
            ))}
            <text x="0" y="55" fill="#64748b" fontSize="10" fontFamily="monospace">
              node-&gt;next = next_node
            </text>
          </g>

          {/* Animated Stack Column on Right */}
          <g transform="translate(1180, 240)" style={{ animation: 'subtleFloat 7s ease-in-out infinite' }}>
            <rect x="0" y="0" width="80" height="26" rx="4" fill="#0f172a" stroke="#f97316" strokeWidth="1.5" />
            <text x="40" y="17" fill="#f97316" fontSize="10" textAnchor="middle" fontFamily="monospace">TOP: 99</text>
            <rect x="0" y="32" width="80" height="26" rx="4" fill="#0f172a" stroke="#334155" strokeWidth="1" />
            <text x="40" y="49" fill="#64748b" fontSize="10" textAnchor="middle" fontFamily="monospace">VAL: 45</text>
            <rect x="0" y="64" width="80" height="26" rx="4" fill="#0f172a" stroke="#334155" strokeWidth="1" />
            <text x="40" y="81" fill="#64748b" fontSize="10" textAnchor="middle" fontFamily="monospace">BOTTOM: 10</text>
            <path d="M -15 13 L -5 13" stroke="#f97316" strokeWidth="2" markerEnd="url(#arrow)" />
            <text x="-50" y="16" fill="#f97316" fontSize="9" fontFamily="monospace">PUSH</text>
          </g>

          {/* Themed Character Animation: "NodeBot" (top right) */}
          <g transform="translate(1140, 70)" style={{ animation: 'subtleFloat 6s ease-in-out infinite' }}>
            <circle cx="50" cy="40" r="24" fill="#0f172a" stroke="#0ea5e9" strokeWidth="1.5" />
            <circle cx="42" cy="36" r="3" fill="#0ea5e9" style={{ animation: 'blinkEye 4s infinite' }} />
            <circle cx="58" cy="36" r="3" fill="#10b981" style={{ animation: 'blinkEye 4s infinite' }} />
            <path d="M 44 48 Q 50 52 56 48" stroke="#f97316" strokeWidth="1.5" fill="none" />
            {/* Pointer arms */}
            <line x1="26" y1="40" x2="10" y2="30" stroke="#0ea5e9" strokeWidth="1.5" />
            <circle cx="8" cy="28" r="4" fill="#0ea5e9" />
            <line x1="74" y1="40" x2="90" y2="30" stroke="#10b981" strokeWidth="1.5" />
            <circle cx="92" cy="28" r="4" fill="#10b981" />
            <text x="18" y="76" fill="#64748b" fontSize="9" fontFamily="monospace">NODE-BOT</text>
          </g>

          <text x="80%" y="78%" fill="#334155" fontSize="14" fontFamily="monospace" opacity="0.3">BinarySearchTree.insert()</text>
        </svg>
      )}

      {/* TOPIC 4: PATHFINDING */}
      {topic === 'pathfinding' && (
        <svg
          width="100%"
          height="100%"
          style={{ position: 'absolute', top: 0, left: 0, opacity: 0.35 }}
        >
          {/* Subtle Faint Grid Maze on Bottom Left */}
          <g transform="translate(50, 200)" style={{ animation: 'subtleFloat 9s ease-in-out infinite' }}>
            {/* Grid Cells */}
            {[0, 1, 2, 3, 4].map((r) =>
              [0, 1, 2, 3, 4, 5].map((c) => (
                <rect
                  key={`${r}-${c}`}
                  x={c * 36}
                  y={r * 36}
                  width="32"
                  height="32"
                  rx="4"
                  fill={(r === 1 && c === 2) || (r === 2 && c === 2) || (r === 3 && c === 4) ? '#1e293b' : '#070a13'}
                  stroke="#1e293b"
                  strokeWidth="1"
                />
              ))
            )}
            {/* Start Node */}
            <circle cx="16" cy="16" r="8" fill="#10b981" opacity="0.8" />
            <text x="16" y="20" fill="#070a13" fontSize="9" fontWeight="bold" textAnchor="middle">S</text>
            {/* Goal Node */}
            <circle cx="196" cy="160" r="8" fill="#f97316" opacity="0.8" />
            <text x="196" y="164" fill="#070a13" fontSize="9" fontWeight="bold" textAnchor="middle">G</text>
            {/* Walking Pathfinder Particle */}
            <circle cx="0" cy="0" r="5" fill="#0ea5e9" style={{ animation: 'gridTravel 8s ease-in-out infinite' }} />
          </g>

          {/* Themed Character Animation: "Maze Pathfinder Sprite" (top right) */}
          <g transform="translate(1160, 75)" style={{ animation: 'subtleFloat 6s ease-in-out infinite' }}>
            <rect x="25" y="25" width="55" height="55" rx="14" fill="#0f172a" stroke="#10b981" strokeWidth="1.5" />
            {/* Compass Rose in Mascot */}
            <polygon points="52,35 56,48 52,46" fill="#0ea5e9" />
            <polygon points="52,65 56,52 52,54" fill="#f97316" />
            <polygon points="38,50 49,47 48,50" fill="#64748b" />
            <polygon points="66,50 55,47 56,50" fill="#64748b" />
            <circle cx="52" cy="50" r="3" fill="#ffffff" />
            <text x="24" y="92" fill="#64748b" fontSize="9" fontFamily="monospace">PATH-FINDER</text>
          </g>

          <text x="82%" y="65%" fill="#334155" fontSize="15" fontFamily="monospace" opacity="0.35">f(n) = g(n) + h(n)</text>
          <text x="15%" y="82%" fill="#334155" fontSize="14" fontFamily="monospace" opacity="0.25">Dijkstra: min_dist(u, v)</text>
        </svg>
      )}

      {/* TOPIC 5: GRAPH */}
      {topic === 'graph' && (
        <svg
          width="100%"
          height="100%"
          style={{ position: 'absolute', top: 0, left: 0, opacity: 0.35 }}
        >
          {/* Orbital Constellation Network */}
          <g transform="translate(120, 260)" style={{ animation: 'subtleFloat 8s ease-in-out infinite' }}>
            {/* Edges */}
            <line x1="50" y1="50" x2="160" y2="20" stroke="#0ea5e9" strokeWidth="1.5" strokeOpacity="0.3" />
            <line x1="160" y1="20" x2="220" y2="120" stroke="#10b981" strokeWidth="1.5" strokeOpacity="0.3" />
            <line x1="50" y1="50" x2="100" y2="160" stroke="#f97316" strokeWidth="1.5" strokeOpacity="0.3" />
            <line x1="100" y1="160" x2="220" y2="120" stroke="#0ea5e9" strokeWidth="1.5" strokeOpacity="0.3" />
            <line x1="50" y1="50" x2="220" y2="120" stroke="#334155" strokeWidth="1" strokeDasharray="4 4" />

            {/* Vertices */}
            <circle cx="50" cy="50" r="14" fill="#0f172a" stroke="#0ea5e9" strokeWidth="1.5" />
            <text x="50" y="54" fill="#0ea5e9" fontSize="10" textAnchor="middle" fontFamily="monospace">A</text>
            <circle cx="160" cy="20" r="14" fill="#0f172a" stroke="#10b981" strokeWidth="1.5" />
            <text x="160" y="24" fill="#10b981" fontSize="10" textAnchor="middle" fontFamily="monospace">B</text>
            <circle cx="220" cy="120" r="14" fill="#0f172a" stroke="#f97316" strokeWidth="1.5" />
            <text x="220" y="124" fill="#f97316" fontSize="10" textAnchor="middle" fontFamily="monospace">C</text>
            <circle cx="100" cy="160" r="14" fill="#0f172a" stroke="#0ea5e9" strokeWidth="1.5" />
            <text x="100" y="164" fill="#0ea5e9" fontSize="10" textAnchor="middle" fontFamily="monospace">D</text>

            {/* Traveling Data Packet Photon */}
            <circle cx="50" cy="50" r="4" fill="#ffffff" style={{ animation: 'subtlePulse 3s infinite' }} />
          </g>

          {/* Themed Character Animation: "Graph Spider/Bot" (top right) */}
          <g transform="translate(1160, 70)" style={{ animation: 'subtleFloat 5.5s ease-in-out infinite' }}>
            <circle cx="50" cy="45" r="22" fill="#0f172a" stroke="#0ea5e9" strokeWidth="1.5" />
            <circle cx="44" cy="40" r="2.5" fill="#0ea5e9" style={{ animation: 'blinkEye 3.5s infinite' }} />
            <circle cx="56" cy="40" r="2.5" fill="#10b981" style={{ animation: 'blinkEye 3.5s infinite' }} />
            {/* Graph Node Connectors */}
            <path d="M 32 30 L 20 20" stroke="#0ea5e9" strokeWidth="1.5" />
            <circle cx="18" cy="18" r="3.5" fill="#0ea5e9" />
            <path d="M 68 30 L 80 20" stroke="#10b981" strokeWidth="1.5" />
            <circle cx="82" cy="18" r="3.5" fill="#10b981" />
            <path d="M 32 60 L 20 70" stroke="#f97316" strokeWidth="1.5" />
            <circle cx="18" cy="72" r="3.5" fill="#f97316" />
            <path d="M 68 60 L 80 70" stroke="#0ea5e9" strokeWidth="1.5" />
            <circle cx="82" cy="72" r="3.5" fill="#0ea5e9" />
            <text x="16" y="88" fill="#64748b" fontSize="9" fontFamily="monospace">GRAPH-NET</text>
          </g>

          <text x="80%" y="70%" fill="#334155" fontSize="15" fontFamily="monospace" opacity="0.35">G = (V, E)</text>
          <text x="12%" y="82%" fill="#334155" fontSize="14" fontFamily="monospace" opacity="0.3">BFS: Queue(v) • DFS: Stack(v)</text>
        </svg>
      )}

      {/* TOPIC 6: RECURSION */}
      {topic === 'recursion' && (
        <svg
          width="100%"
          height="100%"
          style={{ position: 'absolute', top: 0, left: 0, opacity: 0.35 }}
        >
          {/* Subtle Tower of Hanoi in Left Corner */}
          <g transform="translate(80, 240)" style={{ animation: 'subtleFloat 7s ease-in-out infinite' }}>
            {/* 3 Rods */}
            <rect x="60" y="30" width="4" height="110" rx="2" fill="#334155" />
            <rect x="140" y="30" width="4" height="110" rx="2" fill="#334155" />
            <rect x="220" y="30" width="4" height="110" rx="2" fill="#334155" />
            <rect x="30" y="140" width="220" height="6" rx="3" fill="#1e293b" />
            {/* Base Rod Rings */}
            <rect x="38" y="125" width="48" height="14" rx="4" fill="#0ea5e9" opacity="0.4" />
            <rect x="44" y="109" width="36" height="14" rx="4" fill="#10b981" opacity="0.4" />
            {/* Animated Floating Top Ring moving between rods */}
            <rect
              x="-12"
              y="-6"
              width="24"
              height="12"
              rx="3"
              fill="#f97316"
              opacity="0.8"
              style={{ animation: 'hanoiRing1 8s ease-in-out infinite' }}
            />
            <text x="45" y="165" fill="#64748b" fontSize="9" fontFamily="monospace">Tower of Hanoi: 2ⁿ - 1</text>
          </g>

          {/* Recursive Fractal Tree on Right */}
          <g transform="translate(1180, 200)" style={{ animation: 'treeSway 6s ease-in-out infinite', transformOrigin: '50px 140px' }}>
            <line x1="50" y1="140" x2="50" y2="80" stroke="#0ea5e9" strokeWidth="3" />
            <line x1="50" y1="80" x2="20" y2="40" stroke="#10b981" strokeWidth="2" />
            <line x1="50" y1="80" x2="80" y2="40" stroke="#f97316" strokeWidth="2" />
            <line x1="20" y1="40" x2="5" y2="15" stroke="#0ea5e9" strokeWidth="1" />
            <line x1="20" y1="40" x2="35" y2="15" stroke="#10b981" strokeWidth="1" />
            <line x1="80" y1="40" x2="65" y2="15" stroke="#f97316" strokeWidth="1" />
            <line x1="80" y1="40" x2="95" y2="15" stroke="#0ea5e9" strokeWidth="1" />
            <circle cx="5" cy="15" r="3" fill="#0ea5e9" />
            <circle cx="35" cy="15" r="3" fill="#10b981" />
            <circle cx="65" cy="15" r="3" fill="#f97316" />
            <circle cx="95" cy="15" r="3" fill="#0ea5e9" />
          </g>

          <text x="80%" y="78%" fill="#334155" fontSize="15" fontFamily="monospace" opacity="0.35">T(n) = 2T(n-1) + 1</text>
          <text x="12%" y="82%" fill="#334155" fontSize="14" fontFamily="monospace" opacity="0.3">base_case: if n == 1 return</text>
        </svg>
      )}

      {/* TOPIC 7: DYNAMIC PROGRAMMING */}
      {topic === 'dp' && (
        <svg
          width="100%"
          height="100%"
          style={{ position: 'absolute', top: 0, left: 0, opacity: 0.35 }}
        >
          {/* Subtle Memoization Matrix Table on Left */}
          <g transform="translate(60, 240)" style={{ animation: 'subtleFloat 8s ease-in-out infinite' }}>
            {[0, 1, 2, 3].map((r) =>
              [0, 1, 2, 3, 4].map((c) => (
                <g key={`${r}-${c}`} transform={`translate(${c * 42}, ${r * 32})`}>
                  <rect
                    x="0"
                    y="0"
                    width="38"
                    height="28"
                    rx="4"
                    fill={r === 2 && c === 3 ? 'rgba(249, 115, 22, 0.15)' : '#0f172a'}
                    stroke={r === 2 && c === 3 ? '#f97316' : '#1e293b'}
                    strokeWidth="1"
                  />
                  <text
                    x="19"
                    y="18"
                    fill={r === 2 && c === 3 ? '#f97316' : '#64748b'}
                    fontSize="10"
                    textAnchor="middle"
                    fontFamily="monospace"
                  >
                    {[0, 1, 2, 3, 5][(r + c) % 5]}
                  </text>
                </g>
              ))
            )}
            <text x="0" y="150" fill="#64748b" fontSize="10" fontFamily="monospace">
              dp[i][w] = max(dp[i-1][w], val[i] + dp[i-1][w-wt[i]])
            </text>
          </g>

          {/* Themed Character Animation: "MemoBot" (top right) */}
          <g transform="translate(1160, 75)" style={{ animation: 'subtleFloat 6s ease-in-out infinite' }}>
            <rect x="25" y="25" width="55" height="50" rx="10" fill="#0f172a" stroke="#f97316" strokeWidth="1.5" />
            <circle cx="42" cy="42" r="3" fill="#0ea5e9" style={{ animation: 'blinkEye 4s infinite' }} />
            <circle cx="63" cy="42" r="3" fill="#10b981" style={{ animation: 'blinkEye 4s infinite' }} />
            {/* Memory Chip slot */}
            <rect x="36" y="55" width="33" height="6" rx="2" fill="#070a13" stroke="#f97316" strokeWidth="1" />
            <text x="25" y="92" fill="#64748b" fontSize="9" fontFamily="monospace">MEMO-BOT</text>
          </g>

          <text x="82%" y="65%" fill="#334155" fontSize="15" fontFamily="monospace" opacity="0.35">memo[n] != -1</text>
          <text x="14%" y="82%" fill="#334155" fontSize="14" fontFamily="monospace" opacity="0.3">Subproblems + Overlap = DP</text>
        </svg>
      )}

      {/* TOPIC 8: COMPARE ARENA */}
      {topic === 'compare' && (
        <svg
          width="100%"
          height="100%"
          style={{ position: 'absolute', top: 0, left: 0, opacity: 0.35 }}
        >
          {/* Dual Racing Meters on Left */}
          <g transform="translate(80, 240)" style={{ animation: 'subtleFloat 7s ease-in-out infinite' }}>
            {/* Algo 1 Dial */}
            <circle cx="60" cy="60" r="45" fill="none" stroke="#1e293b" strokeWidth="6" />
            <circle cx="60" cy="60" r="45" fill="none" stroke="#0ea5e9" strokeWidth="6" strokeDasharray="180 280" />
            <text x="60" y="65" fill="#0ea5e9" fontSize="13" fontWeight="bold" textAnchor="middle" fontFamily="monospace">12ms</text>
            <text x="60" y="125" fill="#64748b" fontSize="10" textAnchor="middle" fontFamily="monospace">ALGO A</text>

            {/* VS Badge */}
            <circle cx="160" cy="60" r="18" fill="#0f172a" stroke="#f97316" strokeWidth="1.5" />
            <text x="160" y="65" fill="#f97316" fontSize="12" fontWeight="bold" textAnchor="middle">VS</text>

            {/* Algo 2 Dial */}
            <circle cx="260" cy="60" r="45" fill="none" stroke="#1e293b" strokeWidth="6" />
            <circle cx="260" cy="60" r="45" fill="none" stroke="#10b981" strokeWidth="6" strokeDasharray="230 280" />
            <text x="260" y="65" fill="#10b981" fontSize="13" fontWeight="bold" textAnchor="middle" fontFamily="monospace">4ms</text>
            <text x="260" y="125" fill="#64748b" fontSize="10" textAnchor="middle" fontFamily="monospace">ALGO B</text>
          </g>

          {/* Themed Character Animation: "Referee Bot" (top right) */}
          <g transform="translate(1160, 75)" style={{ animation: 'subtleFloat 6s ease-in-out infinite' }}>
            <circle cx="50" cy="45" r="24" fill="#0f172a" stroke="#0ea5e9" strokeWidth="1.5" />
            <circle cx="43" cy="40" r="3" fill="#0ea5e9" style={{ animation: 'blinkEye 4s infinite' }} />
            <circle cx="57" cy="40" r="3" fill="#10b981" style={{ animation: 'blinkEye 4s infinite' }} />
            {/* Whistle / Flag */}
            <line x1="50" y1="52" x2="50" y2="62" stroke="#f97316" strokeWidth="2" />
            <rect x="50" y="58" width="14" height="9" rx="1" fill="#f97316" />
            <text x="18" y="85" fill="#64748b" fontSize="9" fontFamily="monospace">ARENA-BOT</text>
          </g>

          <text x="82%" y="65%" fill="#334155" fontSize="15" fontFamily="monospace" opacity="0.35">Benchmarks &amp; Metrics</text>
        </svg>
      )}

      {/* TOPIC 9: COMPLEXITY */}
      {topic === 'complexity' && (
        <svg
          width="100%"
          height="100%"
          style={{ position: 'absolute', top: 0, left: 0, opacity: 0.35 }}
        >
          {/* Subtle Flowing Asymptotic Curves on Left */}
          <g transform="translate(80, 220)" style={{ animation: 'subtleFloat 8s ease-in-out infinite' }}>
            {/* Axes */}
            <line x1="40" y1="180" x2="340" y2="180" stroke="#334155" strokeWidth="1.5" />
            <line x1="40" y1="180" x2="40" y2="20" stroke="#334155" strokeWidth="1.5" />
            <text x="340" y="195" fill="#64748b" fontSize="10" fontFamily="monospace">Operations (N)</text>
            <text x="25" y="18" fill="#64748b" fontSize="10" fontFamily="monospace">Time</text>

            {/* O(1) Constant (Emerald) */}
            <line x1="40" y1="165" x2="320" y2="165" stroke="#10b981" strokeWidth="2" strokeDasharray="4 2" />
            <text x="325" y="168" fill="#10b981" fontSize="10" fontFamily="monospace">O(1)</text>

            {/* O(log n) (Cyan) */}
            <path d="M 40 175 Q 120 150 320 135" fill="none" stroke="#0ea5e9" strokeWidth="2" />
            <text x="325" y="138" fill="#0ea5e9" fontSize="10" fontFamily="monospace">O(log n)</text>

            {/* O(n) Linear (White/Slate) */}
            <line x1="40" y1="175" x2="320" y2="70" stroke="#94a3b8" strokeWidth="1.5" />
            <text x="325" y="73" fill="#94a3b8" fontSize="10" fontFamily="monospace">O(n)</text>

            {/* O(n²) Quadratic (Orange) */}
            <path d="M 40 175 Q 180 160 250 30" fill="none" stroke="#f97316" strokeWidth="2.5" />
            <text x="255" y="32" fill="#f97316" fontSize="10" fontFamily="monospace">O(n²)</text>
          </g>

          {/* Themed Character Animation: "MathBot" (top right) */}
          <g transform="translate(1160, 75)" style={{ animation: 'subtleFloat 6s ease-in-out infinite' }}>
            <polygon points="50,25 75,65 25,65" fill="#0f172a" stroke="#0ea5e9" strokeWidth="1.5" />
            <circle cx="50" cy="48" r="4" fill="#10b981" style={{ animation: 'blinkEye 4s infinite' }} />
            <line x1="50" y1="56" x2="50" y2="62" stroke="#f97316" strokeWidth="1.5" />
            <text x="22" y="85" fill="#64748b" fontSize="9" fontFamily="monospace">BIG-O BOT</text>
          </g>

          <text x="82%" y="65%" fill="#334155" fontSize="15" fontFamily="monospace" opacity="0.35">Ω(best) • Θ(avg) • O(worst)</text>
        </svg>
      )}
    </Box>
  );
}

'use client';

import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Chip from '@mui/material/Chip';
import AlgorithmHeader from '../Common/AlgorithmHeader';
import PseudocodeViewer from '../Common/PseudocodeViewer';
import CodeViewer from '../Common/CodeViewer';
import TheorySection from '../Common/TheorySection';
import SecondarySidebar from '../Common/SecondarySidebar';
import { ALGORITHMS } from '../../data/algorithmsData';
import { soundManager } from '../../utils/audio';
import { useColorMode } from '../../app/ThemeRegistry';

export default function DataStructuresVisualizer({ initialType = 'array' }) {
  const { mode } = useColorMode();
  const isDark = mode === 'dark';
  const [dsType, setDsType] = useState(initialType);
  const [inputValue, setInputValue] = useState('42');
  const [inputIndex, setInputIndex] = useState('2');
  const [statusMessage, setStatusMessage] = useState('Select an operation below to interact with the data structure.');
  const [activeHighlight, setActiveHighlight] = useState(null);

  // Array state
  const [arrayData, setArrayData] = useState([12, 35, 7, 88, 19, 44]);

  // Linked List state: array of { id, value }
  const [linkedListData, setLinkedListData] = useState([
    { id: 1, value: 10 },
    { id: 2, value: 25 },
    { id: 3, value: 40 },
    { id: 4, value: 75 },
  ]);

  // Stack state (top is last element)
  const [stackData, setStackData] = useState([15, 30, 45, 60]);

  // Queue state (front is index 0, rear is last)
  const [queueData, setQueueData] = useState([10, 20, 30, 40]);

  // BST state: array of values inserted into tree
  const [bstKeys, setBstKeys] = useState([50, 30, 70, 20, 40, 60, 80]);

  const algorithmData = ALGORITHMS[dsType] || ALGORITHMS['array'];

  // ================= ARRAY OPERATIONS =================
  const handleArrayInsert = () => {
    const val = parseInt(inputValue, 10);
    const idx = parseInt(inputIndex, 10);
    if (isNaN(val)) return;
    const targetIdx = isNaN(idx) || idx < 0 ? arrayData.length : Math.min(idx, arrayData.length);
    const newArr = [...arrayData];
    newArr.splice(targetIdx, 0, val);
    setArrayData(newArr);
    setActiveHighlight(targetIdx);
    setStatusMessage(`Inserted ${val} at index ${targetIdx}. Elements shifted right.`);
    soundManager.playSwap(val);
    setTimeout(() => setActiveHighlight(null), 1500);
  };

  const handleArrayDelete = () => {
    const idx = parseInt(inputIndex, 10);
    if (isNaN(idx) || idx < 0 || idx >= arrayData.length) {
      setStatusMessage(`Invalid index ${idx}. Must be within 0 and ${arrayData.length - 1}.`);
      return;
    }
    const removed = arrayData[idx];
    const newArr = [...arrayData];
    newArr.splice(idx, 1);
    setArrayData(newArr);
    setStatusMessage(`Deleted element ${removed} at index ${idx}. Elements shifted left.`);
    soundManager.playCompare(removed);
  };

  const handleArraySearch = () => {
    const val = parseInt(inputValue, 10);
    if (isNaN(val)) return;
    const foundIdx = arrayData.indexOf(val);
    if (foundIdx !== -1) {
      setActiveHighlight(foundIdx);
      setStatusMessage(`Found ${val} at index ${foundIdx}! (O(n) time).`);
      soundManager.playSuccess();
      setTimeout(() => setActiveHighlight(null), 2000);
    } else {
      setStatusMessage(`Value ${val} not found in array.`);
      soundManager.playVisit();
    }
  };

  // ================= LINKED LIST OPERATIONS =================
  const handleLLInsertHead = () => {
    const val = parseInt(inputValue, 10);
    if (isNaN(val)) return;
    const newNode = { id: Date.now(), value: val };
    setLinkedListData([newNode, ...linkedListData]);
    setActiveHighlight(newNode.id);
    setStatusMessage(`Inserted ${val} at Head. Head pointer redirected.`);
    soundManager.playSwap(val);
    setTimeout(() => setActiveHighlight(null), 1500);
  };

  const handleLLInsertTail = () => {
    const val = parseInt(inputValue, 10);
    if (isNaN(val)) return;
    const newNode = { id: Date.now(), value: val };
    setLinkedListData([...linkedListData, newNode]);
    setActiveHighlight(newNode.id);
    setStatusMessage(`Inserted ${val} at Tail. Previous tail's next pointer points to new node.`);
    soundManager.playSwap(val);
    setTimeout(() => setActiveHighlight(null), 1500);
  };

  const handleLLDeleteHead = () => {
    if (linkedListData.length === 0) return;
    const removed = linkedListData[0];
    setLinkedListData(linkedListData.slice(1));
    setStatusMessage(`Deleted Head node (${removed.value}). Head moved to next node.`);
    soundManager.playCompare(removed.value);
  };

  const handleLLReverse = () => {
    const reversed = [...linkedListData].reverse();
    setLinkedListData(reversed);
    setStatusMessage('Reversed entire linked list: all pointers flipped.');
    soundManager.playSuccess();
  };

  // ================= STACK OPERATIONS =================
  const handleStackPush = () => {
    const val = parseInt(inputValue, 10);
    if (isNaN(val)) return;
    if (stackData.length >= 8) {
      setStatusMessage('Stack Overflow! Maximum demonstration capacity reached.');
      return;
    }
    setStackData([...stackData, val]);
    setActiveHighlight(stackData.length);
    setStatusMessage(`PUSH(${val}) onto Top of stack. LIFO order maintained.`);
    soundManager.playSwap(val);
    setTimeout(() => setActiveHighlight(null), 1500);
  };

  const handleStackPop = () => {
    if (stackData.length === 0) {
      setStatusMessage('Stack Underflow! Stack is empty.');
      return;
    }
    const popped = stackData[stackData.length - 1];
    setStackData(stackData.slice(0, -1));
    setStatusMessage(`POP() removed ${popped} from Top of stack.`);
    soundManager.playCompare(popped);
  };

  const handleStackPeek = () => {
    if (stackData.length === 0) {
      setStatusMessage('Stack is empty.');
      return;
    }
    const top = stackData[stackData.length - 1];
    setActiveHighlight(stackData.length - 1);
    setStatusMessage(`PEEK() => Top value is ${top}.`);
    soundManager.playSuccess();
    setTimeout(() => setActiveHighlight(null), 1500);
  };

  // ================= QUEUE OPERATIONS =================
  const handleQueueEnqueue = () => {
    const val = parseInt(inputValue, 10);
    if (isNaN(val)) return;
    if (queueData.length >= 8) {
      setStatusMessage('Queue Full! Maximum demonstration capacity reached.');
      return;
    }
    setQueueData([...queueData, val]);
    setActiveHighlight(queueData.length);
    setStatusMessage(`ENQUEUE(${val}) at Rear. FIFO order maintained.`);
    soundManager.playSwap(val);
    setTimeout(() => setActiveHighlight(null), 1500);
  };

  const handleQueueDequeue = () => {
    if (queueData.length === 0) {
      setStatusMessage('Queue Underflow! Queue is empty.');
      return;
    }
    const dequeued = queueData[0];
    setQueueData(queueData.slice(1));
    setStatusMessage(`DEQUEUE() extracted ${dequeued} from Front.`);
    soundManager.playCompare(dequeued);
  };

  // ================= BST OPERATIONS =================
  const handleBstInsert = () => {
    const val = parseInt(inputValue, 10);
    if (isNaN(val) || bstKeys.includes(val)) return;
    setBstKeys([...bstKeys, val]);
    setActiveHighlight(val);
    setStatusMessage(`Inserted key ${val} into BST adhering to Left < Root < Right invariant.`);
    soundManager.playSuccess();
    setTimeout(() => setActiveHighlight(null), 2000);
  };

  const handleBstSearch = () => {
    const val = parseInt(inputValue, 10);
    if (isNaN(val)) return;
    if (bstKeys.includes(val)) {
      setActiveHighlight(val);
      setStatusMessage(`Found key ${val} in BST in O(log n) time!`);
      soundManager.playSuccess();
      setTimeout(() => setActiveHighlight(null), 2500);
    } else {
      setStatusMessage(`Key ${val} not present in BST.`);
      soundManager.playVisit();
    }
  };

  // BST Tree Visualizer node tree builder
  class BstNode {
    constructor(val) {
      this.val = val;
      this.left = null;
      this.right = null;
    }
  }

  const buildBst = (keys) => {
    if (keys.length === 0) return null;
    let root = null;
    const insert = (node, v) => {
      if (!node) return new BstNode(v);
      if (v < node.val) node.left = insert(node.left, v);
      else if (v > node.val) node.right = insert(node.right, v);
      return node;
    };
    keys.forEach((k) => {
      root = insert(root, k);
    });
    return root;
  };

  // Render SVG tree coordinates
  const renderTreeSvg = (root) => {
    if (!root) return null;
    const nodes = [];
    const edges = [];

    const traverse = (node, x, y, dx) => {
      if (!node) return;
      nodes.push({ val: node.val, x, y });

      if (node.left) {
        edges.push({ x1: x, y1: y, x2: x - dx, y2: y + 55 });
        traverse(node.left, x - dx, y + 55, dx * 0.55);
      }
      if (node.right) {
        edges.push({ x1: x, y1: y, x2: x + dx, y2: y + 55 });
        traverse(node.right, x + dx, y + 55, dx * 0.55);
      }
    };

    traverse(root, 300, 40, 110);

    return (
      <svg width="100%" height="260" viewBox="0 0 600 260" style={{ overflow: 'visible' }}>
        {edges.map((e, idx) => (
          <line
            key={idx}
            x1={e.x1}
            y1={e.y1}
            x2={e.x2}
            y2={e.y2}
            stroke={isDark ? "rgba(255, 255, 255, 0.2)" : "rgba(15, 23, 42, 0.2)"}
            strokeWidth="2"
          />
        ))}
        {nodes.map((n) => {
          const isHigh = activeHighlight === n.val;
          return (
            <g key={n.val}>
              <circle
                cx={n.x}
                cy={n.y}
                r={18}
                fill={isHigh ? '#10b981' : (isDark ? '#1e293b' : '#ffffff')}
                stroke={isHigh ? '#34d399' : (isDark ? '#38bdf8' : '#0284c7')}
                strokeWidth={isHigh ? 3 : 2}
                style={{
                  filter: isHigh ? 'drop-shadow(0 0 10px #10b981)' : (isDark ? 'none' : 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))'),
                  transition: 'all 0.3s ease',
                }}
              />
              <text
                x={n.x}
                y={n.y + 5}
                textAnchor="middle"
                fill={isHigh ? '#ffffff' : (isDark ? '#ffffff' : '#0f172a')}
                fontSize="12"
                fontWeight="700"
                fontFamily="monospace"
              >
                {n.val}
              </text>
            </g>
          );
        })}
      </svg>
    );
  };

  const dsTabs = [
    { slug: 'array', label: 'Array', badge: 'Linear' },
    { slug: 'linked-list', label: 'Linked List', badge: 'Dynamic' },
    { slug: 'stack', label: 'Stack (LIFO)', badge: 'O(1) Push' },
    { slug: 'queue', label: 'Queue (FIFO)', badge: 'O(1) Enq' },
    { slug: 'binary-search-tree', label: 'Binary Search Tree', badge: 'O(log n)' },
  ];

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: 1600,
        mx: 'auto',
        px: { xs: 1.5, sm: 2, md: 3 },
        py: 3,
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        gap: { xs: 2, md: 3 },
        alignItems: 'flex-start',
      }}
    >
      {/* Secondary Left Sidebar / SideDrawer for Data Structures */}
      <SecondarySidebar
        title="Structures Suite"
        category="Data Structures"
        items={dsTabs}
        activeSlug={dsType}
        onSelect={(slug) => {
          setDsType(slug);
          setStatusMessage(`Switched to ${dsTabs.find(t => t.slug === slug)?.label || slug}.`);
          setActiveHighlight(null);
        }}
      />

      {/* Main Content Area */}
      <Box sx={{ flex: 1, minWidth: 0, width: '100%' }}>
        {/* Header */}
        <AlgorithmHeader algorithm={algorithmData} />

      {/* Hero Visualizer Canvas */}
      <Paper
        elevation={0}
        sx={{
          p: { xs: 2, sm: 3 },
          borderRadius: 3,
          backgroundColor: isDark ? 'rgba(13, 19, 34, 0.75)' : 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(16px)',
          border: isDark ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid rgba(0, 0, 0, 0.08)',
          boxShadow: isDark ? '0 20px 40px rgba(0, 0, 0, 0.4)' : '0 10px 30px rgba(0, 0, 0, 0.06)',
          mb: 3,
        }}
      >
        {/* Status Message */}
        <Box
          sx={{
            p: 1.5,
            borderRadius: 2,
            backgroundColor: isDark ? 'rgba(56, 189, 248, 0.1)' : 'rgba(2, 132, 199, 0.08)',
            border: isDark ? '1px solid rgba(56, 189, 248, 0.25)' : '1px solid rgba(2, 132, 199, 0.25)',
            color: isDark ? '#38bdf8' : '#0369a1',
            fontSize: '0.9rem',
            fontWeight: 700,
            mb: 3,
            display: 'flex',
            alignItems: 'center',
            gap: 1.5,
          }}
        >
          <span>⚡</span>
          <span>{statusMessage}</span>
        </Box>

        {/* Dynamic Data Structure Stage Canvas */}
        <Box
          sx={{
            minHeight: 260,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            p: 3,
            borderRadius: 2,
            backgroundColor: isDark ? 'rgba(9, 13, 22, 0.6)' : 'rgba(241, 245, 249, 0.95)',
            border: isDark ? '1px solid rgba(255, 255, 255, 0.04)' : '1px solid rgba(0, 0, 0, 0.06)',
            overflowX: 'auto',
          }}
        >
          {/* ARRAY VISUALIZER */}
          {dsType === 'array' && (
            <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap', justifyContent: 'center' }}>
              {arrayData.map((val, idx) => {
                const isHighlight = activeHighlight === idx;
                return (
                  <Box key={idx} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.5 }}>
                    <Box
                      sx={{
                        width: 55,
                        height: 55,
                        borderRadius: 2,
                        backgroundColor: isHighlight
                          ? (isDark ? 'rgba(56, 189, 248, 0.3)' : 'rgba(2, 132, 199, 0.15)')
                          : (isDark ? 'rgba(30, 41, 59, 0.8)' : '#ffffff'),
                        border: `2px solid ${isHighlight ? (isDark ? '#38bdf8' : '#0284c7') : (isDark ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.15)')}`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: isHighlight ? (isDark ? '#38bdf8' : '#0284c7') : (isDark ? '#ffffff' : '#0f172a'),
                        fontWeight: 800,
                        fontSize: '1.1rem',
                        fontFamily: 'monospace',
                        boxShadow: isHighlight
                          ? (isDark ? '0 0 15px #38bdf8' : '0 0 12px rgba(2, 132, 199, 0.3)')
                          : (isDark ? 'none' : '0 2px 8px rgba(0,0,0,0.06)'),
                        transition: 'all 0.25s ease',
                      }}
                    >
                      {val}
                    </Box>
                    <Typography variant="caption" sx={{ color: isDark ? '#64748b' : '#64748b', fontWeight: 600, fontFamily: 'monospace' }}>
                      idx [{idx}]
                    </Typography>
                  </Box>
                );
              })}
            </Box>
          )}

          {/* LINKED LIST VISUALIZER */}
          {dsType === 'linked-list' && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap', justifyContent: 'center' }}>
              {linkedListData.map((node, idx) => {
                const isHighlight = activeHighlight === node.id;
                return (
                  <Box key={node.id} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    {idx === 0 && (
                      <Chip
                        label="HEAD"
                        size="small"
                        sx={{ backgroundColor: '#0284c7', color: '#fff', fontWeight: 800, fontSize: '0.65rem' }}
                      />
                    )}
                    <Box
                      sx={{
                        display: 'flex',
                        border: `2px solid ${isHighlight ? '#10b981' : (isDark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.15)')}`,
                        borderRadius: 2,
                        overflow: 'hidden',
                        backgroundColor: isDark ? 'rgba(30, 41, 59, 0.9)' : '#ffffff',
                        boxShadow: isHighlight ? '0 0 15px #10b981' : (isDark ? 'none' : '0 2px 8px rgba(0,0,0,0.06)'),
                        transition: 'all 0.25s ease',
                      }}
                    >
                      <Box sx={{ px: 2, py: 1.25, color: isDark ? '#f8fafc' : '#0f172a', fontWeight: 800, fontFamily: 'monospace' }}>
                        {node.value}
                      </Box>
                      <Box
                        sx={{
                          px: 1,
                          py: 1.25,
                          backgroundColor: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.04)',
                          borderLeft: isDark ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.1)',
                          color: isDark ? '#38bdf8' : '#0284c7',
                          fontSize: '0.75rem',
                          fontWeight: 700,
                          fontFamily: 'monospace',
                        }}
                      >
                        next
                      </Box>
                    </Box>
                    <Typography sx={{ color: isDark ? '#38bdf8' : '#0284c7', fontWeight: 800, fontSize: '1.2rem' }}>
                      →
                    </Typography>
                  </Box>
                );
              })}
              <Box
                sx={{
                  px: 1.5,
                  py: 1,
                  borderRadius: 2,
                  backgroundColor: 'rgba(239, 68, 68, 0.15)',
                  border: '1px dashed #ef4444',
                  color: '#dc2626',
                  fontWeight: 800,
                  fontSize: '0.75rem',
                  fontFamily: 'monospace',
                }}
              >
                NULL
              </Box>
            </Box>
          )}

          {/* STACK VISUALIZER (Vertical cylinder) */}
          {dsType === 'stack' && (
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
              <Typography variant="caption" sx={{ color: isDark ? '#38bdf8' : '#0284c7', fontWeight: 800 }}>
                ▲ TOP OF STACK (LIFO)
              </Typography>
              <Box
                sx={{
                  width: 150,
                  minHeight: 180,
                  border: `3px solid ${isDark ? '#38bdf8' : '#0284c7'}`,
                  borderTop: 'none',
                  borderRadius: '0 0 16px 16px',
                  p: 1.5,
                  display: 'flex',
                  flexDirection: 'column-reverse',
                  gap: 1,
                  backgroundColor: isDark ? 'rgba(15, 23, 42, 0.4)' : '#ffffff',
                  boxShadow: isDark ? 'none' : '0 4px 15px rgba(0,0,0,0.05)',
                }}
              >
                {stackData.map((val, idx) => {
                  const isTop = idx === stackData.length - 1;
                  const isHighlight = activeHighlight === idx;
                  return (
                    <Box
                      key={idx}
                      sx={{
                        width: '100%',
                        py: 1,
                        backgroundColor: isTop
                          ? (isDark ? 'rgba(56, 189, 248, 0.25)' : 'rgba(2, 132, 199, 0.15)')
                          : (isDark ? 'rgba(30, 41, 59, 0.8)' : '#f8fafc'),
                        border: `1px solid ${isTop ? (isDark ? '#38bdf8' : '#0284c7') : (isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.12)')}`,
                        borderRadius: 1.5,
                        textAlign: 'center',
                        color: isTop ? (isDark ? '#38bdf8' : '#0284c7') : (isDark ? '#ffffff' : '#0f172a'),
                        fontWeight: 800,
                        fontFamily: 'monospace',
                        boxShadow: isHighlight ? '0 0 15px #38bdf8' : 'none',
                        animation: 'fadeIn 0.2s ease',
                      }}
                    >
                      {val} {isTop && '← TOP'}
                    </Box>
                  );
                })}
              </Box>
              <Typography variant="caption" sx={{ color: isDark ? '#64748b' : '#64748b', fontWeight: 600 }}>
                Bottom of Stack
              </Typography>
            </Box>
          )}

          {/* QUEUE VISUALIZER (Horizontal conveyor) */}
          {dsType === 'queue' && (
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1.5, width: '100%' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', maxWidth: 500, px: 2 }}>
                <Typography variant="caption" sx={{ color: isDark ? '#10b981' : '#059669', fontWeight: 800 }}>
                  ← FRONT (DEQUEUE)
                </Typography>
                <Typography variant="caption" sx={{ color: isDark ? '#38bdf8' : '#0284c7', fontWeight: 800 }}>
                  REAR (ENQUEUE) ←
                </Typography>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  gap: 1.5,
                  p: 2,
                  border: isDark ? '2px dashed rgba(255, 255, 255, 0.2)' : '2px dashed rgba(0, 0, 0, 0.2)',
                  borderRadius: 3,
                  backgroundColor: isDark ? 'rgba(15, 23, 42, 0.5)' : '#ffffff',
                  minWidth: 320,
                  justifyContent: 'center',
                  boxShadow: isDark ? 'none' : '0 2px 10px rgba(0,0,0,0.05)',
                }}
              >
                {queueData.map((val, idx) => {
                  const isFront = idx === 0;
                  const isRear = idx === queueData.length - 1;
                  return (
                    <Box
                      key={idx}
                      sx={{
                        width: 55,
                        height: 55,
                        borderRadius: 2,
                        backgroundColor: isFront
                          ? (isDark ? 'rgba(16, 185, 129, 0.25)' : 'rgba(16, 185, 129, 0.15)')
                          : isRear
                          ? (isDark ? 'rgba(56, 189, 248, 0.25)' : 'rgba(2, 132, 199, 0.15)')
                          : (isDark ? 'rgba(30, 41, 59, 0.8)' : '#f8fafc'),
                        border: `2px solid ${isFront ? '#10b981' : isRear ? (isDark ? '#38bdf8' : '#0284c7') : (isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.12)')}`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: isDark ? '#ffffff' : '#0f172a',
                        fontWeight: 800,
                        fontFamily: 'monospace',
                      }}
                    >
                      {val}
                    </Box>
                  );
                })}
              </Box>
            </Box>
          )}

          {/* BINARY SEARCH TREE VISUALIZER */}
          {dsType === 'binary-search-tree' && (
            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
              {renderTreeSvg(buildBst(bstKeys))}
            </Box>
          )}
        </Box>

        {/* Interactive Controls & Operation Triggers */}
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            gap: 2,
            mt: 3,
            p: 2,
            borderRadius: 2.5,
            backgroundColor: isDark ? 'rgba(13, 19, 34, 0.8)' : 'rgba(255, 255, 255, 0.95)',
            border: isDark ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid rgba(0, 0, 0, 0.08)',
            boxShadow: isDark ? 'none' : '0 4px 15px rgba(0,0,0,0.05)',
          }}
        >
          {/* Input Fields */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <TextField
              size="small"
              label="Value"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              sx={{
                width: 90,
                '& .MuiOutlinedInput-root': {
                  color: isDark ? '#ffffff' : '#0f172a',
                  backgroundColor: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.03)',
                  '& fieldset': { borderColor: isDark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)' },
                  '&:hover fieldset': { borderColor: '#0284c7' },
                  '&.Mui-focused fieldset': { borderColor: '#0284c7' },
                },
                '& .MuiInputLabel-root': { color: isDark ? '#94a3b8' : '#64748b' },
              }}
            />

            {dsType === 'array' && (
              <TextField
                size="small"
                label="Index"
                value={inputIndex}
                onChange={(e) => setInputIndex(e.target.value)}
                sx={{
                  width: 80,
                  '& .MuiOutlinedInput-root': {
                    color: isDark ? '#ffffff' : '#0f172a',
                    backgroundColor: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.03)',
                    '& fieldset': { borderColor: isDark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)' },
                    '&:hover fieldset': { borderColor: '#0284c7' },
                    '&.Mui-focused fieldset': { borderColor: '#0284c7' },
                  },
                  '& .MuiInputLabel-root': { color: isDark ? '#94a3b8' : '#64748b' },
                }}
              />
            )}
          </Box>

          {/* Dynamic Operation Buttons */}
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {dsType === 'array' && (
              <>
                <Button variant="contained" size="small" onClick={handleArrayInsert} sx={{ backgroundColor: '#2563eb' }}>
                  Insert at Index
                </Button>
                <Button variant="outlined" size="small" onClick={handleArrayDelete} sx={{ borderColor: '#ef4444', color: '#ef4444' }}>
                  Delete Index
                </Button>
                <Button variant="outlined" size="small" onClick={handleArraySearch} sx={{ borderColor: '#38bdf8', color: '#38bdf8' }}>
                  Search Value
                </Button>
              </>
            )}

            {dsType === 'linked-list' && (
              <>
                <Button variant="contained" size="small" onClick={handleLLInsertHead} sx={{ backgroundColor: '#2563eb' }}>
                  Insert Head
                </Button>
                <Button variant="contained" size="small" onClick={handleLLInsertTail} sx={{ backgroundColor: '#0284c7' }}>
                  Insert Tail
                </Button>
                <Button variant="outlined" size="small" onClick={handleLLDeleteHead} sx={{ borderColor: '#ef4444', color: '#ef4444' }}>
                  Delete Head
                </Button>
                <Button variant="outlined" size="small" onClick={handleLLReverse} sx={{ borderColor: '#8b5cf6', color: '#8b5cf6' }}>
                  Reverse List
                </Button>
              </>
            )}

            {dsType === 'stack' && (
              <>
                <Button variant="contained" size="small" onClick={handleStackPush} sx={{ backgroundColor: '#2563eb' }}>
                  Push (Top)
                </Button>
                <Button variant="outlined" size="small" onClick={handleStackPop} sx={{ borderColor: '#ef4444', color: '#ef4444' }}>
                  Pop (Top)
                </Button>
                <Button variant="outlined" size="small" onClick={handleStackPeek} sx={{ borderColor: '#38bdf8', color: '#38bdf8' }}>
                  Peek (Top)
                </Button>
              </>
            )}

            {dsType === 'queue' && (
              <>
                <Button variant="contained" size="small" onClick={handleQueueEnqueue} sx={{ backgroundColor: '#2563eb' }}>
                  Enqueue (Rear)
                </Button>
                <Button variant="outlined" size="small" onClick={handleQueueDequeue} sx={{ borderColor: '#ef4444', color: '#ef4444' }}>
                  Dequeue (Front)
                </Button>
              </>
            )}

            {dsType === 'binary-search-tree' && (
              <>
                <Button variant="contained" size="small" onClick={handleBstInsert} sx={{ backgroundColor: '#2563eb' }}>
                  Insert Key
                </Button>
                <Button variant="outlined" size="small" onClick={handleBstSearch} sx={{ borderColor: '#38bdf8', color: '#38bdf8' }}>
                  Search Key
                </Button>
              </>
            )}
          </Box>
        </Box>
      </Paper>

      {/* Code and Pseudocode */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', lg: '1fr 1fr' },
          gap: 3,
          mb: 4,
        }}
      >
        <PseudocodeViewer pseudocode={algorithmData.pseudocode} activeLine={null} />
        <CodeViewer
          cCode={algorithmData.cCode}
          pythonCode={algorithmData.pythonCode}
          cFileName={algorithmData.cFileName}
          pythonFileName={algorithmData.pythonFileName}
        />
      </Box>

      {/* Theory */}
      <TheorySection theory={algorithmData.theory} />
      </Box>
    </Box>
  );
}

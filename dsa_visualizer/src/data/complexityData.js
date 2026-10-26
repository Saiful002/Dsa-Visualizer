export const COMPLEXITY_CURVES = [
  { name: 'O(1)', color: '#10b981', label: 'Constant', formula: (n) => 1 },
  { name: 'O(log n)', color: '#06b6d4', label: 'Logarithmic', formula: (n) => Math.max(1, Math.log2(n)) },
  { name: 'O(n)', color: '#3b82f6', label: 'Linear', formula: (n) => n },
  { name: 'O(n log n)', color: '#f59e0b', label: 'Linearithmic', formula: (n) => n * Math.max(1, Math.log2(n)) },
  { name: 'O(n²)', color: '#f43f5e', label: 'Quadratic', formula: (n) => Math.min(2500, n * n) },
  { name: 'O(2^n)', color: '#dc2626', label: 'Exponential', formula: (n) => Math.min(2500, Math.pow(2, Math.min(n, 12))) },
];

export const BIG_O_TABLE = [
  { entity: 'Array', type: 'Data Structure', access: 'O(1)', search: 'O(n)', insert: 'O(n)', delete: 'O(n)', space: 'O(n)' },
  { entity: 'Stack', type: 'Data Structure', access: 'O(n)', search: 'O(n)', insert: 'O(1)', delete: 'O(1)', space: 'O(n)' },
  { entity: 'Queue', type: 'Data Structure', access: 'O(n)', search: 'O(n)', insert: 'O(1)', delete: 'O(1)', space: 'O(n)' },
  { entity: 'Singly Linked List', type: 'Data Structure', access: 'O(n)', search: 'O(n)', insert: 'O(1)*', delete: 'O(1)*', space: 'O(n)' },
  { entity: 'Hash Table', type: 'Data Structure', access: 'N/A', search: 'O(1)', insert: 'O(1)', delete: 'O(1)', space: 'O(n)' },
  { entity: 'Binary Search Tree', type: 'Data Structure', access: 'O(log n)', search: 'O(log n)', insert: 'O(log n)', delete: 'O(log n)', space: 'O(n)' },
  { entity: 'Binary Heap', type: 'Data Structure', access: 'O(1)*', search: 'O(n)', insert: 'O(log n)', delete: 'O(log n)', space: 'O(n)' },

  { entity: 'Bubble Sort', type: 'Algorithm', best: 'O(n)', average: 'O(n²)', worst: 'O(n²)', space: 'O(1)', stable: 'Yes' },
  { entity: 'Selection Sort', type: 'Algorithm', best: 'O(n²)', average: 'O(n²)', worst: 'O(n²)', space: 'O(1)', stable: 'No' },
  { entity: 'Insertion Sort', type: 'Algorithm', best: 'O(n)', average: 'O(n²)', worst: 'O(n²)', space: 'O(1)', stable: 'Yes' },
  { entity: 'Merge Sort', type: 'Algorithm', best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n log n)', space: 'O(n)', stable: 'Yes' },
  { entity: 'Quick Sort', type: 'Algorithm', best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n²)', space: 'O(log n)', stable: 'No' },
  { entity: 'Heap Sort', type: 'Algorithm', best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n log n)', space: 'O(1)', stable: 'No' },

  { entity: 'Linear Search', type: 'Searching', best: 'O(1)', average: 'O(n)', worst: 'O(n)', space: 'O(1)', stable: 'N/A' },
  { entity: 'Binary Search', type: 'Searching', best: 'O(1)', average: 'O(log n)', worst: 'O(log n)', space: 'O(1)', stable: 'N/A' },

  { entity: "Dijkstra's", type: 'Pathfinding', best: 'O(E log V)', average: 'O(E log V)', worst: 'O(V²)', space: 'O(V)', stable: 'N/A' },
  { entity: 'A* Search', type: 'Pathfinding', best: 'O(E)', average: 'O(E log V)', worst: 'O(b^d)', space: 'O(V)', stable: 'N/A' },
];

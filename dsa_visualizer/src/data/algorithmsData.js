export const ALGORITHMS = {
  // ================= SORTING ALGORITHMS =================
  'bubble-sort': {
    id: 'bubble-sort',
    name: 'Bubble Sort',
    slug: 'bubble-sort',
    category: 'Sorting',
    difficulty: 'Easy',
    timeComplexity: {
      best: 'O(n)',
      average: 'O(n²)',
      worst: 'O(n²)'
    },
    spaceComplexity: 'O(1)',
    description: 'A simple comparison-based sorting algorithm that repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order.',
    pseudocode: [
      { line: 1, text: 'procedure bubbleSort(A : list of sortable items)' },
      { line: 2, text: '  n = length(A)' },
      { line: 3, text: '  repeat' },
      { line: 4, text: '    swapped = false' },
      { line: 5, text: '    for i = 1 to n-1 inclusive do' },
      { line: 6, text: '      if A[i-1] > A[i] then' },
      { line: 7, text: '        swap(A[i-1], A[i])' },
      { line: 8, text: '        swapped = true' },
      { line: 9, text: '      end if' },
      { line: 10, text: '    end for' },
      { line: 11, text: '    n = n - 1' },
      { line: 12, text: '  until not swapped' },
      { line: 13, text: 'end procedure' }
    ],
    theory: {
      what: 'Bubble Sort is one of the most fundamental sorting algorithms. It works by repeatedly comparing pairs of adjacent elements and swapping them if they are in the descending order. Large elements "bubble up" to the end of the array with each pass.',
      why: 'It serves as an excellent introductory algorithm for learning how comparison, swapping, nested iterations, and stability work in algorithmic computer science.',
      analogy: 'Imagine bubbles rising in a carbonated soda: larger bubbles rise quickly to the surface. Similarly, largest numbers rise to the end of the array one after another.',
      how: [
        'Start at index 0 and compare arr[0] with arr[1].',
        'If arr[0] > arr[1], swap them.',
        'Move forward to index 1 and compare arr[1] with arr[2], swapping if needed.',
        'Continue until the end of the unsorted segment. The maximum element is now in its final position.',
        'Repeat for the remaining n - 1 elements until a pass finishes with zero swaps.'
      ],
      pros: [
        'Extremely easy to understand and implement.',
        'Requires O(1) auxiliary space (in-place).',
        'Stable sort: preserves relative order of duplicate elements.',
        'Adaptive: achieves O(n) time on already sorted arrays using a swapped flag.'
      ],
      cons: [
        'O(n²) worst and average time makes it impractical for large datasets.',
        'Performs excessive element swaps compared to Selection Sort or Insertion Sort.'
      ],
      whenToUse: 'Small datasets (N < 20), educational purposes, or detecting whether an array is already sorted in O(n) time.',
      whenNotToUse: 'Large datasets or production systems requiring scalable performance.'
    },
    cFileName: 'bubble_sort.c',
    cCode: `/**
 * Bubble Sort in C
 * Time Complexity: O(n) Best, O(n^2) Avg/Worst
 * Space Complexity: O(1)
 */
#include <stdio.h>
#include <stdbool.h>

void swap(int *xp, int *yp) {
    int temp = *xp;
    *xp = *yp;
    *yp = temp;
}

void bubbleSort(int arr[], int n) {
    int i, j;
    bool swapped;
    for (i = 0; i < n - 1; i++) {
        swapped = false;
        for (j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                swap(&arr[j], &arr[j + 1]);
                swapped = true;
            }
        }
        // If no two elements were swapped by inner loop, array is sorted
        if (!swapped)
            break;
    }
}

void printArray(int arr[], int size) {
    for (int i = 0; i < size; i++)
        printf("%d ", arr[i]);
    printf("\\n");
}

int main() {
    int arr[] = {64, 34, 25, 12, 22, 11, 90};
    int n = sizeof(arr) / sizeof(arr[0]);

    printf("Original array: \\n");
    printArray(arr, n);

    bubbleSort(arr, n);

    printf("Sorted array: \\n");
    printArray(arr, n);
    return 0;
}`,
    phpFileName: 'bubble_sort.php',
    phpCode: `<?php
/**
 * Bubble Sort in PHP
 * Time Complexity: O(n) Best, O(n^2) Avg/Worst
 * Space Complexity: O(1)
 */

function bubbleSort(array &$arr): void {
    $n = count($arr);
    for ($i = 0; $i < $n - 1; $i++) {
        $swapped = false;
        for ($j = 0; $j < $n - $i - 1; $j++) {
            if ($arr[$j] > $arr[$j + 1]) {
                $temp = $arr[$j];
                $arr[$j] = $arr[$j + 1];
                $arr[$j + 1] = $temp;
                $swapped = true;
            }
        }
        // Optimization: break early if no swaps occurred
        if (!$swapped) {
            break;
        }
    }
}

// Test harness
$arr = [64, 34, 25, 12, 22, 11, 90];
echo "Original array:\\n" . implode(", ", $arr) . "\\n";

bubbleSort($arr);

echo "Sorted array:\\n" . implode(", ", $arr) . "\\n";
?>`,
    relatedAlgorithms: ['selection-sort', 'insertion-sort', 'quick-sort']
  },

  'selection-sort': {
    id: 'selection-sort',
    name: 'Selection Sort',
    slug: 'selection-sort',
    category: 'Sorting',
    difficulty: 'Easy',
    timeComplexity: {
      best: 'O(n²)',
      average: 'O(n²)',
      worst: 'O(n²)'
    },
    spaceComplexity: 'O(1)',
    description: 'Divides the input list into two parts: a sorted sublist and an unsorted sublist, repeatedly finding the minimum element from the unsorted part and appending it to the sorted part.',
    pseudocode: [
      { line: 1, text: 'procedure selectionSort(A : list of sortable items)' },
      { line: 2, text: '  n = length(A)' },
      { line: 3, text: '  for i = 0 to n-2 do' },
      { line: 4, text: '    min_idx = i' },
      { line: 5, text: '    for j = i+1 to n-1 do' },
      { line: 6, text: '      if A[j] < A[min_idx] then' },
      { line: 7, text: '        min_idx = j' },
      { line: 8, text: '      end if' },
      { line: 9, text: '    end for' },
      { line: 10, text: '    if min_idx != i then' },
      { line: 11, text: '      swap(A[i], A[min_idx])' },
      { line: 12, text: '    end if' },
      { line: 13, text: '  end for' },
      { line: 14, text: 'end procedure' }
    ],
    theory: {
      what: 'Selection Sort segments the array into a sorted portion (left) and unsorted portion (right). On each iteration, it scans the entire unsorted portion to find the absolute minimum value and swaps it with the first unsorted index.',
      why: 'It minimizes the total number of swaps (at most O(n) swaps total), which can be advantageous when write operations are significantly more expensive than read operations (e.g. flash memory).',
      analogy: 'Imagine selecting the shortest student in a group to stand at the front of a line, then selecting the next shortest for the second spot, and so on.',
      how: [
        'Set minIndex to the current index i.',
        'Iterate through the remainder of the array (from i + 1 to n - 1).',
        'Whenever an element smaller than arr[minIndex] is encountered, update minIndex.',
        'Swap arr[i] with arr[minIndex] once the inner loop completes.',
        'Advance i by 1 and repeat.'
      ],
      pros: [
        'Simple logic and O(1) extra space.',
        'Performs at most n - 1 swaps total, minimizing write wear.',
        'Performance is consistent regardless of initial element ordering.'
      ],
      cons: [
        'Always takes O(n²) comparisons even if the list is already sorted.',
        'Not a stable sort by default (can reorder equal elements during swaps).'
      ],
      whenToUse: 'Small lists where write operations are costly (e.g. EEPROM hardware).',
      whenNotToUse: 'Medium to large lists where Merge Sort or Quick Sort are vastly superior.'
    },
    cFileName: 'selection_sort.c',
    cCode: `/**
 * Selection Sort in C
 * Time Complexity: O(n^2) Best, Avg, Worst
 * Space Complexity: O(1)
 */
#include <stdio.h>

void swap(int *xp, int *yp) {
    int temp = *xp;
    *xp = *yp;
    *yp = temp;
}

void selectionSort(int arr[], int n) {
    int i, j, min_idx;
    for (i = 0; i < n - 1; i++) {
        min_idx = i;
        for (j = i + 1; j < n; j++) {
            if (arr[j] < arr[min_idx])
                min_idx = j;
        }
        if (min_idx != i)
            swap(&arr[min_idx], &arr[i]);
    }
}

void printArray(int arr[], int size) {
    for (int i = 0; i < size; i++)
        printf("%d ", arr[i]);
    printf("\\n");
}

int main() {
    int arr[] = {64, 25, 12, 22, 11};
    int n = sizeof(arr) / sizeof(arr[0]);

    printf("Original array: \\n");
    printArray(arr, n);

    selectionSort(arr, n);

    printf("Sorted array: \\n");
    printArray(arr, n);
    return 0;
}`,
    phpFileName: 'selection_sort.php',
    phpCode: `<?php
/**
 * Selection Sort in PHP
 * Time Complexity: O(n^2) Best, Avg, Worst
 * Space Complexity: O(1)
 */

function selectionSort(array &$arr): void {
    $n = count($arr);
    for ($i = 0; $i < $n - 1; $i++) {
        $minIdx = $i;
        for ($j = $i + 1; $j < $n; $j++) {
            if ($arr[$j] < $arr[$minIdx]) {
                $minIdx = $j;
            }
        }
        if ($minIdx !== $i) {
            $temp = $arr[$i];
            $arr[$i] = $arr[$minIdx];
            $arr[$minIdx] = $temp;
        }
    }
}

// Test harness
$arr = [64, 25, 12, 22, 11];
echo "Original array:\\n" . implode(", ", $arr) . "\\n";

selectionSort($arr);

echo "Sorted array:\\n" . implode(", ", $arr) . "\\n";
?>`,
    relatedAlgorithms: ['bubble-sort', 'insertion-sort', 'heap-sort']
  },

  'insertion-sort': {
    id: 'insertion-sort',
    name: 'Insertion Sort',
    slug: 'insertion-sort',
    category: 'Sorting',
    difficulty: 'Easy',
    timeComplexity: {
      best: 'O(n)',
      average: 'O(n²)',
      worst: 'O(n²)'
    },
    spaceComplexity: 'O(1)',
    description: 'Builds the final sorted array one item at a time by repeatedly taking the next element and inserting it into its correct position within the already sorted prefix.',
    pseudocode: [
      { line: 1, text: 'procedure insertionSort(A : list of sortable items)' },
      { line: 2, text: '  for i = 1 to length(A) - 1 do' },
      { line: 3, text: '    key = A[i]' },
      { line: 4, text: '    j = i - 1' },
      { line: 5, text: '    while j >= 0 and A[j] > key do' },
      { line: 6, text: '      A[j + 1] = A[j]' },
      { line: 7, text: '      j = j - 1' },
      { line: 8, text: '    end while' },
      { line: 9, text: '    A[j + 1] = key' },
      { line: 10, text: '  end for' },
      { line: 11, text: 'end procedure' }
    ],
    theory: {
      what: 'Insertion Sort inspects elements one by one, shifting larger elements to the right to create an opening where the current item (key) can be slotted into its rightful position.',
      why: 'It is highly efficient on small arrays and nearly sorted arrays (O(n) time). Modern production hybrid sorts like Timsort (used in Python and Java) use Insertion Sort as their base case for small partitions.',
      analogy: 'Sorting playing cards in your hand: you hold a sorted hand and pick a new card from the table, shifting cards over until you find the exact slot to tuck it into.',
      how: [
        'Assume the first element (index 0) is trivially sorted.',
        'Pick the next element at index i as the key.',
        'Compare key with elements in the sorted prefix (j = i - 1 down to 0).',
        'Shift elements that are greater than key one position to the right.',
        'Place key into the vacated position (j + 1).',
        'Repeat for all remaining elements.'
      ],
      pros: [
        'O(n) best-case time when array is already sorted or nearly sorted.',
        'Stable and in-place (O(1) memory).',
        'Online algorithm: can sort a list as it receives items dynamically.'
      ],
      cons: [
        'O(n²) average and worst case makes it slow for large reversed datasets.'
      ],
      whenToUse: 'Small lists (N < 30) or streaming data that is already almost sorted.',
      whenNotToUse: 'Large unsorted datasets.'
    },
    cFileName: 'insertion_sort.c',
    cCode: `/**
 * Insertion Sort in C
 * Time Complexity: O(n) Best, O(n^2) Avg/Worst
 * Space Complexity: O(1)
 */
#include <stdio.h>

void insertionSort(int arr[], int n) {
    int i, key, j;
    for (i = 1; i < n; i++) {
        key = arr[i];
        j = i - 1;

        /* Move elements of arr[0..i-1], that are greater than key,
           to one position ahead of their current position */
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j = j - 1;
        }
        arr[j + 1] = key;
    }
}

void printArray(int arr[], int n) {
    for (int i = 0; i < n; i++)
        printf("%d ", arr[i]);
    printf("\\n");
}

int main() {
    int arr[] = {12, 11, 13, 5, 6};
    int n = sizeof(arr) / sizeof(arr[0]);

    printf("Original array:\\n");
    printArray(arr, n);

    insertionSort(arr, n);

    printf("Sorted array:\\n");
    printArray(arr, n);
    return 0;
}`,
    phpFileName: 'insertion_sort.php',
    phpCode: `<?php
/**
 * Insertion Sort in PHP
 * Time Complexity: O(n) Best, O(n^2) Avg/Worst
 * Space Complexity: O(1)
 */

function insertionSort(array &$arr): void {
    $n = count($arr);
    for ($i = 1; $i < $n; $i++) {
        $key = $arr[$i];
        $j = $i - 1;

        while ($j >= 0 && $arr[$j] > $key) {
            $arr[$j + 1] = $arr[$j];
            $j = $j - 1;
        }
        $arr[$j + 1] = $key;
    }
}

// Test harness
$arr = [12, 11, 13, 5, 6];
echo "Original array:\\n" . implode(", ", $arr) . "\\n";

insertionSort($arr);

echo "Sorted array:\\n" . implode(", ", $arr) . "\\n";
?>`,
    relatedAlgorithms: ['bubble-sort', 'merge-sort', 'quick-sort']
  },

  'merge-sort': {
    id: 'merge-sort',
    name: 'Merge Sort',
    slug: 'merge-sort',
    category: 'Sorting',
    difficulty: 'Medium',
    timeComplexity: {
      best: 'O(n log n)',
      average: 'O(n log n)',
      worst: 'O(n log n)'
    },
    spaceComplexity: 'O(n)',
    description: 'An efficient, general-purpose, comparison-based divide-and-conquer sorting algorithm that divides the array into halves, recursively sorts them, and merges the sorted halves.',
    pseudocode: [
      { line: 1, text: 'procedure mergeSort(A, left, right)' },
      { line: 2, text: '  if left < right then' },
      { line: 3, text: '    mid = floor((left + right) / 2)' },
      { line: 4, text: '    mergeSort(A, left, mid)' },
      { line: 5, text: '    mergeSort(A, mid + 1, right)' },
      { line: 6, text: '    merge(A, left, mid, right)' },
      { line: 7, text: '  end if' },
      { line: 8, text: 'end procedure' }
    ],
    theory: {
      what: 'Merge Sort breaks the list into two halves recursively until every subarray has length 1 (which is trivially sorted). Then it combines ("merges") pairs of subarrays in ascending order until the entire array is unified.',
      why: 'It guarantees O(n log n) time in all scenarios (best, average, worst) and is a stable sort. It is optimal for linked lists and external storage where random access is expensive.',
      analogy: 'Splitting a thick deck of cards in halves repeatedly down to individual cards, then smoothly zipping pairs of sorted piles together into a clean sorted deck.',
      how: [
        'Find the middle index: mid = (left + right) / 2.',
        'Recursively call mergeSort on left half: arr[left..mid].',
        'Recursively call mergeSort on right half: arr[mid+1..right].',
        'Merge the two sorted halves into a single sorted range using auxiliary arrays.',
        'Copy elements back to the original array.'
      ],
      pros: [
        'Guaranteed O(n log n) runtime regardless of input order.',
        'Stable: preserves original order of equal keys.',
        'Well-suited for sorting linked lists (requires O(1) extra pointers) and external files.'
      ],
      cons: [
        'Requires O(n) auxiliary memory for standard array implementations.',
        'Slightly slower constant factor than Quick Sort in practice.'
      ],
      whenToUse: 'When stable sorting and predictable guaranteed O(n log n) time are critical.',
      whenNotToUse: 'Systems with strictly limited memory where O(1) extra space is required.'
    },
    cFileName: 'merge_sort.c',
    cCode: `/**
 * Merge Sort in C
 * Time Complexity: O(n log n) Best, Avg, Worst
 * Space Complexity: O(n)
 */
#include <stdio.h>
#include <stdlib.h>

void merge(int arr[], int l, int m, int r) {
    int i, j, k;
    int n1 = m - l + 1;
    int n2 = r - m;

    int *L = (int *)malloc(n1 * sizeof(int));
    int *R = (int *)malloc(n2 * sizeof(int));

    for (i = 0; i < n1; i++)
        L[i] = arr[l + i];
    for (j = 0; j < n2; j++)
        R[j] = arr[m + 1 + j];

    i = 0; j = 0; k = l;
    while (i < n1 && j < n2) {
        if (L[i] <= R[j]) {
            arr[k++] = L[i++];
        } else {
            arr[k++] = R[j++];
        }
    }

    while (i < n1) arr[k++] = L[i++];
    while (j < n2) arr[k++] = R[j++];

    free(L);
    free(R);
}

void mergeSort(int arr[], int l, int r) {
    if (l < r) {
        int m = l + (r - l) / 2;
        mergeSort(arr, l, m);
        mergeSort(arr, m + 1, r);
        merge(arr, l, m, r);
    }
}

void printArray(int A[], int size) {
    for (int i = 0; i < size; i++)
        printf("%d ", A[i]);
    printf("\\n");
}

int main() {
    int arr[] = {12, 11, 13, 5, 6, 7};
    int arr_size = sizeof(arr) / sizeof(arr[0]);

    printf("Original array:\\n");
    printArray(arr, arr_size);

    mergeSort(arr, 0, arr_size - 1);

    printf("Sorted array:\\n");
    printArray(arr, arr_size);
    return 0;
}`,
    phpFileName: 'merge_sort.php',
    phpCode: `<?php
/**
 * Merge Sort in PHP
 * Time Complexity: O(n log n) Best, Avg, Worst
 * Space Complexity: O(n)
 */

function mergeSort(array &$arr, int $l, int $r): void {
    if ($l < $r) {
        $m = intdiv($l + $r, 2);
        mergeSort($arr, $l, $m);
        mergeSort($arr, $m + 1, $r);
        merge($arr, $l, $m, $r);
    }
}

function merge(array &$arr, int $l, int $m, int $r): void {
    $n1 = $m - $l + 1;
    $n2 = $r - $m;

    $L = array_slice($arr, $l, $n1);
    $R = array_slice($arr, $m + 1, $n2);

    $i = 0; $j = 0; $k = $l;
    while ($i < $n1 && $j < $n2) {
        if ($L[$i] <= $R[$j]) {
            $arr[$k++] = $L[$i++];
        } else {
            $arr[$k++] = $R[$j++];
        }
    }

    while ($i < $n1) $arr[$k++] = $L[$i++];
    while ($j < $n2) $arr[$k++] = $R[$j++];
}

// Test harness
$arr = [12, 11, 13, 5, 6, 7];
echo "Original array:\\n" . implode(", ", $arr) . "\\n";

mergeSort($arr, 0, count($arr) - 1);

echo "Sorted array:\\n" . implode(", ", $arr) . "\\n";
?>`,
    relatedAlgorithms: ['quick-sort', 'heap-sort', 'insertion-sort']
  },

  'quick-sort': {
    id: 'quick-sort',
    name: 'Quick Sort',
    slug: 'quick-sort',
    category: 'Sorting',
    difficulty: 'Medium',
    timeComplexity: {
      best: 'O(n log n)',
      average: 'O(n log n)',
      worst: 'O(n²)'
    },
    spaceComplexity: 'O(log n)',
    description: 'An in-place divide-and-conquer algorithm that selects a pivot element, partitions the array around the pivot, and recursively sorts the sub-arrays.',
    pseudocode: [
      { line: 1, text: 'procedure quickSort(A, low, high)' },
      { line: 2, text: '  if low < high then' },
      { line: 3, text: '    p = partition(A, low, high)' },
      { line: 4, text: '    quickSort(A, low, p - 1)' },
      { line: 5, text: '    quickSort(A, p + 1, high)' },
      { line: 6, text: '  end if' },
      { line: 7, text: 'end procedure' },
      { line: 8, text: 'procedure partition(A, low, high)' },
      { line: 9, text: '  pivot = A[high]' },
      { line: 10, text: '  i = low - 1' },
      { line: 11, text: '  for j = low to high - 1 do' },
      { line: 12, text: '    if A[j] < pivot then' },
      { line: 13, text: '      i = i + 1; swap(A[i], A[j])' },
      { line: 14, text: '  swap(A[i + 1], A[high])' },
      { line: 15, text: '  return i + 1' }
    ],
    theory: {
      what: 'Quick Sort chooses a pivot element and reorders the array so that all values smaller than the pivot appear before it and all values greater appear after it. The pivot is then in its permanent position.',
      why: 'In practice, Quick Sort is often 2x to 3x faster than Merge Sort and Heap Sort because of superior cache locality and minimal memory overhead.',
      analogy: 'Organizing students by height around a chosen student: everyone shorter moves to the left, everyone taller moves to the right. The chosen student is now in the correct spot.',
      how: [
        'Select a pivot element (e.g. rightmost element).',
        'Partition: rearrange elements so items <= pivot are on left and items > pivot are on right.',
        'Place the pivot at the boundary index p.',
        'Recursively apply Quick Sort to the left partition (low to p - 1).',
        'Recursively apply Quick Sort to the right partition (p + 1 to high).'
      ],
      pros: [
        'Extremely fast in practice with low overhead and great cache behavior.',
        'In-place sorting with O(log n) call stack space.',
        'Widely used in standard libraries (C qsort, C++ std::sort).'
      ],
      cons: [
        'O(n²) worst-case when bad pivots are chosen (mitigated by randomized pivot selection or median-of-three).',
        'Not a stable sort by default.'
      ],
      whenToUse: 'General-purpose in-memory sorting of large datasets where speed is paramount.',
      whenNotToUse: 'When stability is mandatory or when guaranteed worst-case O(n log n) is required without recursion risk.'
    },
    cFileName: 'quick_sort.c',
    cCode: `/**
 * Quick Sort in C (Lomuto partition scheme)
 * Time Complexity: O(n log n) Best/Avg, O(n^2) Worst
 * Space Complexity: O(log n) stack
 */
#include <stdio.h>

void swap(int* a, int* b) {
    int t = *a;
    *a = *b;
    *b = t;
}

int partition(int arr[], int low, int high) {
    int pivot = arr[high]; // pivot
    int i = (low - 1);     // Index of smaller element

    for (int j = low; j <= high - 1; j++) {
        if (arr[j] < pivot) {
            i++;
            swap(&arr[i], &arr[j]);
        }
    }
    swap(&arr[i + 1], &arr[high]);
    return (i + 1);
}

void quickSort(int arr[], int low, int high) {
    if (low < high) {
        int pi = partition(arr, low, high);
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
}

void printArray(int arr[], int size) {
    for (int i = 0; i < size; i++)
        printf("%d ", arr[i]);
    printf("\\n");
}

int main() {
    int arr[] = {10, 7, 8, 9, 1, 5};
    int n = sizeof(arr) / sizeof(arr[0]);

    printf("Original array:\\n");
    printArray(arr, n);

    quickSort(arr, 0, n - 1);

    printf("Sorted array:\\n");
    printArray(arr, n);
    return 0;
}`,
    phpFileName: 'quick_sort.php',
    phpCode: `<?php
/**
 * Quick Sort in PHP
 * Time Complexity: O(n log n) Best/Avg, O(n^2) Worst
 * Space Complexity: O(log n)
 */

function quickSort(array &$arr, int $low, int $high): void {
    if ($low < $high) {
        $pi = partition($arr, $low, $high);
        quickSort($arr, $low, $pi - 1);
        quickSort($arr, $pi + 1, $high);
    }
}

function partition(array &$arr, int $low, int $high): int {
    $pivot = $arr[$high];
    $i = $low - 1;

    for ($j = $low; $j <= $high - 1; $j++) {
        if ($arr[$j] < $pivot) {
            $i++;
            $temp = $arr[$i];
            $arr[$i] = $arr[$j];
            $arr[$j] = $temp;
        }
    }

    $temp = $arr[$i + 1];
    $arr[$i + 1] = $arr[$high];
    $arr[$high] = $temp;

    return $i + 1;
}

// Test harness
$arr = [10, 7, 8, 9, 1, 5];
echo "Original array:\\n" . implode(", ", $arr) . "\\n";

quickSort($arr, 0, count($arr) - 1);

echo "Sorted array:\\n" . implode(", ", $arr) . "\\n";
?>`,
    relatedAlgorithms: ['merge-sort', 'heap-sort', 'insertion-sort']
  },

  'heap-sort': {
    id: 'heap-sort',
    name: 'Heap Sort',
    slug: 'heap-sort',
    category: 'Sorting',
    difficulty: 'Medium',
    timeComplexity: {
      best: 'O(n log n)',
      average: 'O(n log n)',
      worst: 'O(n log n)'
    },
    spaceComplexity: 'O(1)',
    description: 'A comparison-based sorting technique based on a Binary Heap data structure. It builds a max-heap and repeatedly swaps the maximum element with the last element.',
    pseudocode: [
      { line: 1, text: 'procedure heapSort(A)' },
      { line: 2, text: '  n = length(A)' },
      { line: 3, text: '  for i = floor(n/2) - 1 down to 0 do' },
      { line: 4, text: '    heapify(A, n, i)' },
      { line: 5, text: '  for i = n - 1 down to 1 do' },
      { line: 6, text: '    swap(A[0], A[i])' },
      { line: 7, text: '    heapify(A, i, 0)' },
      { line: 8, text: 'end procedure' }
    ],
    theory: {
      what: 'Heap Sort organizes elements into a Max-Heap where each parent node is greater than or equal to its children. The largest element sits at the root (index 0). It swaps the root to the end of the array, shrinks the heap size by 1, and restores the max-heap property via heapify.',
      why: 'It combines the O(n log n) guaranteed worst-case runtime of Merge Sort with the O(1) in-place auxiliary memory advantage of Selection Sort.',
      analogy: 'A tournament ladder where the champion continuously claims 1st place and is removed, then the runner-ups compete to crown the next highest.',
      how: [
        'Build a Max-Heap from the input array in O(n) time.',
        'At this point, the largest element is stored at root arr[0].',
        'Swap arr[0] with arr[n - 1] (moving maximum to the back).',
        'Reduce heap size by 1 and call heapify on root arr[0].',
        'Repeat until the entire array is sorted.'
      ],
      pros: [
        'Strict O(n log n) runtime in all cases.',
        'Requires O(1) auxiliary memory (in-place).',
        'No recursive call stack overflow risk.'
      ],
      cons: [
        'Poorer cache locality than Quick Sort due to jumping across array indices (2i + 1, 2i + 2).',
        'Not a stable sort.'
      ],
      whenToUse: 'Embedded systems or mission-critical real-time environments where guaranteed worst-case bounds and minimal memory are strictly required.',
      whenNotToUse: 'When stable sorting is required or when maximum cache speed is needed.'
    },
    cFileName: 'heap_sort.c',
    cCode: `/**
 * Heap Sort in C
 * Time Complexity: O(n log n) Best, Avg, Worst
 * Space Complexity: O(1)
 */
#include <stdio.h>

void swap(int* a, int* b) {
    int temp = *a;
    *a = *b;
    *b = temp;
}

void heapify(int arr[], int n, int i) {
    int largest = i;
    int left = 2 * i + 1;
    int right = 2 * i + 2;

    if (left < n && arr[left] > arr[largest])
        largest = left;

    if (right < n && arr[right] > arr[largest])
        largest = right;

    if (largest != i) {
        swap(&arr[i], &arr[largest]);
        heapify(arr, n, largest);
    }
}

void heapSort(int arr[], int n) {
    // Build max heap
    for (int i = n / 2 - 1; i >= 0; i--)
        heapify(arr, n, i);

    // Extract elements one by one
    for (int i = n - 1; i > 0; i--) {
        swap(&arr[0], &arr[i]);
        heapify(arr, i, 0);
    }
}

void printArray(int arr[], int n) {
    for (int i = 0; i < n; ++i)
        printf("%d ", arr[i]);
    printf("\\n");
}

int main() {
    int arr[] = {12, 11, 13, 5, 6, 7};
    int n = sizeof(arr) / sizeof(arr[0]);

    printf("Original array:\\n");
    printArray(arr, n);

    heapSort(arr, n);

    printf("Sorted array:\\n");
    printArray(arr, n);
    return 0;
}`,
    phpFileName: 'heap_sort.php',
    phpCode: `<?php
/**
 * Heap Sort in PHP
 * Time Complexity: O(n log n) Best, Avg, Worst
 * Space Complexity: O(1)
 */

function heapify(array &$arr, int $n, int $i): void {
    $largest = $i;
    $left = 2 * $i + 1;
    $right = 2 * $i + 2;

    if ($left < $n && $arr[$left] > $arr[$largest]) {
        $largest = $left;
    }

    if ($right < $n && $arr[$right] > $arr[$largest]) {
        $largest = $right;
    }

    if ($largest !== $i) {
        $temp = $arr[$i];
        $arr[$i] = $arr[$largest];
        $arr[$largest] = $temp;

        heapify($arr, $n, $largest);
    }
}

function heapSort(array &$arr): void {
    $n = count($arr);

    for ($i = intdiv($n, 2) - 1; $i >= 0; $i--) {
        heapify($arr, $n, $i);
    }

    for ($i = $n - 1; $i > 0; $i--) {
        $temp = $arr[0];
        $arr[0] = $arr[$i];
        $arr[$i] = $temp;

        heapify($arr, $i, 0);
    }
}

// Test harness
$arr = [12, 11, 13, 5, 6, 7];
echo "Original array:\\n" . implode(", ", $arr) . "\\n";

heapSort($arr);

echo "Sorted array:\\n" . implode(", ", $arr) . "\\n";
?>`,
    relatedAlgorithms: ['quick-sort', 'merge-sort', 'selection-sort']
  },

  // ================= SEARCHING ALGORITHMS =================
  'linear-search': {
    id: 'linear-search',
    name: 'Linear Search',
    slug: 'linear-search',
    category: 'Searching',
    difficulty: 'Easy',
    timeComplexity: {
      best: 'O(1)',
      average: 'O(n)',
      worst: 'O(n)'
    },
    spaceComplexity: 'O(1)',
    description: 'A sequential search algorithm that checks every element in a list one by one until a match is found or the end of the list is reached.',
    pseudocode: [
      { line: 1, text: 'procedure linearSearch(A, target)' },
      { line: 2, text: '  for i = 0 to length(A) - 1 do' },
      { line: 3, text: '    if A[i] == target then' },
      { line: 4, text: '      return i  // Target found' },
      { line: 5, text: '    end if' },
      { line: 6, text: '  end for' },
      { line: 7, text: '  return -1     // Target not found' },
      { line: 8, text: 'end procedure' }
    ],
    theory: {
      what: 'Linear Search (also known as sequential search) scans through an array from left to right, comparing each item with the target value.',
      why: 'It requires zero preprocessing and works on unordered, unsorted lists of any data type.',
      analogy: 'Searching for a lost key by checking every room in the house one after another until you find it.',
      how: [
        'Start at index 0.',
        'Compare the current element arr[i] with target.',
        'If equal, return index i immediately.',
        'If not equal, advance to index i + 1.',
        'If reached end of array without finding target, return -1.'
      ],
      pros: [
        'Works on unsorted arrays and linked lists.',
        'O(1) best-case time if item is at index 0.',
        'No extra memory required.'
      ],
      cons: [
        'O(n) time is slow for large collections compared to Binary Search (O(log n)).'
      ],
      whenToUse: 'Small lists or unsorted collections where sorting beforehand is not cost-effective.',
      whenNotToUse: 'Large collections that are searched repeatedly.'
    },
    cFileName: 'linear_search.c',
    cCode: `/**
 * Linear Search in C
 * Time Complexity: O(1) Best, O(n) Avg/Worst
 * Space Complexity: O(1)
 */
#include <stdio.h>

int linearSearch(int arr[], int n, int target) {
    for (int i = 0; i < n; i++) {
        if (arr[i] == target)
            return i; // Found at index i
    }
    return -1; // Not found
}

int main() {
    int arr[] = {2, 3, 4, 10, 40};
    int n = sizeof(arr) / sizeof(arr[0]);
    int target = 10;

    int result = linearSearch(arr, n, target);
    if (result == -1)
        printf("Element is not present in array\\n");
    else
        printf("Element is present at index %d\\n", result);
    return 0;
}`,
    phpFileName: 'linear_search.php',
    phpCode: `<?php
/**
 * Linear Search in PHP
 * Time Complexity: O(1) Best, O(n) Avg/Worst
 * Space Complexity: O(1)
 */

function linearSearch(array $arr, int $target): int {
    $n = count($arr);
    for ($i = 0; $i < $n; $i++) {
        if ($arr[$i] === $target) {
            return $i;
        }
    }
    return -1;
}

// Test harness
$arr = [2, 3, 4, 10, 40];
$target = 10;
$result = linearSearch($arr, $target);

if ($result === -1) {
    echo "Element is not present in array\\n";
} else {
    echo "Element is present at index " . $result . "\\n";
}
?>`,
    relatedAlgorithms: ['binary-search']
  },

  'binary-search': {
    id: 'binary-search',
    name: 'Binary Search',
    slug: 'binary-search',
    category: 'Searching',
    difficulty: 'Easy',
    timeComplexity: {
      best: 'O(1)',
      average: 'O(log n)',
      worst: 'O(log n)'
    },
    spaceComplexity: 'O(1)',
    description: 'An efficient algorithm for finding an item from a sorted list of items by repeatedly dividing the search interval in half.',
    pseudocode: [
      { line: 1, text: 'procedure binarySearch(A, target)' },
      { line: 2, text: '  low = 0' },
      { line: 3, text: '  high = length(A) - 1' },
      { line: 4, text: '  while low <= high do' },
      { line: 5, text: '    mid = floor((low + high) / 2)' },
      { line: 6, text: '    if A[mid] == target then' },
      { line: 7, text: '      return mid' },
      { line: 8, text: '    else if A[mid] < target then' },
      { line: 9, text: '      low = mid + 1' },
      { line: 10, text: '    else' },
      { line: 11, text: '      high = mid - 1' },
      { line: 12, text: '    end if' },
      { line: 13, text: '  end while' },
      { line: 14, text: '  return -1' },
      { line: 15, text: 'end procedure' }
    ],
    theory: {
      what: 'Binary Search works on sorted arrays. It compares the target value to the middle element. If they are not equal, the half in which the target cannot lie is eliminated and the search continues on the remaining half.',
      why: 'It reduces a billion elements down to roughly 30 comparisons because log2(1,000,000,000) ≈ 30.',
      analogy: 'Looking up a word in a physical dictionary: you open to the middle, check if your word is earlier or later in the alphabet, and discard the irrelevant half.',
      how: [
        'Initialize low = 0 and high = n - 1.',
        'Calculate mid = low + (high - low) / 2 (avoids integer overflow).',
        'If arr[mid] == target, target is found at mid.',
        'If arr[mid] < target, discard left half: low = mid + 1.',
        'If arr[mid] > target, discard right half: high = mid - 1.',
        'Repeat until low > high, meaning element is absent.'
      ],
      pros: [
        'Blazing fast O(log n) time complexity.',
        'O(1) memory space in iterative implementation.',
        'Can be extended to binary search on answer spaces (monotonic predicates).'
      ],
      cons: [
        'Requires the array to be sorted beforehand.',
        'Requires random access (O(1) indexing), making it poorly suited for standard linked lists.'
      ],
      whenToUse: 'Searching within sorted collections, database index lookups, finding boundary conditions.',
      whenNotToUse: 'Unsorted arrays where sorting first takes O(n log n) and only one search is performed.'
    },
    cFileName: 'binary_search.c',
    cCode: `/**
 * Binary Search in C (Iterative)
 * Time Complexity: O(1) Best, O(log n) Avg/Worst
 * Space Complexity: O(1)
 */
#include <stdio.h>

int binarySearch(int arr[], int l, int r, int target) {
    while (l <= r) {
        int m = l + (r - l) / 2;

        // Check if target is present at mid
        if (arr[m] == target)
            return m;

        // If target greater, ignore left half
        if (arr[m] < target)
            l = m + 1;
        // If target is smaller, ignore right half
        else
            r = m - 1;
    }
    // Target was not present
    return -1;
}

int main() {
    int arr[] = {2, 3, 4, 10, 40};
    int n = sizeof(arr) / sizeof(arr[0]);
    int target = 10;

    int result = binarySearch(arr, 0, n - 1, target);
    if (result == -1)
        printf("Element is not present in array\\n");
    else
        printf("Element is present at index %d\\n", result);
    return 0;
}`,
    phpFileName: 'binary_search.php',
    phpCode: `<?php
/**
 * Binary Search in PHP (Iterative)
 * Time Complexity: O(1) Best, O(log n) Avg/Worst
 * Space Complexity: O(1)
 */

function binarySearch(array $arr, int $target): int {
    $low = 0;
    $high = count($arr) - 1;

    while ($low <= $high) {
        $mid = intdiv($low + $high, 2);

        if ($arr[$mid] === $target) {
            return $mid;
        }

        if ($arr[$mid] < $target) {
            $low = $mid + 1;
        } else {
            $high = $mid - 1;
        }
    }

    return -1;
}

// Test harness
$arr = [2, 3, 4, 10, 40];
$target = 10;
$result = binarySearch($arr, $target);

if ($result === -1) {
    echo "Element is not present in array\\n";
} else {
    echo "Element is present at index " . $result . "\\n";
}
?>`,
    relatedAlgorithms: ['linear-search', 'quick-sort']
  },

  // ================= DATA STRUCTURES =================
  'array': {
    id: 'array',
    name: 'Array',
    slug: 'array',
    category: 'Data Structures',
    difficulty: 'Easy',
    timeComplexity: {
      best: 'Access: O(1)',
      average: 'Search: O(n)',
      worst: 'Insert/Delete: O(n)'
    },
    spaceComplexity: 'O(n)',
    description: 'A linear data structure consisting of a collection of elements identified by index or key, stored in contiguous memory locations.',
    pseudocode: [
      { line: 1, text: '// Array Operations' },
      { line: 2, text: 'access(index) -> return arr[index] // O(1)' },
      { line: 3, text: 'insert(index, val) -> shift elements right, arr[index] = val // O(n)' },
      { line: 4, text: 'delete(index) -> shift elements left // O(n)' }
    ],
    theory: {
      what: 'An array stores elements of identical type in consecutive memory addresses. Because every item has fixed byte size, the memory location of index i is calculated via BaseAddress + i * ElementSize in O(1) time.',
      why: 'It provides blazing fast index-based random access and ideal CPU cache locality.',
      analogy: 'Numbered lockers in a row: knowing the locker number lets you walk straight to it immediately.',
      how: [
        'Access: direct memory jump via index.',
        'Insertion at index k: shift elements from k to end one step right, then write new value.',
        'Deletion at index k: shift elements from k + 1 to end one step left.'
      ],
      pros: ['O(1) random access', 'Compact memory footprint without pointer overhead', 'Excellent cache locality'],
      cons: ['Fixed size in static languages', 'Expensive insertions and deletions (O(n) shifting)'],
      whenToUse: 'When random indexing is frequent and collection size is known or mostly static.',
      whenNotToUse: 'When frequent insertions and deletions at arbitrary positions are needed.'
    },
    cFileName: 'array_operations.c',
    cCode: `/**
 * Array Operations in C (Insert, Delete, Search)
 */
#include <stdio.h>

void insertAt(int arr[], int *n, int capacity, int index, int val) {
    if (*n >= capacity || index < 0 || index > *n) return;
    for (int i = *n; i > index; i--) {
        arr[i] = arr[i - 1];
    }
    arr[index] = val;
    (*n)++;
}

void deleteAt(int arr[], int *n, int index) {
    if (index < 0 || index >= *n) return;
    for (int i = index; i < *n - 1; i++) {
        arr[i] = arr[i + 1];
    }
    (*n)--;
}

int main() {
    int arr[10] = {10, 20, 30, 40, 50};
    int n = 5;

    insertAt(arr, &n, 10, 2, 99); // Insert 99 at index 2
    deleteAt(arr, &n, 0);          // Delete element at index 0

    for (int i = 0; i < n; i++) printf("%d ", arr[i]);
    printf("\\n");
    return 0;
}`,
    phpFileName: 'array_operations.php',
    phpCode: `<?php
/**
 * Array Operations in PHP
 */
$arr = [10, 20, 30, 40, 50];

// Insert at index 2
array_splice($arr, 2, 0, 99);

// Delete at index 0
array_splice($arr, 0, 1);

print_r($arr);
?>`,
    relatedAlgorithms: ['linked-list', 'stack', 'queue']
  },

  'linked-list': {
    id: 'linked-list',
    name: 'Linked List',
    slug: 'linked-list',
    category: 'Data Structures',
    difficulty: 'Easy',
    timeComplexity: {
      best: 'Prepend: O(1)',
      average: 'Search: O(n)',
      worst: 'Access: O(n)'
    },
    spaceComplexity: 'O(n)',
    description: 'A linear data structure where elements are stored in nodes, and each node points to the next node in the sequence via a pointer.',
    pseudocode: [
      { line: 1, text: 'class Node { data, next }' },
      { line: 2, text: 'insertHead(val): new.next = head; head = new' },
      { line: 3, text: 'insertTail(val): traverse to tail; tail.next = new' },
      { line: 4, text: 'delete(val): prev.next = curr.next' }
    ],
    theory: {
      what: 'A Linked List consists of separate memory nodes linked by pointers. Unlike arrays, nodes do not reside in contiguous memory locations and can expand dynamically without reallocation.',
      why: 'It permits constant-time O(1) insertions and deletions at known pointers without shifting subsequent elements.',
      analogy: 'A treasure hunt where each clue tells you where to find the next clue in the game.',
      how: [
        'Insert at Head: create node, set node.next = head, point head to node.',
        'Insert at Tail: traverse to last node, set lastNode.next = node.',
        'Delete Node: redirect predecessor\'s next pointer to node.next.'
      ],
      pros: ['Dynamic size', 'O(1) insertion/deletion at head/known node', 'No memory reallocation surges'],
      cons: ['O(n) access time (no indexing)', 'Extra memory overhead for pointer storage', 'Poor cache locality'],
      whenToUse: 'Dynamic structures with unknown sizes requiring frequent head/tail insertion.',
      whenNotToUse: 'When fast random index access is needed.'
    },
    cFileName: 'linked_list.c',
    cCode: `/**
 * Singly Linked List in C
 */
#include <stdio.h>
#include <stdlib.h>

struct Node {
    int data;
    struct Node* next;
};

void insertHead(struct Node** head_ref, int new_data) {
    struct Node* new_node = (struct Node*)malloc(sizeof(struct Node));
    new_node->data = new_data;
    new_node->next = (*head_ref);
    (*head_ref) = new_node;
}

void printList(struct Node* node) {
    while (node != NULL) {
        printf("%d -> ", node->data);
        node = node->next;
    }
    printf("NULL\\n");
}

int main() {
    struct Node* head = NULL;
    insertHead(&head, 30);
    insertHead(&head, 20);
    insertHead(&head, 10);

    printList(head);
    return 0;
}`,
    phpFileName: 'linked_list.php',
    phpCode: `<?php
/**
 * Singly Linked List in PHP
 */
class Node {
    public int $data;
    public ?Node $next;

    public function __construct(int $data) {
        $this->data = $data;
        $this->next = null;
    }
}

class LinkedList {
    public ?Node $head = null;

    public function insertHead(int $data): void {
        $newNode = new Node($data);
        $newNode->next = $this->head;
        $this->head = $newNode;
    }

    public function display(): void {
        $curr = $this->head;
        while ($curr !== null) {
            echo "{$curr->data} -> ";
            $curr = $curr->next;
        }
        echo "NULL\\n";
    }
}

$list = new LinkedList();
$list->insertHead(30);
$list->insertHead(20);
$list->insertHead(10);
$list->display();
?>`,
    relatedAlgorithms: ['array', 'stack', 'queue']
  },

  'stack': {
    id: 'stack',
    name: 'Stack',
    slug: 'stack',
    category: 'Data Structures',
    difficulty: 'Easy',
    timeComplexity: {
      best: 'Push: O(1)',
      average: 'Pop: O(1)',
      worst: 'Peek: O(1)'
    },
    spaceComplexity: 'O(n)',
    description: 'A linear data structure following the Last In, First Out (LIFO) principle, where elements are inserted and removed from the same end called top.',
    pseudocode: [
      { line: 1, text: 'procedure push(val)' },
      { line: 2, text: '  top = top + 1; stack[top] = val' },
      { line: 3, text: 'procedure pop()' },
      { line: 4, text: '  val = stack[top]; top = top - 1; return val' },
      { line: 5, text: 'procedure peek()' },
      { line: 6, text: '  return stack[top]' }
    ],
    theory: {
      what: 'A Stack is a restricted linear container that restricts additions and removals exclusively to the "top" of the container.',
      why: 'It forms the bedrock of function execution call stacks, recursion, undo mechanisms, and expression parsing.',
      analogy: 'A spring-loaded stack of dinner plates in a cafeteria: you take plates off the top and add clean plates onto the top.',
      how: [
        'Push: add item to the top of the stack.',
        'Pop: remove and return the topmost item.',
        'Peek/Top: view topmost item without removal.',
        'IsEmpty: check if top index is -1.'
      ],
      pros: ['O(1) push and pop operations', 'Memory efficient', 'Simulates recursive mechanics iteratively'],
      cons: ['No random access to internal elements without popping preceding elements'],
      whenToUse: 'Undo/Redo systems, syntax parsing (balanced brackets), call stack simulation.',
      whenNotToUse: 'When elements in the middle or bottom must be directly retrieved.'
    },
    cFileName: 'stack.c',
    cCode: `/**
 * Stack implementation in C using Array
 */
#include <stdio.h>
#include <stdbool.h>

#define MAX 100

struct Stack {
    int items[MAX];
    int top;
};

void init(struct Stack* s) { s->top = -1; }
bool isFull(struct Stack* s) { return s->top == MAX - 1; }
bool isEmpty(struct Stack* s) { return s->top == -1; }

void push(struct Stack* s, int val) {
    if (!isFull(s)) s->items[++(s->top)] = val;
}

int pop(struct Stack* s) {
    if (!isEmpty(s)) return s->items[(s->top)--];
    return -1;
}

int peek(struct Stack* s) {
    if (!isEmpty(s)) return s->items[s->top];
    return -1;
}

int main() {
    struct Stack s;
    init(&s);
    push(&s, 10);
    push(&s, 20);
    push(&s, 30);

    printf("Top element: %d\\n", peek(&s));
    printf("Popped element: %d\\n", pop(&s));
    printf("Next top: %d\\n", peek(&s));
    return 0;
}`,
    phpFileName: 'stack.php',
    phpCode: `<?php
/**
 * Stack implementation in PHP
 */
class Stack {
    private array $items = [];

    public function push(int $val): void {
        $this->items[] = $val;
    }

    public function pop(): ?int {
        return array_pop($this->items);
    }

    public function peek(): ?int {
        return end($this->items) ?: null;
    }

    public function isEmpty(): bool {
        return empty($this->items);
    }
}

$s = new Stack();
$s->push(10);
$s->push(20);
$s->push(30);

echo "Popped: " . $s->pop() . "\\n";
echo "Peek: " . $s->peek() . "\\n";
?>`,
    relatedAlgorithms: ['queue', 'linked-list', 'binary-search-tree']
  },

  'queue': {
    id: 'queue',
    name: 'Queue',
    slug: 'queue',
    category: 'Data Structures',
    difficulty: 'Easy',
    timeComplexity: {
      best: 'Enqueue: O(1)',
      average: 'Dequeue: O(1)',
      worst: 'Peek: O(1)'
    },
    spaceComplexity: 'O(n)',
    description: 'A linear data structure following the First In, First Out (FIFO) principle, where items enter at the rear and leave from the front.',
    pseudocode: [
      { line: 1, text: 'procedure enqueue(val)' },
      { line: 2, text: '  rear = (rear + 1); queue[rear] = val' },
      { line: 3, text: 'procedure dequeue()' },
      { line: 4, text: '  val = queue[front]; front = (front + 1); return val' }
    ],
    theory: {
      what: 'A Queue enforces First-In-First-Out ordering. The first element placed into the queue is the first to be extracted.',
      why: 'Crucial for scheduling asynchronous tasks, BFS tree/graph explorations, and printer spoolers.',
      analogy: 'A queue of people waiting for movie tickets: the person who arrived first gets served first.',
      how: [
        'Enqueue: insert new element at the rear.',
        'Dequeue: remove and return element from the front.',
        'Front: inspect item at front without deletion.'
      ],
      pros: ['O(1) enqueue and dequeue operations', 'Guarantees fair FIFO ordering'],
      cons: ['No random access', 'Standard arrays require circular indexing to prevent memory drift'],
      whenToUse: 'Breadth-First Search (BFS), asynchronous job processing, buffering.',
      whenNotToUse: 'When priority or LIFO retrieval is required.'
    },
    cFileName: 'queue.c',
    cCode: `/**
 * Circular Queue in C
 */
#include <stdio.h>
#include <stdbool.h>

#define SIZE 5

struct Queue {
    int items[SIZE];
    int front, rear;
};

void init(struct Queue* q) {
    q->front = -1;
    q->rear = -1;
}

bool isFull(struct Queue* q) {
    return (q->front == 0 && q->rear == SIZE - 1) || (q->rear == (q->front - 1) % (SIZE - 1));
}

bool isEmpty(struct Queue* q) {
    return q->front == -1;
}

void enqueue(struct Queue* q, int val) {
    if (isFull(q)) return;
    if (q->front == -1) q->front = 0;
    q->rear = (q->rear + 1) % SIZE;
    q->items[q->rear] = val;
}

int dequeue(struct Queue* q) {
    if (isEmpty(q)) return -1;
    int data = q->items[q->front];
    if (q->front == q->rear) {
        q->front = -1;
        q->rear = -1;
    } else {
        q->front = (q->front + 1) % SIZE;
    }
    return data;
}

int main() {
    struct Queue q;
    init(&q);
    enqueue(&q, 10);
    enqueue(&q, 20);
    enqueue(&q, 30);

    printf("Dequeued: %d\\n", dequeue(&q));
    printf("Dequeued: %d\\n", dequeue(&q));
    return 0;
}`,
    phpFileName: 'queue.php',
    phpCode: `<?php
/**
 * Queue in PHP
 */
class Queue {
    private array $items = [];

    public function enqueue(int $val): void {
        array_push($this->items, $val);
    }

    public function dequeue(): ?int {
        return array_shift($this->items);
    }

    public function peek(): ?int {
        return $this->items[0] ?? null;
    }
}

$q = new Queue();
$q->enqueue(10);
$q->enqueue(20);
$q->enqueue(30);

echo "Dequeued: " . $q->dequeue() . "\\n";
echo "Next: " . $q->peek() . "\\n";
?>`,
    relatedAlgorithms: ['stack', 'array', 'linked-list']
  },

  'binary-search-tree': {
    id: 'binary-search-tree',
    name: 'Binary Search Tree (BST)',
    slug: 'binary-search-tree',
    category: 'Trees',
    difficulty: 'Medium',
    timeComplexity: {
      best: 'Search: O(log n)',
      average: 'Insert: O(log n)',
      worst: 'Unbalanced: O(n)'
    },
    spaceComplexity: 'O(n)',
    description: 'A hierarchical node-based tree data structure where each node has at most two children, and all keys in the left subtree are smaller than the node, while all keys in the right subtree are greater.',
    pseudocode: [
      { line: 1, text: 'procedure insert(node, key)' },
      { line: 2, text: '  if node == null return new Node(key)' },
      { line: 3, text: '  if key < node.key then node.left = insert(node.left, key)' },
      { line: 4, text: '  else if key > node.key then node.right = insert(node.right, key)' },
      { line: 5, text: '  return node' }
    ],
    theory: {
      what: 'A Binary Search Tree preserves an invariant: left child < parent < right child. Inorder traversal (Left, Root, Right) always prints keys in ascending sorted order.',
      why: 'Enables dynamic insertion, deletion, and lookup in logarithmic O(log n) time without requiring array shifting.',
      analogy: 'A family tree where relatives younger than the parent always move to the left branch, and older relatives move to the right.',
      how: [
        'Search: compare target with current node; branch left if smaller, right if larger.',
        'Insert: traverse following BST rules until finding an empty null leaf.',
        'Delete: handle three cases: 0 children (remove), 1 child (bypass), 2 children (replace with inorder successor).'
      ],
      pros: ['Dynamic logarithmic search, insert, and delete', 'Inorder traversal gives sorted order automatically'],
      cons: ['Can degrade to O(n) skewed linked list if inserted in sequential order (requires AVL or Red-Black balance)'],
      whenToUse: 'Dynamic sorted data, range queries, hierarchical representations.',
      whenNotToUse: 'When data is already sorted and no balancing algorithm is applied.'
    },
    cFileName: 'bst.c',
    cCode: `/**
 * Binary Search Tree in C
 */
#include <stdio.h>
#include <stdlib.h>

struct Node {
    int key;
    struct Node *left, *right;
};

struct Node* newNode(int item) {
    struct Node* temp = (struct Node*)malloc(sizeof(struct Node));
    temp->key = item;
    temp->left = temp->right = NULL;
    return temp;
}

struct Node* insert(struct Node* node, int key) {
    if (node == NULL) return newNode(key);
    if (key < node->key)
        node->left = insert(node->left, key);
    else if (key > node->key)
        node->right = insert(node->right, key);
    return node;
}

void inorder(struct Node* root) {
    if (root != NULL) {
        inorder(root->left);
        printf("%d ", root->key);
        inorder(root->right);
    }
}

int main() {
    struct Node* root = NULL;
    root = insert(root, 50);
    insert(root, 30);
    insert(root, 20);
    insert(root, 40);
    insert(root, 70);
    insert(root, 60);
    insert(root, 80);

    printf("Inorder traversal: ");
    inorder(root);
    printf("\\n");
    return 0;
}`,
    phpFileName: 'bst.php',
    phpCode: `<?php
/**
 * Binary Search Tree in PHP
 */
class BSTNode {
    public int $key;
    public ?BSTNode $left = null;
    public ?BSTNode $right = null;

    public function __construct(int $key) {
        $this->key = $key;
    }
}

class BST {
    public ?BSTNode $root = null;

    public function insert(int $key): void {
        $this->root = $this->insertRec($this->root, $key);
    }

    private function insertRec(?BSTNode $node, int $key): BSTNode {
        if ($node === null) return new BSTNode($key);
        if ($key < $node->key) {
            $node->left = $this->insertRec($node->left, $key);
        } else if ($key > $node->key) {
            $node->right = $this->insertRec($node->right, $key);
        }
        return $node;
    }

    public function inorder(?BSTNode $node): void {
        if ($node !== null) {
            $this->inorder($node->left);
            echo "{$node->key} ";
            $this->inorder($node->right);
        }
    }
}

$tree = new BST();
$tree->insert(50);
$tree->insert(30);
$tree->insert(70);
$tree->inorder($tree->root);
echo "\\n";
?>`,
    relatedAlgorithms: ['binary-search', 'heap-sort']
  },

  // ================= PATHFINDING & GRAPHS =================
  'dijkstra': {
    id: 'dijkstra',
    name: "Dijkstra's Algorithm",
    slug: 'dijkstra',
    category: 'Pathfinding',
    difficulty: 'Medium',
    timeComplexity: {
      best: 'O((V + E) log V)',
      average: 'O((V + E) log V)',
      worst: 'O(V²)'
    },
    spaceComplexity: 'O(V)',
    description: "An algorithm for finding the shortest paths between nodes in a graph with non-negative edge weights using a greedy min-priority queue strategy.",
    pseudocode: [
      { line: 1, text: 'procedure Dijkstra(Graph, source)' },
      { line: 2, text: '  dist[source] = 0; dist[all others] = infinity' },
      { line: 3, text: '  PQ.insert(source, 0)' },
      { line: 4, text: '  while PQ is not empty do' },
      { line: 5, text: '    u = PQ.extractMin()' },
      { line: 6, text: '    for each neighbor v of u do' },
      { line: 7, text: '      alt = dist[u] + weight(u, v)' },
      { line: 8, text: '      if alt < dist[v] then' },
      { line: 9, text: '        dist[v] = alt; prev[v] = u; PQ.decreaseKey(v, alt)' },
      { line: 10, text: '  return dist, prev' }
    ],
    theory: {
      what: "Dijkstra's algorithm finds the shortest path from a starting node to all other nodes in a weighted graph without negative weights. It greedily expands the node with lowest accumulated cost.",
      why: 'It forms the underlying routing logic of GPS mapping software, network packet protocols (OSPF), and game navigation.',
      analogy: 'Water flowing outwards from a spring along connected irrigation canals: the closest pools fill first.',
      how: [
        'Set distance of start node to 0, all others to infinity.',
        'Push start node into a min-priority queue.',
        'Extract node u with minimum distance.',
        'For each neighbor v, relax edge: if dist[u] + weight(u, v) < dist[v], update dist[v] and push to PQ.',
        'Repeat until destination reached or PQ is empty.'
      ],
      pros: ['Guaranteed to find the globally optimal shortest path', 'Fast with binary heap priority queue'],
      cons: ['Fails on graphs with negative edge weights (Bellman-Ford needed)', 'Explores in all directions unless guided by a heuristic (A*)'],
      whenToUse: 'Road maps, flight path navigation, shortest hops with positive weights.',
      whenNotToUse: 'Graphs with negative edge weights.'
    },
    cFileName: 'dijkstra.c',
    cCode: `/**
 * Dijkstra's Shortest Path Algorithm in C (Matrix representation)
 */
#include <stdio.h>
#include <stdbool.h>
#include <limits.h>

#define V 5

int minDistance(int dist[], bool sptSet[]) {
    int min = INT_MAX, min_index = -1;
    for (int v = 0; v < V; v++)
        if (!sptSet[v] && dist[v] <= min) {
            min = dist[v];
            min_index = v;
        }
    return min_index;
}

void dijkstra(int graph[V][V], int src) {
    int dist[V];
    bool sptSet[V];

    for (int i = 0; i < V; i++) {
        dist[i] = INT_MAX;
        sptSet[i] = false;
    }
    dist[src] = 0;

    for (int count = 0; count < V - 1; count++) {
        int u = minDistance(dist, sptSet);
        if (u == -1) break;
        sptSet[u] = true;

        for (int v = 0; v < V; v++)
            if (!sptSet[v] && graph[u][v] && dist[u] != INT_MAX
                && dist[u] + graph[u][v] < dist[v])
                dist[v] = dist[u] + graph[u][v];
    }

    printf("Vertex \\t Distance from Source\\n");
    for (int i = 0; i < V; i++)
        printf("%d \\t %d\\n", i, dist[i]);
}

int main() {
    int graph[V][V] = {
        {0, 4, 0, 0, 8},
        {4, 0, 8, 0, 0},
        {0, 8, 0, 7, 0},
        {0, 0, 7, 0, 9},
        {8, 0, 0, 9, 0}
    };
    dijkstra(graph, 0);
    return 0;
}`,
    phpFileName: 'dijkstra.php',
    phpCode: `<?php
/**
 * Dijkstra's Algorithm in PHP
 */
function dijkstra(array $graph, int $src): array {
    $V = count($graph);
    $dist = array_fill(0, $V, INF);
    $visited = array_fill(0, $V, false);

    $dist[$src] = 0;

    for ($count = 0; $count < $V - 1; $count++) {
        $min = INF;
        $u = -1;

        for ($v = 0; $v < $V; $v++) {
            if (!$visited[$v] && $dist[$v] <= $min) {
                $min = $dist[$v];
                $u = $v;
            }
        }

        if ($u === -1) break;
        $visited[$u] = true;

        for ($v = 0; $v < $V; $v++) {
            if (!$visited[$v] && $graph[$u][$v] > 0 && $dist[$u] !== INF
                && $dist[$u] + $graph[$u][$v] < $dist[$v]) {
                $dist[$v] = $dist[$u] + $graph[$u][$v];
            }
        }
    }

    return $dist;
}

$graph = [
    [0, 4, 0, 0, 8],
    [4, 0, 8, 0, 0],
    [0, 8, 0, 7, 0],
    [0, 0, 7, 0, 9],
    [8, 0, 0, 9, 0]
];
$distances = dijkstra($graph, 0);
print_r($distances);
?>`,
    relatedAlgorithms: ['bfs', 'a-star']
  },

  'a-star': {
    id: 'a-star',
    name: 'A* Search Algorithm',
    slug: 'a-star',
    category: 'Pathfinding',
    difficulty: 'Hard',
    timeComplexity: {
      best: 'O(E)',
      average: 'O(E log V)',
      worst: 'O(b^d)'
    },
    spaceComplexity: 'O(V)',
    description: 'An informed best-first search algorithm that finds the shortest path between nodes using an evaluation function f(n) = g(n) + h(n) combining actual distance and heuristic estimation.',
    pseudocode: [
      { line: 1, text: 'procedure A_Star(start, goal, heuristic)' },
      { line: 2, text: '  openSet = PriorityQueue(); openSet.add(start, f=h(start))' },
      { line: 3, text: '  gScore[start] = 0' },
      { line: 4, text: '  while openSet is not empty do' },
      { line: 5, text: '    current = openSet.extractMin()' },
      { line: 6, text: '    if current == goal then return reconstructPath(cameFrom, current)' },
      { line: 7, text: '    for each neighbor of current do' },
      { line: 8, text: '      tentative_g = gScore[current] + dist(current, neighbor)' },
      { line: 9, text: '      if tentative_g < gScore[neighbor] then' },
      { line: 10, text: '        cameFrom[neighbor] = current' },
      { line: 11, text: '        gScore[neighbor] = tentative_g' },
      { line: 12, text: '        fScore[neighbor] = tentative_g + heuristic(neighbor, goal)' },
      { line: 13, text: '        openSet.add(neighbor, fScore[neighbor])' }
    ],
    theory: {
      what: 'A* combines Dijkstra (which prioritizes nodes closest to start, g(n)) with Greedy Best-First Search (which prioritizes nodes closest to target, h(n)). The sum f(n) = g(n) + h(n) directs the search beam toward the destination.',
      why: 'It explores drastically fewer nodes than Dijkstra while still guaranteeing an optimal shortest path, provided the heuristic is admissible (never overestimates).',
      analogy: 'Walking through a maze with a compass pointing directly at the exit.',
      how: [
        'Compute g(n): exact cost from start to current node.',
        'Compute h(n): Manhattan or Euclidean distance from current node to target.',
        'Total f(n) = g(n) + h(n).',
        'Always expand the node in the open set with lowest f(n).'
      ],
      pros: ['Guaranteed optimal if heuristic is admissible', 'Dramatically faster than Dijkstra on 2D grids and games'],
      cons: ['High memory requirements to store open and closed sets in memory'],
      whenToUse: 'Video games, robotics navigation, 2D grid pathfinding.',
      whenNotToUse: 'Unknown heuristic spaces where calculating distance is impossible.'
    },
    cFileName: 'a_star.c',
    cCode: `/**
 * A* Pathfinding in C (Simplified 2D Grid)
 */
#include <stdio.h>
#include <stdlib.h>
#include <math.h>

int manhattanDistance(int x1, int y1, int x2, int y2) {
    return abs(x1 - x2) + abs(y1 - y2);
}

int main() {
    int startX = 0, startY = 0;
    int goalX = 9, goalY = 9;

    printf("A* Heuristic (Manhattan) from (%d,%d) to (%d,%d): %d\\n",
           startX, startY, goalX, goalY,
           manhattanDistance(startX, startY, goalX, goalY));
    return 0;
}`,
    phpFileName: 'a_star.php',
    phpCode: `<?php
/**
 * A* Search in PHP (Heuristic Demonstration)
 */
function manhattanDistance(int $x1, int $y1, int $x2, int $y2): int {
    return abs($x1 - $x2) + abs($y1 - $y2);
}

$startX = 0; $startY = 0;
$goalX = 9; $goalY = 9;
echo "Manhattan Heuristic: " . manhattanDistance($startX, $startY, $goalX, $goalY) . "\\n";
?>`,
    relatedAlgorithms: ['dijkstra', 'bfs']
  },

  // ================= BACKTRACKING & RECURSION =================
  'n-queens': {
    id: 'n-queens',
    name: 'N-Queens Problem',
    slug: 'n-queens',
    category: 'Backtracking',
    difficulty: 'Hard',
    timeComplexity: {
      best: 'O(N!)',
      average: 'O(N!)',
      worst: 'O(N!)'
    },
    spaceComplexity: 'O(N)',
    description: 'The challenge of placing N non-attacking chess queens on an N×N chessboard so that no two queens threaten each other.',
    pseudocode: [
      { line: 1, text: 'procedure solveNQueens(board, col)' },
      { line: 2, text: '  if col >= N then return true  // All queens placed' },
      { line: 3, text: '  for row = 0 to N-1 do' },
      { line: 4, text: '    if isSafe(board, row, col) then' },
      { line: 5, text: '      placeQueen(board, row, col)' },
      { line: 6, text: '      if solveNQueens(board, col + 1) == true then return true' },
      { line: 7, text: '      removeQueen(board, row, col)  // Backtrack' },
      { line: 8, text: '  return false' }
    ],
    theory: {
      what: 'N-Queens is the quintessential example of Backtracking. A queen attacks horizontally, vertically, and diagonally. We try placing queens column by column. If a conflict arises where no row in a column is safe, we backtrack to the previous column and try a different row.',
      why: 'Demonstrates depth-first state-space tree traversal and constraint satisfaction.',
      analogy: 'Solving a maze: you walk forward until you hit a dead end, then step backwards to the last fork in the road and try the alternate path.',
      how: [
        'Start in the leftmost column.',
        'Try placing a queen in row 0 of that column.',
        'Check safety: ensure no existing queen is on same row or diagonal.',
        'If safe, advance to next column recursively.',
        'If no row is safe in current column, remove previously placed queen (backtrack) and move it down.'
      ],
      pros: ['Systematically tests all potential valid permutations without testing impossible subtrees'],
      cons: ['Exponential worst-case complexity O(N!)'],
      whenToUse: 'Constraint satisfaction, puzzle solving (Sudoku), circuit layout.',
      whenNotToUse: 'When N is huge (e.g. N > 30) without advanced heuristics.'
    },
    cFileName: 'n_queens.c',
    cCode: `/**
 * N-Queens Problem in C (Backtracking)
 */
#include <stdio.h>
#include <stdbool.h>

#define N 4

void printSolution(int board[N][N]) {
    for (int i = 0; i < N; i++) {
        for (int j = 0; j < N; j++)
            printf(" %c ", board[i][j] ? 'Q' : '.');
        printf("\\n");
    }
}

bool isSafe(int board[N][N], int row, int col) {
    int i, j;
    // Check left row
    for (i = 0; i < col; i++)
        if (board[row][i]) return false;

    // Check upper left diagonal
    for (i = row, j = col; i >= 0 && j >= 0; i--, j--)
        if (board[i][j]) return false;

    // Check lower left diagonal
    for (i = row, j = col; j >= 0 && i < N; i++, j--)
        if (board[i][j]) return false;

    return true;
}

bool solveNQUtil(int board[N][N], int col) {
    if (col >= N) return true;

    for (int i = 0; i < N; i++) {
        if (isSafe(board, i, col)) {
            board[i][col] = 1;
            if (solveNQUtil(board, col + 1)) return true;
            board[i][col] = 0; // BACKTRACK
        }
    }
    return false;
}

int main() {
    int board[N][N] = {0};
    if (solveNQUtil(board, 0))
        printSolution(board);
    else
        printf("Solution does not exist\\n");
    return 0;
}`,
    phpFileName: 'n_queens.php',
    phpCode: `<?php
/**
 * N-Queens in PHP
 */
function isSafe(array $board, int $row, int $col, int $n): bool {
    for ($i = 0; $i < $col; $i++) {
        if ($board[$row][$i]) return false;
    }
    for ($i = $row, $j = $col; $i >= 0 && $j >= 0; $i--, $j--) {
        if ($board[$i][$j]) return false;
    }
    for ($i = $row, $j = $col; $j >= 0 && $i < $n; $i++, $j--) {
        if ($board[$i][$j]) return false;
    }
    return true;
}

function solveNQ(array &$board, int $col, int $n): bool {
    if ($col >= $n) return true;
    for ($i = 0; $i < $n; $i++) {
        if (isSafe($board, $i, $col, $n)) {
            $board[$i][$col] = 1;
            if (solveNQ($board, $col + 1, $n)) return true;
            $board[$i][$col] = 0; // Backtrack
        }
    }
    return false;
}

$n = 4;
$board = array_fill(0, $n, array_fill(0, $n, 0));
if (solveNQ($board, 0, $n)) {
    foreach ($board as $row) {
        echo implode(" ", array_map(fn($v) => $v ? 'Q' : '.', $row)) . "\\n";
    }
}
?>`,
    relatedAlgorithms: ['dijkstra', 'binary-search-tree']
  },

  // ================= DYNAMIC PROGRAMMING =================
  'knapsack': {
    id: 'knapsack',
    name: '0/1 Knapsack Problem',
    slug: 'knapsack',
    category: 'Dynamic Programming',
    difficulty: 'Medium',
    timeComplexity: {
      best: 'O(N * W)',
      average: 'O(N * W)',
      worst: 'O(N * W)'
    },
    spaceComplexity: 'O(N * W)',
    description: 'Given items with weights and values, determine the maximum value that can be packed into a knapsack of capacity W without exceeding the weight limit.',
    pseudocode: [
      { line: 1, text: 'procedure knapsack(W, wt[], val[], n)' },
      { line: 2, text: '  for i = 0 to n do' },
      { line: 3, text: '    for w = 0 to W do' },
      { line: 4, text: '      if i == 0 or w == 0 then dp[i][w] = 0' },
      { line: 5, text: '      else if wt[i-1] <= w then' },
      { line: 6, text: '        dp[i][w] = max(val[i-1] + dp[i-1][w - wt[i-1]], dp[i-1][w])' },
      { line: 7, text: '      else dp[i][w] = dp[i-1][w]' },
      { line: 8, text: '  return dp[n][W]' }
    ],
    theory: {
      what: 'In the 0/1 Knapsack problem, you either take an item (1) or leave it (0). Using a 2D dynamic programming grid, we compute the optimal solution for all capacities from 0 to W.',
      why: 'Demonstrates the power of memoization and overlapping subproblems: converting an exponential 2^N brute force search into pseudo-polynomial O(N * W).',
      analogy: 'Packing a backpack for a hike with a maximum weight limit: you select high-value lightweight gear over heavy, low-value items.',
      how: [
        'Create a table dp[n + 1][W + 1].',
        'Row i represents considering the first i items; column w represents current capacity.',
        'If item i weighs more than w, it cannot fit: take value from row above dp[i - 1][w].',
        'Otherwise, choose the maximum between: 1) excluding item (dp[i-1][w]), or 2) including item (val[i-1] + dp[i-1][w - weight[i-1]]).'
      ],
      pros: ['Solves the optimal subset problem in O(N * W) instead of 2^N'],
      cons: ['Pseudo-polynomial: if W is astronomical, table size explodes'],
      whenToUse: 'Resource allocation, portfolio selection, budget optimization.',
      whenNotToUse: 'When weights are fractional (Fractional Knapsack solved greedily in O(N log N)).'
    },
    cFileName: 'knapsack.c',
    cCode: `/**
 * 0/1 Knapsack Problem in C
 * Time Complexity: O(N * W)
 * Space Complexity: O(N * W)
 */
#include <stdio.h>

int max(int a, int b) { return (a > b) ? a : b; }

int knapSack(int W, int wt[], int val[], int n) {
    int dp[n + 1][W + 1];

    for (int i = 0; i <= n; i++) {
        for (int w = 0; w <= W; w++) {
            if (i == 0 || w == 0)
                dp[i][w] = 0;
            else if (wt[i - 1] <= w)
                dp[i][w] = max(val[i - 1] + dp[i - 1][w - wt[i - 1]], dp[i - 1][w]);
            else
                dp[i][w] = dp[i - 1][w];
        }
    }
    return dp[n][W];
}

int main() {
    int val[] = {60, 100, 120};
    int wt[] = {10, 20, 30};
    int W = 50;
    int n = sizeof(val) / sizeof(val[0]);
    printf("Maximum value in Knapsack = %d\\n", knapSack(W, wt, val, n));
    return 0;
}`,
    phpFileName: 'knapsack.php',
    phpCode: `<?php
/**
 * 0/1 Knapsack in PHP
 */
function knapSack(int $W, array $wt, array $val, int $n): int {
    $dp = array_fill(0, $n + 1, array_fill(0, $W + 1, 0));

    for ($i = 0; $i <= $n; $i++) {
        for ($w = 0; $w <= $W; $w++) {
            if ($i == 0 || $w == 0) {
                $dp[$i][$w] = 0;
            } elseif ($wt[$i - 1] <= $w) {
                $dp[$i][$w] = max($val[$i - 1] + $dp[$i - 1][$w - $wt[$i - 1]], $dp[$i - 1][$w]);
            } else {
                $dp[$i][$w] = $dp[$i - 1][$w];
            }
        }
    }

    return $dp[$n][$W];
}

$val = [60, 100, 120];
$wt = [10, 20, 30];
$W = 50;
echo "Maximum value: " . knapSack($W, $wt, $val, count($val)) . "\\n";
?>`,
    relatedAlgorithms: ['n-queens', 'dijkstra']
  }
};

export const ALGORITHM_CATEGORIES = [
  { name: 'Sorting', icon: 'BarChartIcon', count: 6, path: '/sorting', desc: 'Bubble, Selection, Insertion, Merge, Quick, Heap' },
  { name: 'Searching', icon: 'SearchIcon', count: 2, path: '/searching', desc: 'Linear Search, Binary Search' },
  { name: 'Data Structures', icon: 'LayersIcon', count: 6, path: '/data-structures', desc: 'Array, Linked List, Stack, Queue, BST, Heap' },
  { name: 'Pathfinding', icon: 'GridIcon', count: 5, path: '/pathfinding', desc: 'Dijkstra, A*, BFS, DFS, Mazes' },
  { name: 'Graph Algorithms', icon: 'GitBranchIcon', count: 5, path: '/graph', desc: 'BFS, DFS, Dijkstra, Prim, Kruskal' },
  { name: 'Recursion & Backtracking', icon: 'ZapIcon', count: 2, path: '/recursion', desc: 'N-Queens, Call Stack' },
  { name: 'Dynamic Programming', icon: 'CpuIcon', count: 2, path: '/dynamic-programming', desc: '0/1 Knapsack, Subproblems' },
  { name: 'Comparison Arena', icon: 'BarChartIcon', count: 1, path: '/compare', desc: 'Side-by-side multi-algorithm race' },
  { name: 'Complexity Guide', icon: 'SparklesIcon', count: 1, path: '/complexity', desc: 'Interactive Big-O growth curves' },
];

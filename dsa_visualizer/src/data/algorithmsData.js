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

    printf("Original array:\\n");
    printArray(arr, n);

    bubbleSort(arr, n);

    printf("Sorted array:\\n");
    printArray(arr, n);
    return 0;
}`,
    pythonFileName: 'bubble_sort.py',
    pythonCode: `"""
Bubble Sort in Python
Time Complexity: O(n) Best, O(n^2) Average/Worst
Space Complexity: O(1)
"""
from typing import List

def bubble_sort(arr: List[int]) -> List[int]:
    n = len(arr)
    for i in range(n - 1):
        swapped = False
        for j in range(n - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
                swapped = True
        # Early break if no swaps occurred (already sorted)
        if not swapped:
            break
    return arr

if __name__ == "__main__":
    test_array = [64, 34, 25, 12, 22, 11, 90]
    print("Original array:", test_array)
    sorted_array = bubble_sort(test_array)
    print("Sorted array:  ", sorted_array)
`,
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
      why: 'It minimizes the total number of swaps (at most O(n) swaps total), which can be advantageous when write operations are significantly more expensive than read operations.',
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
        'Performs at most n - 1 swaps total, minimizing memory writes.',
        'Consistent predictable performance.'
      ],
      cons: [
        'Always takes O(n²) comparisons even if the list is already sorted.',
        'Not a stable sort by default.'
      ],
      whenToUse: 'Small lists where memory writes are costly.',
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

int main() {
    int arr[] = {64, 25, 12, 22, 11};
    int n = sizeof(arr) / sizeof(arr[0]);
    selectionSort(arr, n);
    for (int i = 0; i < n; i++) printf("%d ", arr[i]);
    printf("\\n");
    return 0;
}`,
    pythonFileName: 'selection_sort.py',
    pythonCode: `"""
Selection Sort in Python
Time Complexity: O(n^2) Best, Average, Worst
Space Complexity: O(1)
"""
from typing import List

def selection_sort(arr: List[int]) -> List[int]:
    n = len(arr)
    for i in range(n - 1):
        min_idx = i
        for j in range(i + 1, n):
            if arr[j] < arr[min_idx]:
                min_idx = j
        if min_idx != i:
            arr[i], arr[min_idx] = arr[min_idx], arr[i]
    return arr

if __name__ == "__main__":
    data = [64, 25, 12, 22, 11]
    print("Original:", data)
    print("Sorted:  ", selection_sort(data))
`,
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
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j = j - 1;
        }
        arr[j + 1] = key;
    }
}

int main() {
    int arr[] = {12, 11, 13, 5, 6};
    int n = sizeof(arr) / sizeof(arr[0]);
    insertionSort(arr, n);
    for (int i = 0; i < n; i++) printf("%d ", arr[i]);
    printf("\\n");
    return 0;
}`,
    pythonFileName: 'insertion_sort.py',
    pythonCode: `"""
Insertion Sort in Python
Time Complexity: O(n) Best, O(n^2) Average/Worst
Space Complexity: O(1)
"""
from typing import List

def insertion_sort(arr: List[int]) -> List[int]:
    for i in range(1, len(arr)):
        key = arr[i]
        j = i - 1
        while j >= 0 and arr[j] > key:
            arr[j + 1] = arr[j]
            j -= 1
        arr[j + 1] = key
    return arr

if __name__ == "__main__":
    cards = [12, 11, 13, 5, 6]
    print("Original:", cards)
    print("Sorted:  ", insertion_sort(cards))
`,
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

    for (i = 0; i < n1; i++) L[i] = arr[l + i];
    for (j = 0; j < n2; j++) R[j] = arr[m + 1 + j];

    i = 0; j = 0; k = l;
    while (i < n1 && j < n2) {
        if (L[i] <= R[j]) arr[k++] = L[i++];
        else arr[k++] = R[j++];
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

int main() {
    int arr[] = {12, 11, 13, 5, 6, 7};
    int n = sizeof(arr) / sizeof(arr[0]);
    mergeSort(arr, 0, n - 1);
    for (int i = 0; i < n; i++) printf("%d ", arr[i]);
    printf("\\n");
    return 0;
}`,
    pythonFileName: 'merge_sort.py',
    pythonCode: `"""
Merge Sort in Python
Time Complexity: O(n log n) Best, Average, Worst
Space Complexity: O(n)
"""
from typing import List

def merge_sort(arr: List[int]) -> List[int]:
    if len(arr) <= 1:
        return arr

    mid = len(arr) // 2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])

    return merge(left, right)

def merge(left: List[int], right: List[int]) -> List[int]:
    result = []
    i = j = 0

    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            result.append(left[i])
            i += 1
        else:
            result.append(right[j])
            j += 1

    result.extend(left[i:])
    result.extend(right[j:])
    return result

if __name__ == "__main__":
    nums = [12, 11, 13, 5, 6, 7]
    print("Original:", nums)
    print("Sorted:  ", merge_sort(nums))
`,
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
      { line: 7, text: 'end procedure' }
    ],
    theory: {
      what: 'Quick Sort chooses a pivot element and reorders the array so that all values smaller than the pivot appear before it and all values greater appear after it.',
      why: 'In practice, Quick Sort is often 2x to 3x faster than Merge Sort and Heap Sort because of superior cache locality and minimal memory overhead.',
      analogy: 'Organizing students by height around a chosen student: everyone shorter moves to the left, everyone taller moves to the right.',
      how: [
        'Select a pivot element.',
        'Partition: rearrange items so items <= pivot are on left and items > pivot are on right.',
        'Place the pivot at the boundary index p.',
        'Recursively apply Quick Sort to left and right partitions.'
      ],
      pros: [
        'Extremely fast in practice with low overhead and great cache behavior.',
        'In-place sorting with O(log n) call stack space.',
        'Widely used in standard libraries.'
      ],
      cons: [
        'O(n²) worst-case when bad pivots are chosen.',
        'Not a stable sort by default.'
      ],
      whenToUse: 'General-purpose in-memory sorting of large datasets where speed is paramount.',
      whenNotToUse: 'When stability is mandatory or recursion stack space is constrained.'
    },
    cFileName: 'quick_sort.c',
    cCode: `/**
 * Quick Sort in C
 */
#include <stdio.h>

void swap(int* a, int* b) {
    int t = *a;
    *a = *b;
    *b = t;
}

int partition(int arr[], int low, int high) {
    int pivot = arr[high];
    int i = (low - 1);

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

int main() {
    int arr[] = {10, 7, 8, 9, 1, 5};
    int n = sizeof(arr) / sizeof(arr[0]);
    quickSort(arr, 0, n - 1);
    for (int i = 0; i < n; i++) printf("%d ", arr[i]);
    printf("\\n");
    return 0;
}`,
    pythonFileName: 'quick_sort.py',
    pythonCode: `"""
Quick Sort in Python (In-Place Lomuto Partition)
Time Complexity: O(n log n) Best/Average, O(n^2) Worst
Space Complexity: O(log n) Call Stack
"""
from typing import List

def quick_sort(arr: List[int], low: int = 0, high: int = None) -> List[int]:
    if high is None:
        high = len(arr) - 1

    if low < high:
        pi = partition(arr, low, high)
        quick_sort(arr, low, pi - 1)
        quick_sort(arr, pi + 1, high)
    return arr

def partition(arr: List[int], low: int, high: int) -> int:
    pivot = arr[high]
    i = low - 1
    for j in range(low, high):
        if arr[j] < pivot:
            i += 1
            arr[i], arr[j] = arr[j], arr[i]
    arr[i + 1], arr[high] = arr[high], arr[i + 1]
    return i + 1

if __name__ == "__main__":
    nums = [10, 7, 8, 9, 1, 5]
    print("Original:", nums)
    print("Sorted:  ", quick_sort(nums))
`,
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
        'Poorer cache locality than Quick Sort due to jumping across array indices.',
        'Not a stable sort.'
      ],
      whenToUse: 'Embedded systems or mission-critical real-time environments where guaranteed worst-case bounds and minimal memory are strictly required.',
      whenNotToUse: 'When stable sorting is required or when maximum cache speed is needed.'
    },
    cFileName: 'heap_sort.c',
    cCode: `/**
 * Heap Sort in C
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

    if (left < n && arr[left] > arr[largest]) largest = left;
    if (right < n && arr[right] > arr[largest]) largest = right;

    if (largest != i) {
        swap(&arr[i], &arr[largest]);
        heapify(arr, n, largest);
    }
}

void heapSort(int arr[], int n) {
    for (int i = n / 2 - 1; i >= 0; i--) heapify(arr, n, i);
    for (int i = n - 1; i > 0; i--) {
        swap(&arr[0], &arr[i]);
        heapify(arr, i, 0);
    }
}

int main() {
    int arr[] = {12, 11, 13, 5, 6, 7};
    int n = sizeof(arr) / sizeof(arr[0]);
    heapSort(arr, n);
    for (int i = 0; i < n; i++) printf("%d ", arr[i]);
    printf("\\n");
    return 0;
}`,
    pythonFileName: 'heap_sort.py',
    pythonCode: `"""
Heap Sort in Python
Time Complexity: O(n log n) Best, Average, Worst
Space Complexity: O(1) In-Place
"""
from typing import List

def heapify(arr: List[int], n: int, i: int) -> None:
    largest = i
    left = 2 * i + 1
    right = 2 * i + 2

    if left < n and arr[left] > arr[largest]:
        largest = left
    if right < n and arr[right] > arr[largest]:
        largest = right

    if largest != i:
        arr[i], arr[largest] = arr[largest], arr[i]
        heapify(arr, n, largest)

def heap_sort(arr: List[int]) -> List[int]:
    n = len(arr)
    # Build max heap
    for i in range(n // 2 - 1, -1, -1):
        heapify(arr, n, i)

    # Extract elements one by one
    for i in range(n - 1, 0, -1):
        arr[0], arr[i] = arr[i], arr[0]
        heapify(arr, i, 0)
    return arr

if __name__ == "__main__":
    nums = [12, 11, 13, 5, 6, 7]
    print("Original:", nums)
    print("Sorted:  ", heap_sort(nums))
`,
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
      what: 'Linear Search scans through an array sequentially, comparing each element to the target value.',
      why: 'Requires zero preprocessing and works on unordered, unsorted lists of any data type.',
      analogy: 'Searching for a lost key by checking every room in the house one after another until you find it.',
      how: [
        'Start at index 0.',
        'Compare the current element arr[i] with target.',
        'If equal, return index i immediately.',
        'If not equal, advance to index i + 1.',
        'If reached end of array without finding target, return -1.'
      ],
      pros: ['Works on unsorted arrays and linked lists', 'O(1) best-case time', 'No extra memory'],
      cons: ['O(n) time is slow for large collections compared to Binary Search'],
      whenToUse: 'Small lists or unsorted collections where sorting beforehand is not cost-effective.',
      whenNotToUse: 'Large collections that are searched repeatedly.'
    },
    cFileName: 'linear_search.c',
    cCode: `/**
 * Linear Search in C
 */
#include <stdio.h>

int linearSearch(int arr[], int n, int target) {
    for (int i = 0; i < n; i++) {
        if (arr[i] == target) return i;
    }
    return -1;
}

int main() {
    int arr[] = {2, 3, 4, 10, 40};
    int n = sizeof(arr) / sizeof(arr[0]);
    int target = 10;
    int res = linearSearch(arr, n, target);
    printf("Target %d at index: %d\\n", target, res);
    return 0;
}`,
    pythonFileName: 'linear_search.py',
    pythonCode: `"""
Linear Search in Python
Time Complexity: O(1) Best, O(n) Average/Worst
Space Complexity: O(1)
"""
from typing import List

def linear_search(arr: List[int], target: int) -> int:
    for idx, val in enumerate(arr):
        if val == target:
            return idx  # Target found
    return -1          # Target not found

if __name__ == "__main__":
    nums = [2, 3, 4, 10, 40]
    target = 10
    result = linear_search(nums, target)
    print(f"Target {target} found at index: {result}")
`,
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
      what: 'Binary Search works on sorted arrays by repeatedly comparing the target to the middle element and halving the remaining search space.',
      why: 'Reduces 1,000,000,000 elements to ~30 comparisons because log2(10^9) ≈ 30.',
      analogy: 'Looking up a word in a dictionary: open to the middle, determine if the word is before or after, and discard the other half.',
      how: [
        'Initialize low = 0 and high = n - 1.',
        'Calculate mid = (low + high) // 2.',
        'If arr[mid] == target, return mid.',
        'If arr[mid] < target, search right: low = mid + 1.',
        'If arr[mid] > target, search left: high = mid - 1.'
      ],
      pros: ['Logarithmic O(log n) speed', 'O(1) memory space'],
      cons: ['Requires pre-sorted data', 'Requires random access (not ideal for linked lists)'],
      whenToUse: 'Searching large sorted collections and database indices.',
      whenNotToUse: 'Unsorted data with single queries.'
    },
    cFileName: 'binary_search.c',
    cCode: `/**
 * Binary Search in C (Iterative)
 */
#include <stdio.h>

int binarySearch(int arr[], int l, int r, int target) {
    while (l <= r) {
        int m = l + (r - l) / 2;
        if (arr[m] == target) return m;
        if (arr[m] < target) l = m + 1;
        else r = m - 1;
    }
    return -1;
}

int main() {
    int arr[] = {2, 3, 4, 10, 40};
    int n = sizeof(arr) / sizeof(arr[0]);
    int target = 10;
    int res = binarySearch(arr, 0, n - 1, target);
    printf("Target %d at index: %d\\n", target, res);
    return 0;
}`,
    pythonFileName: 'binary_search.py',
    pythonCode: `"""
Binary Search in Python (Iterative)
Time Complexity: O(1) Best, O(log n) Average/Worst
Space Complexity: O(1)
"""
from typing import List

def binary_search(arr: List[int], target: int) -> int:
    low = 0
    high = len(arr) - 1

    while low <= high:
        mid = (low + high) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            low = mid + 1
        else:
            high = mid - 1

    return -1  # Target not found

if __name__ == "__main__":
    sorted_numbers = [2, 3, 4, 10, 40, 55, 68, 72, 90]
    target = 10
    result = binary_search(sorted_numbers, target)
    print(f"Target {target} found at index: {result}")
`,
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
      what: 'An array stores elements of identical type in consecutive memory addresses.',
      why: 'Provides blazing fast index-based random access and ideal CPU cache locality.',
      analogy: 'Numbered lockers in a row: knowing the locker number lets you walk straight to it immediately.',
      how: [
        'Access: direct memory jump via index.',
        'Insertion at index k: shift elements from k to end one step right, then write new value.',
        'Deletion at index k: shift elements from k + 1 to end one step left.'
      ],
      pros: ['O(1) random access', 'Compact memory footprint', 'Excellent cache locality'],
      cons: ['Fixed size in static languages', 'Expensive insertions and deletions (O(n) shifting)'],
      whenToUse: 'When random indexing is frequent.',
      whenNotToUse: 'When frequent insertions and deletions at arbitrary positions are needed.'
    },
    cFileName: 'array_operations.c',
    cCode: `/**
 * Array Operations in C
 */
#include <stdio.h>

void insertAt(int arr[], int *n, int capacity, int index, int val) {
    if (*n >= capacity || index < 0 || index > *n) return;
    for (int i = *n; i > index; i--) arr[i] = arr[i - 1];
    arr[index] = val;
    (*n)++;
}

int main() {
    int arr[10] = {10, 20, 30, 40, 50};
    int n = 5;
    insertAt(arr, &n, 10, 2, 99);
    for (int i = 0; i < n; i++) printf("%d ", arr[i]);
    printf("\\n");
    return 0;
}`,
    pythonFileName: 'array_operations.py',
    pythonCode: `"""
Array Operations in Python (Insert, Delete, Search)
"""
def demonstrate_array():
    # Initial array
    arr = [10, 20, 30, 40, 50]
    print("Initial:", arr)

    # Insert 99 at index 2 (O(n) shift)
    arr.insert(2, 99)
    print("After Insert at index 2:", arr)

    # Delete element at index 0 (O(n) shift)
    deleted = arr.pop(0)
    print(f"After Popping index 0 ({deleted}):", arr)

    # Search for value 40 (O(n) lookup)
    found_idx = arr.index(40) if 40 in arr else -1
    print(f"Index of value 40:", found_idx)

if __name__ == "__main__":
    demonstrate_array()
`,
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
      what: 'A Linked List consists of separate memory nodes linked by pointers.',
      why: 'Permits constant-time O(1) insertions and deletions at known pointers without shifting subsequent elements.',
      analogy: 'A treasure hunt where each clue tells you where to find the next clue in the game.',
      how: [
        'Insert at Head: create node, set node.next = head, point head to node.',
        'Insert at Tail: traverse to last node, set lastNode.next = node.',
        'Delete Node: redirect predecessor\'s next pointer to node.next.'
      ],
      pros: ['Dynamic size', 'O(1) insertion/deletion at head/known node', 'No memory reallocation surges'],
      cons: ['O(n) access time', 'Extra memory overhead for pointer storage', 'Poor cache locality'],
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

int main() {
    struct Node* head = NULL;
    insertHead(&head, 30);
    insertHead(&head, 20);
    insertHead(&head, 10);
    return 0;
}`,
    pythonFileName: 'linked_list.py',
    pythonCode: `"""
Singly Linked List Implementation in Python
"""
from typing import Optional, Any

class Node:
    def __init__(self, data: Any):
        self.data = data
        self.next: Optional['Node'] = None

class LinkedList:
    def __init__(self):
        self.head: Optional[Node] = None

    def insert_head(self, data: Any) -> None:
        new_node = Node(data)
        new_node.next = self.head
        self.head = new_node

    def insert_tail(self, data: Any) -> None:
        new_node = Node(data)
        if not self.head:
            self.head = new_node
            return
        curr = self.head
        while curr.next:
            curr = curr.next
        curr.next = new_node

    def display(self) -> str:
        elements = []
        curr = self.head
        while curr:
            elements.append(str(curr.data))
            curr = curr.next
        return " -> ".join(elements) + " -> NULL"

if __name__ == "__main__":
    ll = LinkedList()
    ll.insert_head(30)
    ll.insert_head(20)
    ll.insert_head(10)
    ll.insert_tail(40)
    print("Linked List:", ll.display())
`,
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
 * Stack implementation in C
 */
#include <stdio.h>
#define MAX 100

struct Stack {
    int items[MAX];
    int top;
};

void push(struct Stack* s, int val) { s->items[++(s->top)] = val; }
int pop(struct Stack* s) { return s->items[(s->top)--]; }

int main() {
    struct Stack s;
    s.top = -1;
    push(&s, 10);
    push(&s, 20);
    printf("Popped: %d\\n", pop(&s));
    return 0;
}`,
    pythonFileName: 'stack.py',
    pythonCode: `"""
Stack Implementation in Python (LIFO - Last In, First Out)
"""
from typing import Any, Optional

class Stack:
    def __init__(self):
        self._items = []

    def push(self, item: Any) -> None:
        self._items.append(item)

    def pop(self) -> Optional[Any]:
        if not self.is_empty():
            return self._items.pop()
        raise IndexError("pop from empty stack")

    def peek(self) -> Optional[Any]:
        if not self.is_empty():
            return self._items[-1]
        return None

    def is_empty(self) -> bool:
        return len(self._items) == 0

    def size(self) -> int:
        return len(self._items)

if __name__ == "__main__":
    s = Stack()
    s.push(10)
    s.push(20)
    s.push(30)
    print("Top element:", s.peek())
    print("Popped:", s.pop())
    print("New top:", s.peek())
`,
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
#define SIZE 5

struct Queue {
    int items[SIZE];
    int front, rear;
};

int main() {
    printf("Queue initialized\\n");
    return 0;
}`,
    pythonFileName: 'queue.py',
    pythonCode: `"""
Queue Implementation in Python (FIFO - First In, First Out)
Using collections.deque for efficient O(1) pops and appends
"""
from collections import deque
from typing import Any, Optional

class Queue:
    def __init__(self):
        self._items = deque()

    def enqueue(self, val: Any) -> None:
        self._items.append(val)

    def dequeue(self) -> Optional[Any]:
        if not self.is_empty():
            return self._items.popleft()
        raise IndexError("dequeue from empty queue")

    def peek(self) -> Optional[Any]:
        if not self.is_empty():
            return self._items[0]
        return None

    def is_empty(self) -> bool:
        return len(self._items) == 0

if __name__ == "__main__":
    q = Queue()
    q.enqueue(10)
    q.enqueue(20)
    q.enqueue(30)
    print("Front:", q.peek())
    print("Dequeued:", q.dequeue())
    print("Next front:", q.peek())
`,
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
      cons: ['Can degrade to O(n) skewed linked list if inserted in sequential order'],
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
    if (key < node->key) node->left = insert(node->left, key);
    else if (key > node->key) node->right = insert(node->right, key);
    return node;
}

int main() {
    struct Node* root = NULL;
    root = insert(root, 50);
    insert(root, 30);
    insert(root, 70);
    return 0;
}`,
    pythonFileName: 'bst.py',
    pythonCode: `"""
Binary Search Tree (BST) in Python
"""
from typing import Optional, List

class BSTNode:
    def __init__(self, key: int):
        self.key = key
        self.left: Optional['BSTNode'] = None
        self.right: Optional['BSTNode'] = None

class BinarySearchTree:
    def __init__(self):
        self.root: Optional[BSTNode] = None

    def insert(self, key: int) -> None:
        self.root = self._insert_recursive(self.root, key)

    def _insert_recursive(self, node: Optional[BSTNode], key: int) -> BSTNode:
        if node is None:
            return BSTNode(key)
        if key < node.key:
            node.left = self._insert_recursive(node.left, key)
        elif key > node.key:
            node.right = self._insert_recursive(node.right, key)
        return node

    def inorder(self) -> List[int]:
        result = []
        def _traverse(node: Optional[BSTNode]):
            if node:
                _traverse(node.left)
                result.append(node.key)
                _traverse(node.right)
        _traverse(self.root)
        return result

if __name__ == "__main__":
    bst = BinarySearchTree()
    for val in [50, 30, 70, 20, 40, 60, 80]:
        bst.insert(val)
    print("Inorder (Sorted):", bst.inorder())
`,
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
      cons: ['Fails on graphs with negative edge weights', 'Explores in all directions unless guided by a heuristic (A*)'],
      whenToUse: 'Road maps, flight path navigation, shortest hops with positive weights.',
      whenNotToUse: 'Graphs with negative edge weights.'
    },
    cFileName: 'dijkstra.c',
    cCode: `/**
 * Dijkstra's Shortest Path Algorithm in C
 */
#include <stdio.h>
#include <stdbool.h>
#include <limits.h>

#define V 5

int main() {
    printf("Dijkstra in C\\n");
    return 0;
}`,
    pythonFileName: 'dijkstra.py',
    pythonCode: `"""
Dijkstra's Shortest Path Algorithm in Python
Using heapq for O((V + E) log V) optimal efficiency
"""
import heapq
from typing import Dict, List, Tuple

def dijkstra(graph: Dict[str, List[Tuple[str, int]]], start: str) -> Dict[str, int]:
    distances = {node: float('inf') for node in graph}
    distances[start] = 0

    # Priority queue stores (cost, node)
    pq = [(0, start)]

    while pq:
        curr_dist, curr_node = heapq.heappop(pq)

        if curr_dist > distances[curr_node]:
            continue

        for neighbor, weight in graph[curr_node]:
            distance = curr_dist + weight
            if distance < distances[neighbor]:
                distances[neighbor] = distance
                heapq.heappush(pq, (distance, neighbor))

    return distances

if __name__ == "__main__":
    graph = {
        'A': [('B', 4), ('C', 2)],
        'B': [('A', 4), ('C', 1), ('D', 5)],
        'C': [('A', 2), ('B', 1), ('D', 8), ('E', 10)],
        'D': [('B', 5), ('C', 8), ('E', 2)],
        'E': [('C', 10), ('D', 2)]
    }
    shortest_paths = dijkstra(graph, 'A')
    print("Shortest distances from Node A:", shortest_paths)
`,
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
      what: 'A* combines Dijkstra (actual cost g(n)) with Greedy Best-First Search (heuristic estimation h(n)) via f(n) = g(n) + h(n).',
      why: 'It explores drastically fewer nodes than Dijkstra while still guaranteeing an optimal shortest path.',
      analogy: 'Walking through a maze with a compass pointing directly at the exit.',
      how: [
        'Compute g(n): exact cost from start to current node.',
        'Compute h(n): Manhattan or Euclidean distance to target.',
        'Total f(n) = g(n) + h(n).',
        'Always expand the node with lowest f(n).'
      ],
      pros: ['Optimal if heuristic is admissible', 'Dramatically faster than Dijkstra on 2D grids'],
      cons: ['High memory requirements to store open and closed sets in memory'],
      whenToUse: 'Video games, robotics navigation, 2D grid pathfinding.',
      whenNotToUse: 'Unknown heuristic spaces where calculating distance is impossible.'
    },
    cFileName: 'a_star.c',
    cCode: `/**
 * A* Pathfinding in C
 */
#include <stdio.h>
#include <stdlib.h>

int manhattanDistance(int x1, int y1, int x2, int y2) {
    return abs(x1 - x2) + abs(y1 - y2);
}

int main() {
    printf("Manhattan: %d\\n", manhattanDistance(0, 0, 9, 9));
    return 0;
}`,
    pythonFileName: 'a_star.py',
    pythonCode: `"""
A* Search Algorithm in Python on a 2D Grid
"""
import heapq
from typing import Dict, List, Tuple

def manhattan(p1: Tuple[int, int], p2: Tuple[int, int]) -> int:
    return abs(p1[0] - p2[0]) + abs(p1[1] - p2[1])

def a_star(grid: List[List[int]], start: Tuple[int, int], goal: Tuple[int, int]) -> List[Tuple[int, int]]:
    rows, cols = len(grid), len(grid[0])
    open_set = []
    heapq.heappush(open_set, (0 + manhattan(start, goal), 0, start))

    came_from = {}
    g_score = {start: 0}

    while open_set:
        _, current_g, current = heapq.heappop(open_set)

        if current == goal:
            # Reconstruct path
            path = []
            while current in came_from:
                path.append(current)
                current = came_from[current]
            path.append(start)
            return path[::-1]

        r, c = current
        for dr, dc in [(-1, 0), (1, 0), (0, -1), (0, 1)]:
            nr, nc = r + dr, c + dc
            if 0 <= nr < rows and 0 <= nc < cols and grid[nr][nc] == 0:
                tentative_g = current_g + 1
                neighbor = (nr, nc)
                if tentative_g < g_score.get(neighbor, float('inf')):
                    came_from[neighbor] = current
                    g_score[neighbor] = tentative_g
                    f_score = tentative_g + manhattan(neighbor, goal)
                    heapq.heappush(open_set, (f_score, tentative_g, neighbor))

    return []

if __name__ == "__main__":
    grid = [
        [0, 0, 0, 0, 0],
        [0, 1, 1, 1, 0],
        [0, 0, 0, 0, 0],
        [0, 1, 1, 1, 0],
        [0, 0, 0, 0, 0]
    ]
    path = a_star(grid, (0, 0), (4, 4))
    print("Shortest A* Path:", path)
`,
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
      what: 'N-Queens places N non-attacking queens on an N×N chessboard using recursive depth-first backtracking.',
      why: 'Demonstrates state-space search and constraint satisfaction.',
      analogy: 'Solving a maze: you walk forward until hitting a dead end, then backtrack to the last branch and try the other way.',
      how: [
        'Start in the leftmost column.',
        'Try placing a queen in row 0 of that column.',
        'Check safety: ensure no existing queen is on same row or diagonal.',
        'If safe, advance to next column recursively.',
        'If no row is safe in current column, backtrack.'
      ],
      pros: ['Systematically tests all potential valid permutations without testing impossible subtrees'],
      cons: ['Exponential worst-case complexity O(N!)'],
      whenToUse: 'Constraint satisfaction, puzzle solving (Sudoku), circuit layout.',
      whenNotToUse: 'When N is huge without advanced heuristics.'
    },
    cFileName: 'n_queens.c',
    cCode: `/**
 * N-Queens in C
 */
#include <stdio.h>
#include <stdbool.h>
#define N 4

int main() {
    printf("N-Queens in C\\n");
    return 0;
}`,
    pythonFileName: 'n_queens.py',
    pythonCode: `"""
N-Queens Problem in Python (Backtracking)
"""
from typing import List

def solve_n_queens(n: int) -> List[List[str]]:
    solutions = []
    board = [['.'] * n for _ in range(n)]

    def is_safe(row: int, col: int) -> bool:
        # Check row on left
        for i in range(col):
            if board[row][i] == 'Q':
                return False
        # Check upper-left diagonal
        for i, j in zip(range(row, -1, -1), range(col, -1, -1)):
            if board[i][j] == 'Q':
                return False
        # Check lower-left diagonal
        for i, j in zip(range(row, n, 1), range(col, -1, -1)):
            if board[i][j] == 'Q':
                return False
        return True

    def backtrack(col: int) -> None:
        if col >= n:
            solutions.append(["".join(r) for r in board])
            return

        for row in range(n):
            if is_safe(row, col):
                board[row][col] = 'Q'
                backtrack(col + 1)
                board[row][col] = '.'  # BACKTRACK

    backtrack(0)
    return solutions

if __name__ == "__main__":
    n = 4
    solutions = solve_n_queens(n)
    print(f"Found {len(solutions)} solution(s) for N = {n}:")
    for row in solutions[0]:
        print(row)
`,
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
      why: 'Demonstrates the power of memoization: converting an exponential 2^N brute force search into pseudo-polynomial O(N * W).',
      analogy: 'Packing a backpack for a hike with a maximum weight limit: you select high-value lightweight gear over heavy, low-value items.',
      how: [
        'Create a table dp[n + 1][W + 1].',
        'Row i represents considering the first i items; column w represents current capacity.',
        'If item i weighs more than w, take value from row above dp[i - 1][w].',
        'Otherwise, choose the maximum between excluding or including the item.'
      ],
      pros: ['Solves optimal subset problem in O(N * W) instead of 2^N'],
      cons: ['Pseudo-polynomial: if W is astronomical, table size explodes'],
      whenToUse: 'Resource allocation, portfolio selection, budget optimization.',
      whenNotToUse: 'When weights are fractional (solved greedily in O(N log N)).'
    },
    cFileName: 'knapsack.c',
    cCode: `/**
 * 0/1 Knapsack Problem in C
 */
#include <stdio.h>

int max(int a, int b) { return (a > b) ? a : b; }

int knapSack(int W, int wt[], int val[], int n) {
    int dp[n + 1][W + 1];
    for (int i = 0; i <= n; i++) {
        for (int w = 0; w <= W; w++) {
            if (i == 0 || w == 0) dp[i][w] = 0;
            else if (wt[i - 1] <= w) dp[i][w] = max(val[i - 1] + dp[i - 1][w - wt[i - 1]], dp[i - 1][w]);
            else dp[i][w] = dp[i - 1][w];
        }
    }
    return dp[n][W];
}

int main() {
    int val[] = {60, 100, 120};
    int wt[] = {10, 20, 30};
    int W = 50;
    int n = sizeof(val) / sizeof(val[0]);
    printf("Max Knapsack value = %d\\n", knapSack(W, wt, val, n));
    return 0;
}`,
    pythonFileName: 'knapsack.py',
    pythonCode: `"""
0/1 Knapsack Problem in Python (Dynamic Programming)
Time Complexity: O(N * W)
Space Complexity: O(N * W)
"""
from typing import List, Tuple

def knapsack(capacity: int, weights: List[int], values: List[int]) -> Tuple[int, List[int]]:
    n = len(values)
    dp = [[0] * (capacity + 1) for _ in range(n + 1)]

    for i in range(1, n + 1):
        wt = weights[i - 1]
        val = values[i - 1]
        for w in range(1, capacity + 1):
            if wt <= w:
                dp[i][w] = max(val + dp[i - 1][w - wt], dp[i - 1][w])
            else:
                dp[i][w] = dp[i - 1][w]

    # Backtrack chosen items
    selected = []
    curr_w = capacity
    for i in range(n, 0, -1):
        if dp[i][curr_w] != dp[i - 1][curr_w]:
            selected.append(i - 1)
            curr_w -= weights[i - 1]

    return dp[n][capacity], selected[::-1]

if __name__ == "__main__":
    weights = [10, 20, 30]
    values = [60, 100, 120]
    capacity = 50
    max_val, items = knapsack(capacity, weights, values)
    print(f"Max Value: {max_val}, Chosen Item Indices: {items}")
`,
    relatedAlgorithms: ['n-queens', 'dijkstra']
  }
};

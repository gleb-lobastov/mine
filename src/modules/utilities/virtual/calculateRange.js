const findNearestBinarySearch = (low, high, getCurrentValue, value) => {
  while (low <= high) {
    let middle = ((low + high) / 2) | 0;
    let currentValue = getCurrentValue(middle);

    if (currentValue < value) {
      low = middle + 1;
    } else if (currentValue > value) {
      high = middle - 1;
    } else {
      return middle;
    }
  }

  if (low > 0) {
    return low - 1;
  } else {
    return 0;
  }
};

export default function calculateRange({ measurements, outerSize, scrollOffset }, prevRange) {
  const size = measurements.length - 1;
  const getOffset = index => measurements[index].start;

  let start = findNearestBinarySearch(0, size, getOffset, scrollOffset);
  let end = start;

  while (end < size && measurements[end].end < scrollOffset + outerSize) {
    end++;
  }

  if (prevRange.start !== start || prevRange.end !== end) {
    return { start, end };
  }

  return prevRange;
}
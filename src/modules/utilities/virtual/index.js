import React, { useLayoutEffect } from 'react';
import useRect from './useRect';
import useRange from './useRange';

const defaultEstimateSize = () => 50;

const defaultKeyExtractor = index => index;

export const defaultRangeExtractor = range => {
  const start = Math.max(range.start - range.overscan, 0);
  const end = Math.min(range.end + range.overscan, range.size - 1);

  const arr = [];

  for (let i = start; i <= end; i++) {
    arr.push(i);
  }

  return arr;
};

export function useVirtual({
  size = 0,
  estimateSize = defaultEstimateSize,
  overscan = 1,
  paddingStart = 0,
  paddingEnd = 0,
  parentRef,
  keyExtractor = defaultKeyExtractor,
}) {
  const { height: outerSize } = useRect();
  const latestRef = React.useRef({
    scrollOffset: 0,
    measurements: [],
    outerSize: undefined,
    totalSize: undefined,
  });

  latestRef.current.outerSize = outerSize;

  const [measuredCache, setMeasuredCache] = React.useState({});
  const [updDep, forceUpdate] = React.useReducer(x => x + 1, 0);

  const measure = forceUpdate;

  const pendingMeasuredCacheIndexesRef = React.useRef([]);

  const measurements = React.useMemo(
    () => {
      const min =
        pendingMeasuredCacheIndexesRef.current.length > 0
          ? Math.min(...pendingMeasuredCacheIndexesRef.current)
          : 0;
      pendingMeasuredCacheIndexesRef.current = [];

      const measurements = latestRef.current.measurements.slice(0, min);

      for (let i = min; i < size; i++) {
        const key = keyExtractor(i);
        const measuredSize = measuredCache[key];
        const start = measurements[i - 1]
          ? measurements[i - 1].end
          : paddingStart;
        const size =
          typeof measuredSize === 'number' ? measuredSize : estimateSize(i);
        const end = start + size;
        measurements[i] = { index: i, start, size, end, key };
      }
      return measurements;
    },
    [estimateSize, measuredCache, paddingStart, size, keyExtractor],
  );

  const totalSize = (measurements[size - 1]?.end || 0) + paddingEnd;

  latestRef.current.measurements = measurements;
  latestRef.current.totalSize = totalSize;

  const range = useRange({
    measurements,
    outerSize,
    latestRef,
    parentRef,
  });

  const virtualItems = React.useMemo(
    () => {
      const indexes = defaultRangeExtractor({
        start: range.start,
        end: range.end,
        overscan,
        size: measurements.length,
      });

      const virtualItems = [];

      for (let k = 0, len = indexes.length; k < len; k++) {
        const i = indexes[k];
        const measurement = measurements[i];

        const item = {
          ...measurement,
          measureRef: el => {
            if (el) {
              const measuredSize = el.offsetHeight;

              if (measuredSize !== item.size) {
                const { scrollOffset } = latestRef.current;

                if (item.start < scrollOffset) {
                  defaultScrollToFn(scrollOffset + (measuredSize - item.size));
                }

                pendingMeasuredCacheIndexesRef.current.push(i);

                setMeasuredCache(old => ({
                  ...old,
                  [item.key]: measuredSize,
                }));
              }
            }
          },
        };

        virtualItems.push(item);
      }

      return virtualItems;
    },
    [measurements, overscan, range.end, range.start, updDep],
  );

  const mountedRef = React.useRef();

  useLayoutEffect(
    () => {
      if (mountedRef.current) {
        if (estimateSize) setMeasuredCache({});
      }
      mountedRef.current = true;
    },
    [estimateSize],
  );

  const scrollToOffset = React.useCallback(
    (toOffset, { align = 'start' } = {}) => {
      const { scrollOffset, outerSize } = latestRef.current;

      if (align === 'auto') {
        if (toOffset <= scrollOffset) {
          align = 'start';
        } else if (toOffset >= scrollOffset + outerSize) {
          align = 'end';
        } else {
          align = 'start';
        }
      }

      if (align === 'start') {
        defaultScrollToFn(toOffset);
      } else if (align === 'end') {
        defaultScrollToFn(toOffset - outerSize);
      } else if (align === 'center') {
        defaultScrollToFn(toOffset - outerSize / 2);
      }
    },
    [],
  );

  const tryScrollToIndex = React.useCallback(
    (index, { align = 'auto', ...rest } = {}) => {
      const { measurements, scrollOffset, outerSize } = latestRef.current;

      const measurement = measurements[Math.max(0, Math.min(index, size - 1))];

      if (!measurement) {
        return;
      }

      if (align === 'auto') {
        if (measurement.end >= scrollOffset + outerSize) {
          align = 'end';
        } else if (measurement.start <= scrollOffset) {
          align = 'start';
        } else {
          return;
        }
      }

      const toOffset =
        align === 'center'
          ? measurement.start + measurement.size / 2
          : align === 'end'
            ? measurement.end
            : measurement.start;

      scrollToOffset(toOffset, { align, ...rest });
    },
    [scrollToOffset, size],
  );

  const scrollToIndex = React.useCallback(
    (...args) => {
      // We do a double request here because of
      // dynamic sizes which can cause offset shift
      // and end up in the wrong spot. Unfortunately,
      // we can't know about those dynamic sizes until
      // we try and render them. So double down!
      tryScrollToIndex(...args);
      requestAnimationFrame(() => {
        tryScrollToIndex(...args);
      });
    },
    [tryScrollToIndex],
  );

  return {
    virtualItems,
    totalSize,
    scrollToOffset,
    scrollToIndex,
    measure,
  };
}

function defaultScrollToFn(offset) {
  window.scrollY = offset;
}

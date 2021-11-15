import React, { useLayoutEffect } from 'react';
import calculateRange from 'modules/utilities/virtual/calculateRange';

export default function useRange({
  measurements,
  outerSize,
  latestRef,
  parentRef,
}) {
  const [range, setRange] = React.useState({ start: 0, end: 0 });

  const rangeTimeoutIdRef = React.useRef(null);

  const cancelAsyncRange = React.useCallback(() => {
    if (rangeTimeoutIdRef.current !== null) {
      clearTimeout(rangeTimeoutIdRef.current);
      rangeTimeoutIdRef.current = null;
    }
  }, []);

  useLayoutEffect(
    () => {
      rangeTimeoutIdRef.current = setTimeout(() => {
        setRange(prevRange => calculateRange(latestRef.current, prevRange));
      });
      return () => cancelAsyncRange();
    },
    [measurements, outerSize, cancelAsyncRange],
  );

  useLayoutEffect(
    () => {
      const onScroll = () => {
        latestRef.current.scrollOffset = parentRef.current
          ? scrollOffsetFn(parentRef)
          : 0;
        cancelAsyncRange();
        setRange(prevRange => calculateRange(latestRef.current, prevRange));
      };

      // Determine initially visible range
      onScroll();

      window.addEventListener('scroll', onScroll, {
        capture: false,
        passive: true,
      });

      return () => {
        window.removeEventListener('scroll', onScroll);
      };
    },
    [cancelAsyncRange],
  );

  return range;
}

function scrollOffsetFn(parentRef) {
  const bounds = parentRef.current.getBoundingClientRect();
  return bounds.top * -1;
}

import { useCallback, useRef, useState } from 'react';
import throttle from 'lodash/throttle';

const MOUSE_MOVE_EVENTS_INTERVAL_MS = 40;

export default function useMouseMove({ total }) {
  const [percent, setPercent] = useState(0);

  const sliderRef = useRef();

  const handleMouseMove = useCallback(
    throttle(handleMouseMoveInternal, MOUSE_MOVE_EVENTS_INTERVAL_MS),
    [],
  );

  return {
    handleMouseMove,
    sliderRef,
    slideIndex: getIndexFromPercent(percent, total),
  };

  function handleMouseMoveInternal(event) {
    const sliderEl = sliderRef.current;
    if (sliderEl) {
      const { left, width } = sliderEl.getBoundingClientRect();
      const x = event.clientX - left;
      if (x > 0 && x < width) {
        setPercent(Math.ceil((x * 100) / width));
      }
    }
  }
}

function getIndexFromPercent(percent, total) {
  return Math.max(0, Math.ceil((total * percent) / 100) - 1);
}

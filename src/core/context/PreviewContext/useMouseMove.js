import { useEffect, useRef, useState } from 'react';
import throttle from 'lodash/throttle';

const MOUSE_MOVE_EVENTS_INTERVAL_MS = 40;

export default function useMouseMove({ onMove }) {
  const [percent, setPercent] = useState(0);

  const popupRef = useRef();
  function handleMouseMove(event) {
    onMove(event);

    const popupEl = popupRef.current;
    if (popupEl) {
      const { left, width } = popupEl.getBoundingClientRect();
      const x = event.clientX - left;
      if (x > 0 && x < width) {
        setPercent(Math.ceil((x * 100) / width));
      }
    }
  }

  useEffect(() => {
    const handler = throttle(handleMouseMove, MOUSE_MOVE_EVENTS_INTERVAL_MS);
    window.addEventListener('mousemove', handler);
    return () => window.removeEventListener('mousemove', handler);
  });

  return {
    popupRef,
    popupHMovePercent: percent,
  };
}

import { useMemo, useRef, useState } from 'react';
import throttle from 'lodash/throttle';

const MOUSE_MOVE_EVENTS_INTERVAL_MS = 40;

export default function useMouseMove({ total }) {
  const [percent, setPercent] = useState(0);

  const sliderRef = useRef();

  const handleMouseMove = useMemo(() => {
    const handler = throttle(
      handleMouseMoveInternal,
      MOUSE_MOVE_EVENTS_INTERVAL_MS,
    );
    // Can't track synthetic event, as react discard them and they not
    // available asynchronously. So track only needed params of event
    return ({ clientX }) => handler({ clientX });
  }, []);

  return {
    handleMouseMove,
    sliderRef,
    slideIndex: getIndexFromPercent(percent, total),
  };

  function handleMouseMoveInternal({ clientX }) {
    const sliderEl = sliderRef.current;
    if (sliderEl) {
      const { left, width } = sliderEl.getBoundingClientRect();
      const x = clientX - left;
      if (x > 0 && x < width) {
        setPercent(Math.ceil((x * 100) / width));
      }
    }
  }
}

function getIndexFromPercent(percent, total) {
  return Math.max(0, Math.ceil((total * percent) / 100) - 1);
}

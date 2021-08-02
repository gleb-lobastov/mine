import { useEffect, useState } from 'react';
import throttle from 'lodash/throttle';

const MOUSEMOVE_EVENTS_INTERVAL = 250;

export default function useTrackPreviewKeyByMouseMove() {
  const [activePreviewKey, setActivePreviewKey] = useState();

  function handleMouseMove({ clientX, clientY }) {
    const previewKey = resolvePreviewKeyByMousePosition({ clientX, clientY });
    if (previewKey === 'viewer') {
      // keep current key during view (move mouse over viewer element)
      return;
    }
    setActivePreviewKey(previewKey);
  }

  // const isActive = Boolean(activePreviewKey);
  useEffect(() => {
    const debounced = throttle(handleMouseMove, MOUSEMOVE_EVENTS_INTERVAL);
    // Can't track synthetic event, as react discard them and they not
    // available asynchronously. So track only needed params of event
    const handler = ({ clientX, clientY }) => debounced({ clientX, clientY });
    window.addEventListener('mousemove', handler);
    return () => window.removeEventListener('mousemove', handler);
  }, []);

  return activePreviewKey;
}

function resolvePreviewKeyByMousePosition({ clientX, clientY }) {
  return (
    window.document
      .elementFromPoint(clientX, clientY)
      ?.closest('[data-preview]')?.dataset?.preview ?? null
  );
}

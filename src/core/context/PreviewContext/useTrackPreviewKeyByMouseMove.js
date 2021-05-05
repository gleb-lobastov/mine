import { useEffect, useState } from 'react';
import debounce from 'lodash/debounce';

const PASSIVE_EVENTS_INTERVAL_MS = 1000;
const ACTIVE_EVENTS_INTERVAL_MS = 40;

export default function useTrackPreviewKeyByMouseMove() {
  const [activePreviewKey, setActivePreviewKey] = useState();

  function handleMouseMove({ pageX, pageY }) {
    const previewKey = resolvePreviewKeyByMousePosition({ pageX, pageY });
    if (previewKey === 'viewer') {
      // keep current key during view (move mouse over viewer element)
      return;
    }
    setActivePreviewKey(previewKey);
  }

  const isActive = Boolean(activePreviewKey);
  useEffect(
    () => {
      const debounced = debounce(
        handleMouseMove,
        isActive ? ACTIVE_EVENTS_INTERVAL_MS : PASSIVE_EVENTS_INTERVAL_MS,
      );
      // Can't track synthetic event, as react discard them and they not
      // available asynchronously. So track only needed params of event
      const handler = ({ pageX, pageY }) => debounced({ pageX, pageY });
      window.addEventListener('mousemove', handler);
      return () => window.removeEventListener('mousemove', handler);
    },
    [isActive],
  );

  return activePreviewKey;
}

function resolvePreviewKeyByMousePosition({ pageX, pageY }) {
  return (
    window.document.elementFromPoint(pageX, pageY)?.closest('[data-preview]')
      ?.dataset?.preview ?? null
  );
}

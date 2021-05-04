import { useContext, useMemo } from 'react';
import { v4 as uuidV4 } from 'uuid';
import PreviewContext from './PreviewContext';

export default function usePreviewTrigger({ locationName, thumbnailsUrls }) {
  const { setPreview, activeKey } = useContext(PreviewContext);

  const uniqKey = useMemo(uuidV4, []);

  function handleMouseEnter(event) {
    setPreview(event.currentTarget, uniqKey, {
      previewUrls: thumbnailsUrls,
      locationName,
    });
  }

  return {
    active: uniqKey === activeKey,
    triggerProps: {
      onMouseEnter: handleMouseEnter,
      'data-preview': uniqKey,
    },
  };
}

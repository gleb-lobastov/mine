import { useContext, useMemo } from 'react';
import { v4 as uuidV4 } from 'uuid';
import PreviewContext from './PreviewContext';

const MAX_THUMBNAILS = 7;

export default function usePreviewTrigger({ caption, thumbnailsUrls }) {
  const { setPreview, activeKey } = useContext(PreviewContext);

  const uniqKey = useMemo(uuidV4, []);

  function handleMouseEnter(event) {
    setPreview(event.currentTarget, uniqKey, {
      previewUrls: thumbnailsUrls.slice(0, MAX_THUMBNAILS),
      caption,
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

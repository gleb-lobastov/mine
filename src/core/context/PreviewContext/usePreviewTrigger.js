import { useContext, useMemo } from 'react';
import { v4 as uuidV4 } from 'uuid';
import PreviewContext from './PreviewContext';

const MAX_THUMBNAILS = 10;

export default function usePreviewTrigger({ caption, previewUrls }) {
  const { setPreview, activeKey } = useContext(PreviewContext);

  const uniqKey = useMemo(uuidV4, []);

  function handleMouseEnter(event) {
    setPreview(event.currentTarget, uniqKey, {
      previewUrls: previewUrls.slice(0, MAX_THUMBNAILS),
      total: previewUrls.length,
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

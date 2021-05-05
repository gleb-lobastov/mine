import { useContext, useMemo, useEffect } from 'react';
import { v4 as uuidV4 } from 'uuid';
import PreviewContext from './PreviewContext';

export default function usePreviewTrigger(previewProps) {
  const { register, activePreviewKey } = useContext(PreviewContext);

  const uniqPreviewKey = useMemo(uuidV4, []);

  useEffect(() => {
    const unregister = register(uniqPreviewKey, previewProps);
    return unregister;
  }, []);

  return {
    active: uniqPreviewKey === activePreviewKey,
    triggerProps: {
      'data-preview': uniqPreviewKey,
    },
  };
}

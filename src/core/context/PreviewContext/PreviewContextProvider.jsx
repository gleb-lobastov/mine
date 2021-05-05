import React, { useMemo, useRef } from 'react';
import PreviewPopup from './components/PreviewPopup';
import useTrackPreviewKeyByMouseMove from './useTrackPreviewKeyByMouseMove';
import PreviewContext from './PreviewContext';

export default function PreviewContextProvider({ children }) {
  const storageRef = useRef({});
  const activePreviewKey = useTrackPreviewKeyByMouseMove();

  const previewContextValue = useMemo(
    () => ({
      activePreviewKey,
      register(uniqKey, previewProps) {
        storageRef.current[uniqKey] = previewProps;
        return () => delete storageRef.current[uniqKey];
      },
    }),
    [activePreviewKey],
  );

  const previewProps = storageRef.current[activePreviewKey];
  return (
    <PreviewContext.Provider value={previewContextValue}>
      {children}
      {previewProps && <PreviewPopup {...previewProps} />}
    </PreviewContext.Provider>
  );
}

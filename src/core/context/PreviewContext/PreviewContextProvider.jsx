import React, { useMemo } from 'react';
import PreviewPopup from './components/PreviewPopup';
import useMouseMove from './useMouseMove';
import PreviewContext from './PreviewContext';

export default function PreviewContextProvider({ children }) {
  const [previewState, setPreviewState] = React.useState({});
  const {
    anchorEl: activeAnchorEl,
    activeKey,
    previewProps: activePreviewProps,
  } = previewState;

  const { popupRef, popupHMovePercent } = useMouseMove({
    onMove(event) {
      if (!isOverlapWithTriggerEl(event)) {
        resetPreview();
      }
    },
  });

  function setPreview(anchorEl, uniqKey, previewProps) {
    setPreviewState({
      anchorEl,
      activeKey: uniqKey,
      previewProps: previewProps ?? {},
    });
  }

  function resetPreview() {
    setPreviewState({ anchorEl: null, props: {} });
  }

  const previewContextValue = useMemo(
    () => ({
      activeKey,
      setPreview,
      resetPreview,
    }),
    [activeAnchorEl, activeKey, activePreviewProps],
  );

  return (
    <PreviewContext.Provider value={previewContextValue}>
      {children}
      <PreviewPopup
        ref={popupRef}
        anchorEl={activeAnchorEl}
        hMovePercent={popupHMovePercent}
        previewProps={activePreviewProps}
      />
    </PreviewContext.Provider>
  );
}

const TRIGGER_H_LOOKUP_POSITION = 50;
function isOverlapWithTriggerEl({ pageY }) {
  return Boolean(
    window.document
      .elementFromPoint(TRIGGER_H_LOOKUP_POSITION, pageY)
      .closest('[data-preview]'),
  );
}

import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';

export default function FullscreenFallback({
  children,
  fullscreen,
  uniqKey,
  inlineGalleryRef,
}) {
  const portalGalleryRef = useRef();

  useEffect(() => {
    const element = document.createElement('div');
    element.id = `imageGalleryPortal-${uniqKey}`;
    document.body.append(element);
    return () => element.remove();
  }, []);

  useEffect(
    () => {
      if (inlineGalleryRef.current) {
        inlineGalleryRef.current.setState({
          isFullscreen: false,
          modalFullscreen: false,
        });
      }
      if (fullscreen) {
        portalGalleryRef.current.setState({
          isFullscreen: true,
          modalFullscreen: true,
        });
      }
    },
    [fullscreen],
  );

  if (!fullscreen) {
    return null;
  }
  return ReactDOM.createPortal(
    React.cloneElement(children, { ref: portalGalleryRef }),
    window.document.getElementById(`imageGalleryPortal-${uniqKey}`),
  );
}

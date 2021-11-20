import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import ScrollLock from 'react-scrolllock';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  top: {
    zIndex: `${theme.zIndex.drawer + 1} !important`,
  },
}));

export default function FullscreenFallback({
  children,
  fullscreen,
  uniqKey,
  inlineGalleryRef,
}) {
  const classes = useStyles();
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
    <ScrollLock>
      <div>
        {React.cloneElement(children, {
          ref: portalGalleryRef,
          additionalClass: classes.top,
        })}
      </div>
    </ScrollLock>,
    window.document.getElementById(`imageGalleryPortal-${uniqKey}`),
  );
}

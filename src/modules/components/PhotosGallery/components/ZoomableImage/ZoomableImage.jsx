import React, { useState, useCallback, useEffect, useRef } from 'react';
import cls from 'classnames';
import { ensuredForwardRef } from 'react-use';
import ZoomInIcon from '@material-ui/icons/ZoomIn';
import ZoomOutIcon from '@material-ui/icons/ZoomOut';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';

const CENTER = 50;

const useStyles = makeStyles({
  container: {
    position: 'relative',
  },
  '@global': {
    // need this workaround to keep zoom even when mouseover gallery controllers
    '.image-gallery-slide-wrapper:hover .MINE-image-gallery-zoom-not-touchscreen': {
      opacity: 1,
    },
  },
  touchscreenZoom: {
    opacity: 1,
  },
  zoom: {
    backgroundPosition: `${CENTER}% ${CENTER}%`,
    backgroundRepeat: 'no-repeat',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    margin: 0,
    padding: 0,
    opacity: 0,
    transition: 'opacity 0.5s',
  },
  zoomButton: {
    position: 'absolute',
    bottom: '10px',
    left: 'calc(50% - 20px)',
    zIndex: 4,
  },
  zoomIcon: {
    height: '28px',
    width: '28px',
    color: 'white',
    transition: 'all 0.3s ease-out',
    border: 0,
    cursor: 'pointer',
    outline: 'none',
    filter: 'drop-shadow(0 2px 2px #1a1a1a)',
  },
});

export default ensuredForwardRef(function ZoomableImage(
  { alt, src, onSwipeLock, ...forwardingProps },
  ref,
) {
  const touchscreen = window.matchMedia('(any-pointer: coarse)').matches;
  const [touchscreenZoom, setTouchscreenZoom] = useState(false);

  const classes = useStyles();
  const [backgroundPosition, setBackgroundPosition] = useState(
    `${CENTER}% ${CENTER}%`,
  );

  const containerRef = useRef();

  useEffect(
    () => {
      onSwipeLock(touchscreenZoom);
    },
    [touchscreenZoom],
  );

  const handleAnyZoom = useCallback(event => {
    const { nativeEvent } = event;
    const {
      top: containerTop,
      left: containerLeft,
      width: originalWidth,
      height: originalHeight,
    } = ref.current.getBoundingClientRect();

    const offsetX =
      (nativeEvent.clientX ?? nativeEvent.touches[0]?.clientX) - containerLeft;
    const offsetY =
      (nativeEvent.clientY ?? nativeEvent.touches[0]?.clientY) - containerTop;

    if (!offsetX || !offsetY) {
      return;
    }

    const extendable =
      originalWidth < ref.current.naturalWidth ||
      originalHeight < ref.current.naturalHeight;

    const notEnoughWidth =
      containerRef.current.getBoundingClientRect().width <
      ref.current.naturalWidth;

    if (!extendable) {
      return;
    }

    const x =
      extendable && notEnoughWidth
        ? asPercent((offsetX / originalWidth) * 100)
        : CENTER;
    const y = extendable ? asPercent((offsetY / originalHeight) * 100) : CENTER;

    setBackgroundPosition(`${x}% ${y}%`);
  }, []);

  const handleTouchscreenZoom = useCallback(
    event => {
      if (touchscreenZoom) {
        handleAnyZoom(event);
      }
    },
    [touchscreenZoom],
  );

  const ZoomIcon = touchscreenZoom ? ZoomOutIcon : ZoomInIcon;

  return (
    <div className={classes.container} ref={containerRef}>
      <img ref={ref} alt={alt} src={src} {...forwardingProps} />
      <figure
        className={cls(classes.zoom, {
          ['MINE-image-gallery-zoom-not-touchscreen']: !touchscreen,
          [classes.touchscreenZoom]: touchscreenZoom,
        })}
        style={{ backgroundPosition, backgroundImage: `url(${src})` }}
        onMouseMove={touchscreen ? undefined : handleAnyZoom}
        onTouchMove={touchscreenZoom ? handleTouchscreenZoom : undefined}
      />
      {touchscreen && (
        <IconButton
          className={classes.zoomButton}
          onClick={() =>
            setTouchscreenZoom(prevTouchscreenZoom => !prevTouchscreenZoom)
          }
        >
          <ZoomIcon className={classes.zoomIcon} />
        </IconButton>
      )}
    </div>
  );
});

function asPercent(value) {
  return Math.min(Math.max(value, 0), 100) || CENTER;
}

import React, { useState, useCallback, useEffect, useRef } from 'react';
import cls from 'classnames';
import { ensuredForwardRef } from 'react-use';
import ZoomInIcon from '@material-ui/icons/ZoomIn';
import ZoomOutIcon from '@material-ui/icons/ZoomOut';
import { makeStyles } from '@material-ui/core/styles';

const CENTER = 50;

const useStyles = makeStyles({
  container: {
    position: 'relative',
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
    // https://stackoverflow.com/questions/2975217/how-to-fix-flicker-when-using-webkit-transforms-transitions
    transform: 'translateZ(0)',
  },
  zoomButton: {
    position: 'absolute',
    bottom: '0',
    right: 'initial',
    left: '50%',
    transform: 'translate(-50%)',
    zIndex: 4,
  },
  zoomIcon: {
    transform: 'scale(1.2)',
  },
  zoomed: {
    // should be more specific than $zoom class, so placed later
    opacity: 1,
  },
});

export default ensuredForwardRef(function ZoomableImage(
  { alt, src, onSwipeLock, ...forwardingProps },
  ref,
) {
  const touchscreen = window.matchMedia('(any-pointer: coarse)').matches;
  const [zoomable, setZoomable] = useState(true);
  const [zoomed, setZoomed] = useState(false);

  const classes = useStyles();
  const [backgroundPosition, setBackgroundPosition] = useState(
    `${CENTER}% ${CENTER}%`,
  );

  const containerRef = useRef();

  useEffect(
    () => {
      if (!touchscreen) {
        return undefined;
      }
      onSwipeLock(zoomed);
      return () => onSwipeLock(false);
    },
    [touchscreen, zoomed],
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
      setZoomable(false);
      return;
    }

    const x =
      extendable && notEnoughWidth
        ? asPercent((offsetX / originalWidth) * 100)
        : CENTER;
    const y = extendable ? asPercent((offsetY / originalHeight) * 100) : CENTER;

    setBackgroundPosition(`${x}% ${y}%`);
  }, []);

  const ZoomIcon = zoomed ? ZoomOutIcon : ZoomInIcon;

  const imgNode = <img ref={ref} alt={alt} src={src} {...forwardingProps} />;
  if (!zoomable) {
    return imgNode;
  }

  return (
    <div className={classes.container} ref={containerRef}>
      {imgNode}
      {/* click handler in only for convenience */}
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions */}
      <figure
        className={cls(classes.zoom, {
          [classes.zoomed]: zoomed,
        })}
        style={{ backgroundPosition, backgroundImage: `url(${src})` }}
        onMouseMove={zoomed && !touchscreen ? handleAnyZoom : undefined}
        onTouchMove={zoomed && touchscreen ? handleAnyZoom : undefined}
        onClick={() => setZoomed(false)}
      />
      <button
        type="button"
        className={cls(
          'image-gallery-icon',
          'image-gallery-fullscreen-button',
          classes.zoomButton,
        )}
        onClick={() => setZoomed(prevZoomed => !prevZoomed)}
      >
        <ZoomIcon className={cls('image-gallery-svg', classes.zoomIcon)} />
      </button>
    </div>
  );
});

function asPercent(value) {
  return Math.min(Math.max(value, 0), 100) || CENTER;
}

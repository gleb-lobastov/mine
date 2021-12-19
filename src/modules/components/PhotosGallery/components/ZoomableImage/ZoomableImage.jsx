import React, { useState, useCallback } from 'react';
import cls from 'classnames';
import { ensuredForwardRef } from 'react-use';
import { makeStyles } from '@material-ui/core/styles';

const CENTER = 50;

const useStyles = makeStyles({
  container: {
    position: 'relative',
    '&:hover $zoom:not($touchscreen)': {
      opacity: 1,
    },
  },
  touchscreen: {},
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
  touchscreenZoom: {
    opacity: 1,
  },
});

export default ensuredForwardRef(function ZoomableImage(
  { alt, src, ...forwardingProps },
  ref,
) {
  const touchscreen = window.matchMedia('(any-pointer: coarse)').matches;
  const [touchscreenZoom, setTouchscreenZoom] = useState(false);

  const classes = useStyles();
  const [backgroundPosition, setBackgroundPosition] = useState(
    `${CENTER}% ${CENTER}%`,
  );

  const handleZoom = useCallback(event => {
    const { nativeEvent } = event;
    const {
      top: containerTop,
      left: containerLeft,
      width: originalWidth,
      height: originalHeight,
    } = ref.current.getBoundingClientRect();

    const offsetX =
      (nativeEvent.clientX ?? nativeEvent.touches[0]?.clientX) - containerTop;
    const offsetY =
      (nativeEvent.clientY ?? nativeEvent.touches[0]?.clientY) - containerLeft;

    if (!offsetX || !offsetY) {
      return;
    }

    const extendableByX = originalWidth < ref.current.naturalWidth;
    const extendableByY = originalHeight < ref.current.naturalHeight;

    if (!extendableByX && !extendableByY) {
      return;
    }

    const x = extendableByX
      ? asPercent((offsetX / originalWidth) * 100)
      : CENTER;
    const y = extendableByY
      ? asPercent((offsetY / originalHeight) * 100)
      : CENTER;

    setBackgroundPosition(`${x}% ${y}%`);
  }, []);

  return (
    <div
      className={classes.container}
      onTouchStart={() => setTouchscreenZoom(true)}
      onTouchEnd={() => setTouchscreenZoom(false)}
    >
      <img ref={ref} alt={alt} src={src} {...forwardingProps} />
      <figure
        className={cls(classes.zoom, {
          [classes.touchscreen]: touchscreen,
          [classes.touchscreenZoom]: touchscreenZoom,
        })}
        style={{ backgroundPosition, backgroundImage: `url(${src})` }}
        onMouseMove={touchscreen ? undefined : handleZoom}
        onTouchMove={touchscreenZoom ? handleZoom : undefined}
      />
    </div>
  );
});

function asPercent(value) {
  return Math.min(Math.max(value, 0), 100) || CENTER;
}
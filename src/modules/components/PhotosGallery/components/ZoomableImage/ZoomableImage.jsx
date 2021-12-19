import React, { useState, useCallback } from 'react';
import { ensuredForwardRef } from 'react-use';
import { makeStyles } from '@material-ui/core/styles';

const CENTER = 50;

const useStyles = makeStyles({
  container: {
    position: 'relative',
    '&:hover $zoom': {
      opacity: 1,
    },
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
});

export default ensuredForwardRef(function ZoomableImage(
  { alt, src, ...forwardingProps },
  ref,
) {
  const classes = useStyles();
  const [backgroundPosition, setBackgroundPosition] = useState(
    `${CENTER}% ${CENTER}%`,
  );

  const handleZoom = useCallback(event => {
    const { nativeEvent } = event;
    const container = event.currentTarget;
    const offsetX = nativeEvent.offsetX ?? nativeEvent.touches[0]?.pageX;
    const offsetY = nativeEvent.offsetY ?? nativeEvent.touches[0]?.pageY;
    if (!offsetX || !offsetY) {
      return;
    }
    const {
      width: originalWidth,
      height: originalHeight,
    } = ref.current.getBoundingClientRect();
    const extendableByX = originalWidth === container.offsetWidth;
    const extendableByY = originalHeight === container.offsetHeight;

    if (!extendableByX && !extendableByY) {
      return;
    }

    const x = extendableByX ? (offsetX / container.offsetWidth) * 100 : CENTER;
    const y = extendableByY ? (offsetY / container.offsetHeight) * 100 : CENTER;
    setBackgroundPosition(`${x}% ${y}%`);
  }, []);

  return (
    <div className={classes.container}>
      <img ref={ref} alt={alt} src={src} {...forwardingProps} />
      <figure
        className={classes.zoom}
        style={{ backgroundPosition, backgroundImage: `url(${src})` }}
        onMouseMove={handleZoom}
      />
    </div>
  );
});

import React from 'react';
import cls from 'classnames';
import { animated } from 'react-spring';
import Typography from '@material-ui/core/Typography';
import CameraAltIcon from '@material-ui/icons/CameraAlt';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Portal from '@material-ui/core/Portal';
import CrossFade from 'modules/components/muiExtended/CrossFade';
import useSlideOnMouseMove from './useSlideOnMouseMove';

const MAX_THUMBNAILS = 10;

const useStyles = makeStyles({
  container: {
    position: 'fixed',
    bottom: 16,
    right: 16,

    height: '320px',
    width: '480px',
    padding: '12px',
  },
  content: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  imageContainer: {
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
    willChange: 'background-image',
  },
  caption: {
    padding: '4px 8px',
    margin: '16px',
    background: 'hsla(0, 0%, 15%, 0.6)',
    color: 'white',
    borderRadius: '35px',
  },
  shadow: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: 'hsla(0, 0%, 15%, 0.6)',
  },
  foreground: {
    color: 'white',
    zIndex: 1,
  },
  detailsCaption: {
    position: 'absolute',
    top: '0',
    left: '0',
  },
  counterCaption: {
    position: 'absolute',
    top: '0',
    right: '0',
  },
  showAllCaption: {
    position: 'absolute',
    bottom: '0',
    left: '0',
  },
});

export default function PreviewPopupContent({ previewUrls }) {
  const classes = useStyles();

  const previewsTotal = previewUrls.length;
  const previewsShown = Math.min(previewsTotal, MAX_THUMBNAILS);

  const {
    handleMouseMove,
    sliderRef: popupRef,
    slideIndex: imageIndex,
  } = useSlideOnMouseMove({ total: previewsShown });

  const hasPreviews = previewsShown > 0;
  const hasMorePreviews = previewsTotal > previewsShown;
  const { previewUrl: url, caption } = previewUrls[imageIndex] || {};
  const showAllBanner = hasMorePreviews && imageIndex === previewsShown - 1;

  const galleryNode = hasPreviews ? (
    <animated.div
      className={cls(classes.content, classes.imageContainer)}
      style={{ backgroundImage: `url(${url})` }}
    >
      {showAllBanner && (
        <>
          <div className={classes.shadow} />
          <CameraAltIcon className={classes.foreground} />
          <div className={classes.foreground}>Дальше...</div>
        </>
      )}
    </animated.div>
  ) : (
    <div className={classes.content}>
      <CameraAltIcon />
      <div>Нет фото</div>
    </div>
  );

  const detailsNode = caption ? (
    <Typography className={cls(classes.caption, classes.detailsCaption)}>
      {caption}
    </Typography>
  ) : null;

  const counterNode = hasPreviews ? (
    <Typography className={cls(classes.caption, classes.counterCaption)}>
      {imageIndex + 1}/{previewsTotal}
    </Typography>
  ) : null;

  return (
    <Portal container={document.body}>
      <Paper
        ref={popupRef}
        data-preview="viewer"
        className={classes.container}
        onMouseMove={handleMouseMove}
        elevation={2}
      >
        <CrossFade uniqKey={hasPreviews ? url : 'noPhoto'}>
          {galleryNode}
        </CrossFade>
        {detailsNode}
        {counterNode}
      </Paper>
    </Portal>
  );
}

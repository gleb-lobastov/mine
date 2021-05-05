import React from 'react';
import cls from 'classnames';
import { animated } from 'react-spring';
import Typography from '@material-ui/core/Typography';
import CameraAltIcon from '@material-ui/icons/CameraAlt';
import { makeStyles } from '@material-ui/core/styles';
import CrossFade from 'modules/components/muiExtended/CrossFade';

const useStyles = makeStyles({
  container: {
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

export default function PreviewPopupContent({
  hMovePercent,
  previewProps: { previewUrls, total },
}) {
  const classes = useStyles();

  const previewUrlsLength = previewUrls.length;
  const hasImages = previewUrlsLength > 0;
  const hasMoreImages = total > previewUrlsLength;
  const imageIndex = getIndexFromPercent(hMovePercent, previewUrlsLength);
  const { previewUrl: url, caption } = previewUrls[imageIndex] || {};
  const showAllBanner = hasMoreImages && imageIndex === previewUrlsLength - 1;

  const galleryNode = hasImages ? (
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

  const counterNode = hasImages ? (
    <Typography className={cls(classes.caption, classes.counterCaption)}>
      {imageIndex + 1}/{total}
    </Typography>
  ) : null;

  return (
    <div className={classes.container}>
      <CrossFade uniqKey={hasImages ? url : 'noPhoto'}>{galleryNode}</CrossFade>
      {detailsNode}
      {counterNode}
    </div>
  );
}

function getIndexFromPercent(percent, total) {
  return Math.max(0, Math.ceil((total * percent) / 100) - 1);
}

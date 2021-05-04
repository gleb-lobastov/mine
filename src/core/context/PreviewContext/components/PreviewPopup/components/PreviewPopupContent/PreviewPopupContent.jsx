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
    width: '100%',
    height: '100%',
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
});

export default function PreviewPopupContent({
  previewUrls,
  hMovePercent,
  ...previewProps
}) {
  const classes = useStyles();

  const imageIndex = getIndexFromPercent(hMovePercent, previewUrls.length);
  const url = previewUrls[imageIndex];
  const hasImages = previewUrls.length > 0;

  const galleryNode = hasImages ? (
    <animated.div
      className={classes.imageContainer}
      style={{ backgroundImage: `url(${url})` }}
    />
  ) : (
    <>
      <CameraAltIcon />
      <div>Нет фото</div>
    </>
  );

  const detailsNode = (
    <Typography className={cls(classes.caption, classes.detailsCaption)}>
      {previewProps?.locationName}
    </Typography>
  );

  const counterNode = hasImages ? (
    <Typography className={cls(classes.caption, classes.counterCaption)}>
      {imageIndex + 1}/{previewUrls.length}
    </Typography>
  ) : null;

  return (
    <div className={classes.container}>
      <CrossFade uniqKey={hasImages ? url : 'noPhoto'}>
        <div className={classes.content}>{galleryNode}</div>
      </CrossFade>
      {detailsNode}
      {counterNode}
    </div>
  );
}

function getIndexFromPercent(percent, total) {
  return Math.max(0, Math.ceil((total * percent) / 100) - 1);
}

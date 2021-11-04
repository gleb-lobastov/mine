import React from 'react';
import times from 'lodash/times';
import Skeleton from '@material-ui/lab/Skeleton';
import { makeStyles } from '@material-ui/core/styles';

const THUMB_HEIGHT = 40;

const useStyles = makeStyles({
  container: {
    display: 'flex',
  },
  imageSkeleton: {
    flexGrow: '1',
  },
  thumbsContainer: {
    overflow: 'hidden',
  },
  thumbSkeleton: {
    margin: '0 5px 10px 5px',
  },
});

export default function GallerySkeleton({ height }) {
  const classes = useStyles();

  const thumbsCount = Math.ceil(height / THUMB_HEIGHT);

  return (
    <div className={classes.container}>
      <Skeleton
        variant="rect"
        height={height}
        className={classes.imageSkeleton}
      />
      <div className={classes.thumbsContainer} style={{ height }}>
        {times(thumbsCount).map(() => (
          <Skeleton
            variant="rect"
            height={60}
            width={100}
            className={classes.thumbSkeleton}
          />
        ))}
      </div>
    </div>
  );
}

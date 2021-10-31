import React from 'react';
import cls from 'classnames';
import LazyLoad from 'react-lazy-load';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  photoContainer: {
    width: '100%',
    maxWidth: '800px',
    height: '30vh',
    minHeight: '200px',
    margin: '24px 0',
  },
  photo: {
    display: 'block',
    objectFit: 'cover',
    width: '100%',
    height: '100%',
    objectPosition: 'center center',
  },
});

export default function VisitsThumbs({ className, visitsList }) {
  const classes = useStyles();
  const thumbnailUrl = visitsList.flatMap(({ photos }) =>
    photos.map(({ previewUrl: url }) => url),
  )[0];

  if (!thumbnailUrl) {
    return null;
  }

  return (
    <div key={thumbnailUrl} className={cls(className, classes.photoContainer)}>
      <LazyLoad height="max(30vh, 200px)" offsetVertical={2048}>
        <img alt="фото" className={classes.photo} src={thumbnailUrl} />
      </LazyLoad>
    </div>
  );
}

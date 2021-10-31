import React from 'react';
import cls from 'classnames';
import LazyLoad from 'react-lazy-load';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  photoContainer: {
    // margin: '4px 12px 12px',
    // minWidth: '150px',
    // maxHeight: '100px',
    // textAlign: 'center',
    width: '100%',
    maxWidth: '640px',
    height: '30vh',
  },
  photo: {
    display: 'block',
    objectFit: 'cover',
    width: '100%',
    height: '30vh',
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
      <LazyLoad height="30vh" offsetVertical={2048}>
        <img alt="фото" className={classes.photo} src={thumbnailUrl} />
      </LazyLoad>
    </div>
  );
}

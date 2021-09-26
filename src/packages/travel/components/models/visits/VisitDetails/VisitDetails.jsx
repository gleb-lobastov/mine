import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import cls from 'classnames';

const useStyles = makeStyles({
  imageContainer: {
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
    willChange: 'background-image',
  },
});

export default function VisitDetails({ visit }) {
  const classes = useStyles();

  if (!visit) {
    return 'Не указано';
  }

  const { photos = [] } = visit;
  const [{ thumbnailUrl } = {}] = photos;

  return (
    <div className={classes.container}>
      <div
        className={cls(classes.content, classes.imageContainer)}
        style={{ backgroundImage: `url(${thumbnailUrl})`, height: '100px' }}
      />
    </div>
  );
}

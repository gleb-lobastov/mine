import React from 'react';
import cls from 'classnames';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  container: {
    display: 'inline-block',
    position: 'relative',
    width: '50%',
  },

  spaceholder: {
    marginTop: ({ aspectRatio }) => `${100 / aspectRatio}%`,
  },

  content: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
});

export default function AutoHeight({ children, className, aspectRatio }) {
  const classes = useStyles({ aspectRatio });
  return (
    <div className={cls(className, classes.container)}>
      <div className={classes.spaceholder} />
      <div className={classes.content}>{children}</div>
    </div>
  );
}

AutoHeight.defaultProps = { aspectRatio: 1 };

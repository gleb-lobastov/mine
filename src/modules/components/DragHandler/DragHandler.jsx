import React from 'react';
import cls from 'classnames';
import { makeStyles } from '@material-ui/core/styles';
import IconDragHandle from '@material-ui/icons/DragHandle';

const useStyles = makeStyles({
  dragHandler: {
    cursor: 'grab',
  },
});

export default function DragHandler({ className }) {
  const classes = useStyles();
  return (
    <IconDragHandle
      className={cls(className, classes.dragHandler)}
      data-sort-handler="enabled"
    />
  );
}

DragHandler.defaultProps = { className: undefined };

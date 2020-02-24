import React from 'react';
import PropTypes from 'prop-types';
import cls from 'classnames';
import { makeStyles } from '@material-ui/core/styles';
import IconDragHandle from '@material-ui/icons/DragHandle';

const useStyles = makeStyles({
  dragHandler: {
    cursor: 'grab',
    marginLeft: '4px',
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    display: 'inline-block',
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

DragHandler.propTypes = {
  className: PropTypes.string,
};

DragHandler.defaultProps = { className: undefined };

import React from 'react';
import PropTypes from 'prop-types';
import cls from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import IconDragHandle from '@material-ui/icons/DragHandle';

const styles = {
  dragHandler: {
    cursor: 'grab',
    marginLeft: '4px',
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    display: 'inline-block',
  },
};

const DragHandler = ({ className, classes }) => (
  <IconDragHandle
    className={cls(className, classes.dragHandler)}
    data-sort-handler="enabled"
  />
);

DragHandler.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.arrayOf(PropTypes.string).isRequired,
};

DragHandler.defaultProps = { className: undefined };

export default withStyles(styles)(DragHandler);

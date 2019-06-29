import React from 'react';
import PropTypes from 'prop-types';
import cls from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';
import initializeVisit from 'travel/models/visits/initialize';
import VisitEditDialog from 'travel/components/models/visits/VisitEditDialog';
import DragHandler from './DragHandler';

const styles = {
  dragHandler: {
    visibility: 'hidden',
  },
  draggableContainer: {
    '&:hover $dragHandler': {
      visibility: 'visible',
    },
  },
};

const VisitCreator = ({
  classes,
  isSorting,
  onVisitUpdate: handleVisitUpdate,
}) => (
  <div className={cls({ [classes.draggableContainer]: !isSorting })}>
    <span>Добавить поездку</span>
    <VisitEditDialog
      initialState={initializeVisit()}
      onSubmit={handleVisitUpdate}
    >
      <EditIcon />
    </VisitEditDialog>
    <DragHandler className={classes.dragHandler} />
  </div>
);

VisitCreator.propTypes = {
  classes: PropTypes.arrayOf(PropTypes.string).isRequired,
  isSorting: PropTypes.bool,
  onVisitUpdate: PropTypes.func.isRequired,
};

VisitCreator.defaultProps = {
  isSorting: false,
};

export default withStyles(styles)(VisitCreator);

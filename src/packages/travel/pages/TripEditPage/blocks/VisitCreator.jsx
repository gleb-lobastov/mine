import React from 'react';
import PropTypes from 'prop-types';
import cls from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import initializeVisit from 'travel/models/visits/initialize';
import VisitEditDialog from 'travel/components/models/visits/VisitEditDialog';
import DragHandler from './DragHandler';

const styles = {
  visibleOnlyOnHover: {
    visibility: 'hidden',
  },
  draggableContainer: {
    position: 'relative',
    '&:hover $visibleOnlyOnHover': {
      visibility: 'visible',
    },
  },
};

const VisitCreator = ({ classes, onVisitUpdate: handleVisitUpdate }) => (
  <div className={classes.draggableContainer}>
    <VisitEditDialog
      initialState={initializeVisit()}
      onSubmit={handleVisitUpdate}
    >
      <Button
        data-sort-handler="disabled"
        size="small"
        variant="outlined"
        color="primary"
      >
        <span>Добавить посещение</span>
      </Button>
    </VisitEditDialog>
    <DragHandler className={classes.visibleOnlyOnHover} />
  </div>
);

VisitCreator.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  onVisitUpdate: PropTypes.func.isRequired,
};

VisitCreator.defaultProps = {};

export default withStyles(styles)(VisitCreator);

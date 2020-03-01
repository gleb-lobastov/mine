import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import DragHandler from 'modules/components/DragHandler';
import { DIALOG_NAMES } from '../../../../../useTripEditPageDialogsState';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: '12px 0',
    cursor: 'grab',
    background: '#fff',
    padding: '12px',
    border: '1px solid #ccc',
    boxShadow: '0 2px 8px 0 rgba(0, 0, 0, 0.1), 0 0 1px 0 rgba(0, 0, 0, 0.2)',
    position: 'relative',
    '&:hover $visibleOnlyOnHover': {
      visibility: 'visible',
    },
  },
  visibleOnlyOnHover: {
    visibility: 'hidden',
  },
});

export default function VisitCreator({ showDialog }) {
  const classes = useStyles();
  return (
    <div className={classes.container} data-sort-handler="enabled">
      <Button
        data-sort-handler="disabled"
        size="small"
        variant="outlined"
        color="primary"
        onClick={() => showDialog(DIALOG_NAMES.VISIT_CREATE)}
      >
        <span>Добавить посещение</span>
      </Button>
      <DragHandler className={classes.visibleOnlyOnHover} />
    </div>
  );
}

VisitCreator.propTypes = {
  showDialog: PropTypes.func.isRequired,
};

VisitCreator.defaultProps = {};

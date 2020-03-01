import React from 'react';
import PropTypes from 'prop-types';
import cls from 'classnames';
import { makeStyles } from '@material-ui/core/styles';
import Actions from 'travel/components/common/Actions';
import VisitIcon from 'travel/components/models/visits/VisitIcon';
import visitPropTypes from 'travel/models/visits/propTypes';
import { DIALOG_NAMES } from '../../../../../useTripEditPageDialogsState';

const useStyles = makeStyles({
  container: {
    display: 'inline-block',
    marginRight: '4px',
    '&:hover $visibleOnHover': {
      visibility: 'visible',
    },
  },
  icon: {
    marginRight: '4px',
    display: 'inline-block',
    verticalAlign: 'text-bottom',
  },
  visibleOnHover: {
    visibility: 'hidden',
  },
});

const Visit = ({ formVisit, showDialog }) => {
  const classes = useStyles();
  if (!formVisit) {
    return 'Не указано';
  }

  const { visitId, locationName } = formVisit;

  return (
    <div className={classes.container}>
      <VisitIcon visit={formVisit} className={classes.icon} />
      {locationName}
      <Actions
        className={classes.visibleOnHover}
        isEntityExist={true}
        onEditClick={() => showDialog(DIALOG_NAMES.VISIT_EDIT, visitId)}
        onDeleteClick={() => showDialog(DIALOG_NAMES.VISIT_DELETE, visitId)}
      />
    </div>
  );
};

Visit.propTypes = {
  visit: PropTypes.shape(visitPropTypes),
};

Visit.defaultProps = {
  visit: {},
};

export default Visit;

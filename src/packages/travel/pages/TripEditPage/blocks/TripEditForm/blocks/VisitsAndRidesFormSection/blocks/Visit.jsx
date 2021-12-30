import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Actions from 'travel/components/Actions';
import VisitIcon from 'travel/components/VisitIcon';
import { DIALOG_NAMES } from '../../../../../useTripEditPageDialogs';
import * as locators from '../../../../../locators';

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

const Visit = ({ visit, showDialog }) => {
  const classes = useStyles();
  if (!visit) {
    return 'Не указано';
  }

  const { locationName } = visit;

  return (
    <div className={classes.container} data-locator={locators.VISIT_BLOCK}>
      <VisitIcon visit={visit} className={classes.icon} />
      {locationName}
      <Actions
        className={classes.visibleOnHover}
        isEntityExist={true}
        onEditClick={() => showDialog(DIALOG_NAMES.VISIT_EDIT, visit)}
        onDeleteClick={() => showDialog(DIALOG_NAMES.VISIT_DELETE, visit)}
      />
    </div>
  );
};

Visit.defaultProps = {
  visit: {},
};

export default Visit;

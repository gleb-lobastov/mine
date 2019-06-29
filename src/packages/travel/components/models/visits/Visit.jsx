import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import LocationCityIcon from '@material-ui/icons/LocationCity';
import TransferWithinAStationIcon from '@material-ui/icons/TransferWithinAStation';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import DomainIcon from '@material-ui/icons/Domain';
import EditIcon from '@material-ui/icons/Edit';
import VisitEditDialog from 'travel/components/models/visits/VisitEditDialog';
import visitPropTypes from 'travel/models/visits/propTypes';

const resolveVisitIconComponent = visitType => {
  switch (visitType) {
    case 'Transit':
      return TransferWithinAStationIcon;
    case 'BaseCamp':
      return DomainIcon;
    case 'Relocation':
      return LocalShippingIcon;
    case 'Regular':
    default:
      return LocationCityIcon;
  }
};

const Visit = ({ visit, onVisitUpdate: handleVisitUpdate, classes }) => {
  if (!visit) {
    return 'Не указано';
  }
  const { locationName, visitType } = visit;
  const Icon = resolveVisitIconComponent(visitType);
  return (
    <div className={classes.container}>
      {Icon && <Icon className={classes.icon} />}
      {locationName}
      <VisitEditDialog
        initialState={visit}
        onSubmit={updatedVisit =>
          handleVisitUpdate({ ...visit, ...updatedVisit })
        }
      >
        <EditIcon />
      </VisitEditDialog>
    </div>
  );
};

const styles = {
  container: {
    display: 'inline-block',
    marginRight: '4px',
  },
  icon: {
    marginRight: '4px',
    display: 'inline-block',
    verticalAlign: 'text-bottom',
  },
};

Visit.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  visit: PropTypes.shape(visitPropTypes),
  onVisitUpdate: PropTypes.func.isRequired,
};

Visit.defaultProps = {
  visit: {},
};

export default withStyles(styles)(Visit);

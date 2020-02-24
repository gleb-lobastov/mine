import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import LocationCityIcon from '@material-ui/icons/LocationCity';
import TransferWithinAStationIcon from '@material-ui/icons/TransferWithinAStation';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import DomainIcon from '@material-ui/icons/Domain';
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

const Visit = ({ visit, classes }) => {
  console.log({ visit });

  if (!visit) {
    return 'Не указано';
  }
  const { locationName, visitType } = visit;
  const Icon = resolveVisitIconComponent(visitType);
  return (
    <div className={classes.container}>
      {Icon && <Icon className={classes.icon} />}
      {locationName}
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
  editIcon: {},
};

Visit.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  visit: PropTypes.shape(visitPropTypes),
};

Visit.defaultProps = {
  visit: {},
};

export default withStyles(styles)(Visit);

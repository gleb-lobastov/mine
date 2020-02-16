import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import LocationCityIcon from '@material-ui/icons/LocationCity';
import TransferWithinAStationIcon from '@material-ui/icons/TransferWithinAStation';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import DomainIcon from '@material-ui/icons/Domain';
import Path from 'modules/utilities/routing/Path';
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

const Visit = ({ visit, classes, locationsPath }) => {
  if (!visit) {
    return 'Не указано';
  }
  const { locationName, visitType, locationId } = visit;
  const Icon = resolveVisitIconComponent(visitType);
  return (
    <div className={classes.container}>
      {Icon && <Icon className={classes.icon} />}
      <Link to={locationsPath.toUrl({ strLocationId: String(locationId) })}>
        {locationName}
      </Link>
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
  locationsPath: PropTypes.instanceOf(Path).isRequired,
};

Visit.defaultProps = {
  visit: {},
};

export default withStyles(styles)(Visit);

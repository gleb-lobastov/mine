import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import LocationCityIcon from '@material-ui/icons/LocationCity';
import TransferWithinAStationIcon from '@material-ui/icons/TransferWithinAStation';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import DomainIcon from '@material-ui/icons/Domain';
import visitPropTypes from 'travel/models/visits/propTypes';

const useStyles = makeStyles({
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
});

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

const Visit = ({ formVisit }) => {
  const classes = useStyles();
  if (!formVisit) {
    return 'Не указано';
  }
  const { locationName, visitType } = formVisit;
  const Icon = resolveVisitIconComponent(visitType);
  return (
    <div className={classes.container}>
      {Icon && <Icon className={classes.icon} />}
      {locationName}
    </div>
  );
};

Visit.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  visit: PropTypes.shape(visitPropTypes),
};

Visit.defaultProps = {
  visit: {},
};

export default Visit;

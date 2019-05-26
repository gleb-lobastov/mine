import React from 'react';
import PropTypes from 'prop-types';
import cls from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import BikeIcon from '@material-ui/icons/DirectionsBike';
import BoatIcon from '@material-ui/icons/DirectionsBoat';
import BusIcon from '@material-ui/icons/DirectionsBus';
import CarIcon from '@material-ui/icons/DirectionsCar';
import CustomTransportIcon from '@material-ui/icons/Commute';
import FlightIcon from '@material-ui/icons/Flight';
import MotorcycleIcon from '@material-ui/icons/Motorcycle';
import TerrainIcon from '@material-ui/icons/Terrain';
import TrainIcon from '@material-ui/icons/Train';
import TruckIcon from '@material-ui/icons/LocalShipping';
import VanIcon from '@material-ui/icons/AirportShuttle';
import WalkIcon from '@material-ui/icons/DirectionsWalk';
import UnknownRideIcon from '@material-ui/icons/NotListedLocation';

const resolveRideIconComponent = vehicleTypeId => {
  switch (vehicleTypeId) {
    case 1:
      return CarIcon;
    case 2:
      return TrainIcon;
    case 3:
      return FlightIcon;
    case 4:
      return BusIcon;
    case 5:
      return VanIcon;
    case 6:
      return TrainIcon;
    case 7:
      return BoatIcon;
    case 8:
      return BikeIcon;
    case 9:
      return WalkIcon;
    case 12:
      return MotorcycleIcon;
    case 13:
      return TruckIcon;
    case 14:
      return TerrainIcon;
    case 10:
    case 11:
    default:
      return CustomTransportIcon;
  }
};

export const styles = {
  container: {
    display: 'inline-block',
  },
  icon: {
    marginRight: '4px',
    display: 'inline-block',
    verticalAlign: 'text-bottom',
  },
  details: {
    marginRight: '4px',
  },
};

const resolveDateTimeString = (departureDateTime, arrivalDateTime) => {
  const arrivalDateTimeString =
    Boolean(arrivalDateTime) && arrivalDateTime.toLocaleDateString();
  const departureDateTimeString =
    Boolean(departureDateTime) && departureDateTime.toLocaleDateString();
  if (arrivalDateTimeString === departureDateTimeString) {
    return arrivalDateTimeString;
  }
  return `${departureDateTimeString}—${arrivalDateTimeString}`;
};

const Ride = ({
  classes,
  className,
  ride: { rideId, vehicleTypeId, arrivalDateTime, departureDateTime },
  showDetails,
}) => {
  if (!rideId) {
    if (!showDetails) {
      return null;
    }
    return (
      <div className={cls(className, classes.container)}>
        <UnknownRideIcon className={classes.icon} />
      </div>
    );
  }
  const Icon = resolveRideIconComponent(vehicleTypeId);

  return (
    <div className={cls(className, classes.container)}>
      <Icon className={classes.icon} />
      {showDetails && (
        <span className={classes.details}>
          {resolveDateTimeString(departureDateTime, arrivalDateTime)}
        </span>
      )}
    </div>
  );
};

Ride.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  ride: PropTypes.shape({}),
  showDetails: PropTypes.bool,
};

Ride.defaultProps = { ride: {}, className: undefined, showDetails: false };

export default withStyles(styles)(Ride);

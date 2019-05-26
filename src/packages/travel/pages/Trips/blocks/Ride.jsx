import React from 'react';
import PropTypes from 'prop-types';
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

const Ride = ({ ride: { rideId, vehicleTypeId, arrivalDateTime } }) => {
  if (!rideId) {
    return null;
  }
  const Icon = resolveRideIconComponent(vehicleTypeId);
  return (
    <div>
      <Icon />
      {arrivalDateTime && <span>{arrivalDateTime.toLocaleDateString()}</span>}
    </div>
  );
};

Ride.propTypes = {
  ride: PropTypes.shape({}),
};

Ride.defaultProps = { ride: {} };

export default Ride;

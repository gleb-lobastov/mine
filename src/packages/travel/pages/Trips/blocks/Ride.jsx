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
import { VEHICLE_TYPES } from 'travel/models/rides/consts';
import RideInputDialog from './RideInputDialog';

const resolveRideIconComponent = vehicleType => {
  switch (vehicleType) {
    case VEHICLE_TYPES.CAR:
      return CarIcon;
    case VEHICLE_TYPES.TRAIN:
      return TrainIcon;
    case VEHICLE_TYPES.AIRCRAFT:
      return FlightIcon;
    case VEHICLE_TYPES.BUS:
      return BusIcon;
    case VEHICLE_TYPES.MOTORHOME:
      return VanIcon;
    case VEHICLE_TYPES.LOCAL_TRAIN:
      return TrainIcon;
    case VEHICLE_TYPES.FERRY:
      return BoatIcon;
    case VEHICLE_TYPES.BIKE:
      return BikeIcon;
    case VEHICLE_TYPES.BY_FEET:
      return WalkIcon;
    case VEHICLE_TYPES.MOTORBIKE:
      return MotorcycleIcon;
    case VEHICLE_TYPES.TRUCK:
      return TruckIcon;
    case VEHICLE_TYPES.ALL_TERRAIN_VEHICLE:
      return TerrainIcon;
    case VEHICLE_TYPES.ROPEWAY:
    case VEHICLE_TYPES.FUNICULAR:
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
  editDialogTrigger: {
    display: 'inline-block',
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
  isEditable,
  onRideUpdate: handleRideUpdate,
  classes,
  visitsByTrip,
  visitId,
  className,
  ride,
  ride: { rideId, vehicleType, arrivalDateTime, departureDateTime },
  showDetails,
  locationsDict,
}) => {
  const Icon = rideId ? resolveRideIconComponent(vehicleType) : UnknownRideIcon;
  const iconNode = <Icon className={classes.icon} />;

  return (
    <div className={cls(className, classes.container)}>
      {!isEditable ? (
        iconNode
      ) : (
        <RideInputDialog
          ride={ride}
          locationsDict={locationsDict}
          visitId={visitId}
          visitsByTrip={visitsByTrip}
          className={classes.editDialogTrigger}
          onSubmit={updatedRide =>
            handleRideUpdate({ ...ride, ...updatedRide })
          }
        >
          {iconNode}
        </RideInputDialog>
      )}
      {Boolean(rideId && showDetails) && (
        <span className={classes.details}>
          {resolveDateTimeString(departureDateTime, arrivalDateTime)}
        </span>
      )}
    </div>
  );
};

Ride.propTypes = {
  onRideUpdate: PropTypes.func.isRequired,
  className: PropTypes.string,
  isEditable: PropTypes.bool,
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  ride: PropTypes.shape({}),
  showDetails: PropTypes.bool,
};

Ride.defaultProps = {
  isEditable: true,
  ride: {},
  className: undefined,
  showDetails: false,
};

export default withStyles(styles)(Ride);

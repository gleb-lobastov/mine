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
import TramIcon from '@material-ui/icons/Tram';
import LocalTaxiIcon from '@material-ui/icons/LocalTaxi';
import SubwayIcon from '@material-ui/icons/Subway';
import SeatIcon from '@material-ui/icons/AirlineSeatReclineNormal';
import HichHikingIcon from '@material-ui/icons/ThumbUp';
import UnknownRideIcon from '@material-ui/icons/NotListedLocation';
import arrivalDepartureDateTimeToString from 'modules/utilities/dateTime/arrivalDepartureDateTimeToString';
import { VEHICLE_TYPES, RIDE_TYPES } from 'travel/models/rides/consts';
import locationsPropTypes from 'travel/models/locations/propTypes';
import ridePropTypes from 'travel/models/rides/propTypes';
import visitPropTypes from 'travel/models/visits/propTypes';
import initializeRide from 'travel/models/rides/initialize';
import RideEditDialog from 'travel/components/models/rides/RideEditDialog';

const resolveRideIconComponent = vehicleType => {
  switch (vehicleType) {
    case VEHICLE_TYPES.CAR:
      return CarIcon;
    case VEHICLE_TYPES.TRAIN:
      return TrainIcon;
    case VEHICLE_TYPES.AIRCRAFT:
      return FlightIcon;
    case VEHICLE_TYPES.BUS:
    case VEHICLE_TYPES.TROLLEY:
    case VEHICLE_TYPES.CITY_BUS:
      return BusIcon;
    case VEHICLE_TYPES.MOTORHOME:
    case VEHICLE_TYPES.JITNEY:
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
    case VEHICLE_TYPES.TRAM:
      return TramIcon;
    case VEHICLE_TYPES.TAXI:
      return LocalTaxiIcon;
    case VEHICLE_TYPES.SUBWAY:
      return SubwayIcon;
    case VEHICLE_TYPES.PUBLIC_TRANSPORT:
      return SeatIcon;
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

const Ride = ({
  availableVisits,
  originLocation,
  classes,
  className,
  defaultArrivalVisitId,
  defaultDepartureVisitId,
  isEditable,
  onRideUpdate: handleRideUpdate,
  ride,
  ride: { rideId, vehicleType, rideType, arrivalDateTime, departureDateTime },
  showDetails,
}) => {
  const rideInitialState = rideId
    ? ride
    : initializeRide({
        defaultDepartureVisitId,
        defaultArrivalVisitId,
      });

  const Icon = rideId ? resolveRideIconComponent(vehicleType) : UnknownRideIcon;

  const iconNode = <Icon className={classes.icon} />;
  const rideNode = isEditable ? (
    <RideEditDialog
      className={classes.editDialogTrigger}
      initialState={rideInitialState}
      availableVisits={availableVisits}
      onSubmit={updatedRide => handleRideUpdate({ ...ride, ...updatedRide })}
      originLocation={originLocation}
    >
      {iconNode}
    </RideEditDialog>
  ) : (
    iconNode
  );

  return (
    <div className={cls(className, classes.container)}>
      {rideType === RIDE_TYPES.HITCH_HIKING && (
        <HichHikingIcon className={classes.icon} />
      )}
      {rideNode}
      {Boolean(rideId && showDetails) && (
        <span className={classes.details}>
          {arrivalDepartureDateTimeToString(departureDateTime, arrivalDateTime)}
        </span>
      )}
    </div>
  );
};

Ride.propTypes = {
  availableVisits: PropTypes.arrayOf(PropTypes.shape(visitPropTypes)),
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  className: PropTypes.string,
  defaultArrivalVisitId: PropTypes.number,
  defaultDepartureVisitId: PropTypes.number,
  isEditable: PropTypes.bool,
  onRideUpdate: PropTypes.func.isRequired,
  originLocation: PropTypes.shape(locationsPropTypes).isRequired,
  ride: PropTypes.shape(ridePropTypes),
  showDetails: PropTypes.bool,
};

Ride.defaultProps = {
  availableVisits: [],
  className: undefined,
  defaultArrivalVisitId: undefined,
  defaultDepartureVisitId: undefined,
  isEditable: true,
  ride: {},
  showDetails: false,
};

export default withStyles(styles)(Ride);

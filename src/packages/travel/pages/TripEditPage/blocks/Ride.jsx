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
import { rideDateTimePeriodToString } from 'modules/utilities/dateTime/dateTimePeriodToString';
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
  container: {},
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

const Ride = ({formikProps,
  availableVisits,
  originLocation,
  classes,
  className,
  onRideUpdate: handleRideUpdate,
  ride,
  ride: { rideId, vehicleType, rideType, arrivalDateTime, departureDateTime },
}) => {
  const Icon = rideId ? resolveRideIconComponent(vehicleType) : UnknownRideIcon;

  const iconNode = <Icon className={classes.icon} />;
  const rideNode = (
    <RideEditDialog
      className={classes.editDialogTrigger}
      formikProps={formikProps}
      availableVisits={availableVisits}
      originLocation={originLocation}
    >
      {iconNode}
    </RideEditDialog>
  );

  return (
    <div className={cls(className, classes.container)}>
      {rideNode}
      {Boolean(rideId) && (
        <span className={classes.details}>
          {rideDateTimePeriodToString({ departureDateTime, arrivalDateTime })}
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
  onRideUpdate: PropTypes.func.isRequired,
  originLocation: PropTypes.shape(locationsPropTypes).isRequired,
  ride: PropTypes.shape(ridePropTypes),
};

Ride.defaultProps = {
  availableVisits: [],
  className: undefined,
  defaultArrivalVisitId: undefined,
  defaultDepartureVisitId: undefined,
  ride: {},
};

export default withStyles(styles)(Ride);

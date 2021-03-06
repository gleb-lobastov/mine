import React from 'react';
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
import UnknownRideIcon from '@material-ui/icons/NotListedLocation';
import { VEHICLE_TYPES } from 'travel/models/rides/consts';

export default function RideIcon({ ride: { vehicleType }, className }) {
  const IconComponent = resolveRideIconComponent(vehicleType);
  return <IconComponent className={className} />;
}

function resolveRideIconComponent(vehicleType) {
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
      return CustomTransportIcon;
    default:
      return UnknownRideIcon;
  }
}

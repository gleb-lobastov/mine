import startOfDay from 'date-fns/startOfDay';
import endOfDay from 'date-fns/endOfDay';
import {
  VEHICLE_TYPES,
  RIDE_OCCUPATION,
  RIDE_CLASSES,
  RIDE_TYPES,
} from 'travel/models/rides/consts';

export default ({
  defaultDepartureVisitId = null,
  defaultArrivalVisitId = null,
} = {}) => ({
  departureVisitId: defaultDepartureVisitId,
  arrivalVisitId: defaultArrivalVisitId,
  vehicleType: VEHICLE_TYPES.AIRCRAFT,
  rideType: RIDE_TYPES.SCHEDULED,
  rideComment: '',
  rideClass: RIDE_CLASSES.ECONOMY,
  rideOccupation: RIDE_OCCUPATION.PASSENGER,
  departureDateTime: startOfDay(new Date()),
  arrivalDateTime: endOfDay(new Date()),
});

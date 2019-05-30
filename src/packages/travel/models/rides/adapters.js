export const toClient = ({
  arrival_date_time: rawArrivalDateTime,
  departure_date_time: rawDepartureDateTime,
  arrival_visit_id: rawArrivalVisitId,
  departure_visit_id: rawDepartureVisitId,
  id: rawRideId,
  ride_class: rawRideClass,
  ride_occupation: rawRideOccupation,
  ride_type: rawRideType,
  vehicle_type: rawVehicleType,
}) => ({
  arrivalDateTime: new Date(rawArrivalDateTime),
  arrivalVisitId: rawArrivalVisitId,
  departureDateTime: new Date(rawDepartureDateTime),
  departureVisitId: rawDepartureVisitId,
  rideId: rawRideId,
  rideType: rawRideType,
  rideClass: rawRideClass,
  rideOccupation: rawRideOccupation,
  vehicleType: rawVehicleType,
});

export const toServer = (requestBody, { isProvision } = {}) => {
  if (isProvision) {
    return undefined;
  }
  const {
    arrivalDateTime: rawArrivalDateTime,
    arrivalVisitId: rawArrivalVisitId,
    departureDateTime: rawDepartureDateTime,
    departureVisitId: rawDepartureVisitId,
    rideClass: rawRideClass,
    rideId: rawRideId,
    rideOccupation: rawRideOccupation,
    rideType: rawRideType,
    vehicleType: rawVehicleType,
  } = requestBody || {};

  return {
    arrival_date_time: rawArrivalDateTime,
    arrival_visit_id: rawArrivalVisitId,
    departure_date_time: rawDepartureDateTime,
    departure_visit_id: rawDepartureVisitId,
    id: rawRideId,
    ride_class: rawRideClass,
    ride_occupation: rawRideOccupation,
    ride_type: rawRideType,
    vehicle_type: rawVehicleType,
  };
};

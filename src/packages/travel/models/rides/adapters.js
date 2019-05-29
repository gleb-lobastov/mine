export const toClient = ({
  arrival_date_time: rawArrivalDateTime,
  departure_date_time: rawDepartureDateTime,
  id: rawRideId,
  ride_class: rawRideClass,
  ride_occupation: rawRideOccupation,
  ride_type: rawRideType,
  vehicle_type: rawVehicleType,
}) => ({
  arrivalDateTime: new Date(rawArrivalDateTime),
  departureDateTime: new Date(rawDepartureDateTime),
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
    arrivalToVisitId: rawArrivalToVisitId,
    departureDateTime: rawDepartureDateTime,
    departureFromVisitId: rawDepartureFromVisitId,
    rideClass: rawRideClass,
    rideId: rawRideId,
    rideOccupation: rawRideOccupation,
    rideType: rawRideType,
    vehicleType: rawVehicleType,
  } = requestBody || {};

  return {
    arrival_date_time: rawArrivalDateTime,
    arrival_to_visit_id: rawArrivalToVisitId,
    departure_date_time: rawDepartureDateTime,
    departure_from_visit_id: rawDepartureFromVisitId,
    id: rawRideId,
    ride_class: rawRideClass,
    ride_occupation: rawRideOccupation,
    ride_type: rawRideType,
    vehicle_type: rawVehicleType,
  };
};

/* eslint-disable camelcase */
// todo move adapters to corresponding packages

export const articlesAdapter = ({
  content: rawContent,
  created_at: rawDate,
  header: rawHeader,
  id: rawArticleId,
}) => ({
  content: rawContent.replace(/\\n/g, '\n'),
  date: rawDate,
  header: rawHeader,
  id: rawArticleId,
});

export const visitsAdapter = ({
  arrival_ride_id: rawArrivalRideId,
  departure_ride_id: rawDepartureRideId,
  id: rawVisitId,
  location_id: rawLocationId,
  order_in_trip: rawOrderInTrip,
  trip_id: rawTripId,
  visit_type: rawVisitType,
}) => ({
  arrivalRideId: rawArrivalRideId,
  departureRideId: rawDepartureRideId,
  locationId: rawLocationId,
  orderInTrip: rawOrderInTrip,
  tripId: rawTripId,
  visitId: rawVisitId,
  visitType: rawVisitType,
});

export const tripsAdapter = ({
  trip_name: rawTripName,
  id: rawTripId,
  origin_location_id: rawOriginLocationId,
}) => ({
  tripName: rawTripName,
  tripId: rawTripId,
  originLocationId: rawOriginLocationId,
});

export const locationsAdapter = ({
  country_name: rawCountryName,
  location_name: rawLocationName,
  id: rawLocationId,
}) => ({
  countryName: rawCountryName,
  locationName: rawLocationName,
  locationId: rawLocationId,
});

export const ridesAdapter = ({
  arrival_date_time: rawArrivalDateTime,
  departure_date_time: rawDepartureDateTime,
  id: rawRideId,
  ride_type: rawRideType,
  ride_class: rawRideClass,
  ride_occupation: rawRideOccupation,
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

export const ridesToServerAdapter = (requestBody, { isProvision } = {}) => {
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

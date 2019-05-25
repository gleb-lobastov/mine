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
  id: rawVisitId,
  location_id: rawLocationId,
  order_in_trip: rawOrderInTrip,
  trip_id: rawTripId,
  visit_type: rawVisitType
}) => ({
  locationId: rawLocationId,
  orderInTrip: rawOrderInTrip,
  tripId: rawTripId,
  visitId: rawVisitId,
  visitType: rawVisitType
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
  arrival: rawArrival,
  departure: rawDeparture,
  id: rawRideId,
  vehicle_name: rawVehicleName,
}) => ({
  arrivalDateTime: new Date(rawArrival),
  departureDateTime: new Date(rawDeparture),
  rideId: rawRideId,
  vehicleName: rawVehicleName,
});

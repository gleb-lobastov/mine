export const toClient = ({
  arrival_ride_id: rawArrivalRideId,
  departure_ride_id: rawDepartureRideId,
  id: rawVisitId,
  location_id: rawLocationId,
  country_id: rawCountryId,
  location_name: rawLocationName,
  order_in_trip: rawOrderInTrip,
  trip_id: rawTripId,
  visit_type: rawVisitType,
  visit_comment: rawVisitComment,
}) => ({
  arrivalRideId: rawArrivalRideId,
  departureRideId: rawDepartureRideId,
  countryId: rawCountryId,
  locationId: rawLocationId,
  locationName: rawLocationName,
  orderInTrip: rawOrderInTrip,
  tripId: rawTripId,
  visitId: rawVisitId,
  visitType: rawVisitType,
  visitComment: rawVisitComment,
});

export const toServer = (requestBody, { isProvision } = {}) => {
  if (isProvision) {
    return undefined;
  }
  const {
    locationId: rawLocationId,
    orderInTrip: rawOrderInTrip,
    tripId: rawTripId,
    visitId: rawVisitId,
    visitType: rawVisitType,
    visitComment: rawVisitComment,
  } = requestBody || {};

  return {
    id: rawVisitId,
    location_id: rawLocationId,
    order_in_trip: rawOrderInTrip,
    trip_id: rawTripId,
    visit_type: rawVisitType,
    visit_comment: rawVisitComment,
  };
};

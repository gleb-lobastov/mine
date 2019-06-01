export const toClient = ({
  arrival_ride_id: rawArrivalRideId,
  departure_ride_id: rawDepartureRideId,
  id: rawVisitId,
  location_id: rawLocationId,
  location_name: rawLocationName,
  order_in_trip: rawOrderInTrip,
  trip_id: rawTripId,
  visit_type: rawVisitType,
}) => ({
  arrivalRideId: rawArrivalRideId,
  departureRideId: rawDepartureRideId,
  locationId: rawLocationId,
  locationName: rawLocationName,
  orderInTrip: rawOrderInTrip,
  tripId: rawTripId,
  visitId: rawVisitId,
  visitType: rawVisitType,
});

export const toServer = () => undefined;

export const toClient = ({
  id: rawTripId,
  origin_location_id: rawOriginLocationId,
  trip_name: rawTripName,
}) => ({
  originLocationId: rawOriginLocationId,
  tripId: rawTripId,
  tripName: rawTripName,
});

export const toServer = () => undefined;

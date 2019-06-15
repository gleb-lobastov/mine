export const toClient = ({
  id: rawTripId,
  origin_location_id: rawOriginLocationId,
  trip_name: rawTripName,
  trip_type: rawTripType,
}) => ({
  originLocationId: rawOriginLocationId,
  tripId: rawTripId,
  tripName: rawTripName,
  tripType: rawTripType,
});

export const toServer = (requestBody, { isProvision } = {}) => {
  if (isProvision) {
    return undefined;
  }
  const {
    originLocationId: rawOriginLocationId,
    tripId: rawTripId,
    tripName: rawTripName,
    tripType: rawTripType,
  } = requestBody || {};

  return {
    id: rawTripId,
    origin_location_id: rawOriginLocationId,
    trip_name: rawTripName,
    trip_type: rawTripType,
  };
};

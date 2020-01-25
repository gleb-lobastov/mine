export const toClient = ({
  id: rawTripId,
  origin_location_id: rawOriginLocationId,
  trip_name: rawTripName,
  trip_type: rawTripType,
  visits: rawVisits,
  rides: rawRides,
}) => ({
  originLocationId: rawOriginLocationId,
  tripId: rawTripId,
  tripName: rawTripName,
  tripType: rawTripType,
  visits: rawVisits,
  rides: rawRides,
});

export const toServer = (requestBody, { isProvision } = {}) => {
  if (isProvision) {
    return undefined;
  }
  const {
    originLocationId: rawOriginLocationId,
    originGeonameId: rawOriginGeonameId,
    tripId: rawTripId,
    tripName: rawTripName,
    tripType: rawTripType,
  } = requestBody || {};

  return {
    id: rawTripId,
    origin_location_id: rawOriginLocationId,
    origin_geoname_id: rawOriginGeonameId,
    trip_name: rawTripName,
    trip_type: rawTripType,
  };
};

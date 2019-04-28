/* eslint-disable camelcase */
// todo move adapters to corresponding packages

export const articlesAdapter = ({ created_at: date, header, content, id }) => ({
  date,
  header,
  content: content.replace(/\\n/g, '\n'),
  id,
});

export const visitsAdapter = ({ id, location_id, trip_id }) => ({
  tripId: trip_id,
  locationId: location_id,
  visitId: id,
});

export const tripsAdapter = ({ trip_name: rawTripName, id: rawTripId }) => ({
  tripName: rawTripName,
  tripId: rawTripId,
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

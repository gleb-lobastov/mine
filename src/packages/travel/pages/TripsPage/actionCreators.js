/* eslint-disable import/prefer-default-export */

export const submitTrip = ({ trip, trip: { tripId } }) => ({
  domain: 'tripsPage.visits.trips',
  modelName: 'trips',
  query: {
    id: tripId,
    body: trip,
  },
});

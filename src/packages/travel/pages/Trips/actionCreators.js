import createOrderCalculator from 'modules/utilities/algorithms/createOrderCalculator';

const calcOrder = createOrderCalculator({
  orderResolver: ({ orderInTrip }) => orderInTrip,
});

export const submitOrderInTrip = ({ oldIndex, newIndex, collection }) => ({
  modelName: 'visits',
  query: {
    id: collection[oldIndex].visitId,
    body: {
      orderInTrip: calcOrder({ index: newIndex, collection }),
    },
  },
  meta: {
    domain: 'trips.visits.sort',
  },
});

export const submitRide = ({ ride, ride: { rideId } }) => ({
  modelName: 'rides',
  query: {
    id: rideId,
    body: ride,
  },
  meta: {
    domain: 'trips.visits.rides',
  },
});

export const submitTrip = ({ trip, trip: { tripId } }) => ({
  modelName: 'trips',
  query: {
    id: tripId,
    body: trip,
  },
  meta: {
    domain: 'trips.visits.trips',
  },
});

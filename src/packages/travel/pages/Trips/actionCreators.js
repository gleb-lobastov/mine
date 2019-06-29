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

export const submitVisit = ({
  visit,
  visit: { visitId },
  tripId,
  indexInCollection,
  collection,
}) => ({
  modelName: 'visits',
  query: {
    id: visitId,
    body: {
      ...visit,
      tripId,
      orderInTrip:
        indexInCollection || indexInCollection === 0
          ? calcOrder({ index: indexInCollection, collection })
          : undefined,
    },
  },
  meta: {
    domain: 'trips.visits.visit',
  },
});

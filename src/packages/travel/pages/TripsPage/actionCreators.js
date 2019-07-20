import createOrderCalculator from 'modules/utilities/algorithms/createOrderCalculator';

const calcOrder = createOrderCalculator({
  orderResolver: ({ orderInTrip }) => orderInTrip,
});

export const submitOrderInTrip = ({ oldIndex, newIndex, collection }) => ({
  domain: 'tripsPage.visits.sort',
  modelName: 'visits',
  query: {
    id: collection[oldIndex].visitId,
    body: {
      orderInTrip: calcOrder({ index: newIndex, collection }),
    },
  },
});

export const submitRide = ({ ride, ride: { rideId } }) => ({
  domain: 'tripsPage.visits.rides',
  modelName: 'rides',
  query: {
    id: rideId,
    body: ride,
  },
});

export const submitTrip = ({ trip, trip: { tripId } }) => ({
  domain: 'tripsPage.visits.trips',
  modelName: 'trips',
  query: {
    id: tripId,
    body: trip,
  },
});

export const submitVisit = ({
  visit,
  visit: { visitId },
  tripId,
  indexInCollection,
  collection,
}) => ({
  domain: 'tripsPage.visits.visit',
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
});

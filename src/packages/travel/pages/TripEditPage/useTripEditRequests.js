import { useCallback } from 'react';
import { useRequest } from 'core/connection';
import createOrderCalculator from 'modules/utilities/algorithms/createOrderCalculator';

const calcOrder = createOrderCalculator({
  orderResolver: ({ orderInTrip }) => orderInTrip,
});

const domain = 'travel.TripEditPage';

export default function useTripEditRequests() {
  const [submitVisitsOrder] = useRequest({
    domain: `${domain}.order`,
    modelName: 'visits',
  });
  const handleSubmitVisitsOrder = useCallback(
    (event, { oldIndex, newIndex, collection }) => {
      if (oldIndex !== newIndex) {
        submitVisitsOrder({
          query: {
            id: collection[oldIndex].visitId,
            body: {
              orderInTrip: calcOrder({ index: newIndex, collection }),
            },
          },
        });
      }
    },
    [],
  );

  const [submitRide] = useRequest({
    domain: `${domain}.rides`,
    modelName: 'rides',
  });
  const handleSubmitRide = useCallback(
    ride =>
      submitRide({
        query: {
          id: ride.rideId,
          body: ride,
        },
      }),
    [],
  );

  const [submitTrip] = useRequest({
    domain: `${domain}.trips`,
    modelName: 'trips',
  });
  const handleSubmitTrip = useCallback(
    trip =>
      submitTrip({
        query: {
          id: trip.tripId,
          body: trip,
        },
      }),
    //.then(() => invalidateRequest({ domain: 'tripsPage.trips' })),
    [],
  );

  const [submitVisit] = useRequest({
    domain: `${domain}.visits`,
    modelName: 'visits',
  });

  const handleSubmitVisit = useCallback(
    (visit, { indexInCollection, collection, tripId } = {}) =>
      submitVisit({
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
      }),
    //.then(() => invalidateRequest({ domain: 'tripsPage.visits' })),
    [],
  );

  return {
    handleSubmitRide,
    handleSubmitTrip,
    handleSubmitVisit,
    handleSubmitVisitsOrder,
  };
}

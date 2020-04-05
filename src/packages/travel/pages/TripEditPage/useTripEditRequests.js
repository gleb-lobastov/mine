import { useCallback } from 'react';
import { useRequest } from 'core/connection';
import createOrderCalculator from 'modules/utilities/algorithms/createOrderCalculator';

const calcOrder = createOrderCalculator({
  orderResolver: ({ orderInTrip }) => orderInTrip,
});

const domain = 'travel.TripEditPage';

export default function useTripEditRequests(invalidate) {
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
      }).then(invalidate),
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
      }).finally(invalidate),
    [],
  );

  const [submitVisit] = useRequest({
    domain: `${domain}.visits`,
    modelName: 'visits',
  });

  const handleSubmitVisit = useCallback(
    visit =>
      submitVisit({
        query: {
          id: visit.visitId,
          body: visit,
        },
      }).then(invalidate),
    [],
  );

  const [deleteVisit] = useRequest({
    domain: `${domain}.visits`,
    modelName: 'visits',
  });

  const handleDeleteVisit = useCallback(
    visitId =>
      deleteVisit({
        method: 'DELETE',
        query: {
          id: visitId,
        },
      }).then(invalidate),
    [],
  );

  return {
    handleSubmitRide,
    handleSubmitTrip,
    handleSubmitVisit,
    handleDeleteVisit,
  };
}

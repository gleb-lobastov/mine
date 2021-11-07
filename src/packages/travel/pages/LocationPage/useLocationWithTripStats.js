import useLocation from 'travel/dataSource/useLocation';
import { useTripsStats } from 'travel/dataSource/useTrips';
import { useLocationRatingRequest } from 'travel/dataSource/useLocations';

export default function useLocationWithTripStats({
  domain,
  userAlias,
  locationId,
}) {
  const tripsStatsProvision = useTripsStats({
    userAlias,
  });

  const {
    isError: isTripsError,
    isPending: isTripsPending,
    isReady: isTripsReady,
    locationsIds,
    visitsDict,
    visitsIds,
    locationsRating,
  } = tripsStatsProvision;

  const {
    location,
    provision: { isError, isPending, isReady, ...restProvision },
  } = useLocation({ domain, locationId });

  const { submitLocationRating } = useLocationRatingRequest({ domain });

  const isVisited = locationsIds.includes(locationId);

  return {
    provision: {
      isError: isError || isTripsError,
      isPending: isPending || isTripsPending,
      isReady: isReady || isTripsReady,
      ...restProvision,
    },
    location,
    isVisited,
    visitsList: isVisited
      ? visitsIds
          .map(visitId => visitsDict[visitId])
          .filter(
            ({ locationId: visitLocationId }) => visitLocationId === locationId,
          )
      : [],
    locationRating: (isVisited && locationsRating[locationId]) || null,
    submitLocationRating,
    tripsStatsProvision,
  };
}

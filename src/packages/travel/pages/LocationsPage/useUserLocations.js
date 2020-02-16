import useUser from 'travel/dataSource/useUser';
import { useTripsStats } from 'travel/dataSource/useTrips';
import { useLocationRatingRequest } from 'travel/dataSource/useLocations';

export default function useUserLocations({ domain, userAlias }) {
  const {
    isError,
    isPending,
    locationsDict,
    locationsIds = [],
  } = useTripsStats({
    userAlias,
  });
  const { user: { locationsRating = [] } = {} } = useUser({
    domain,
    userAlias,
  });
  const { submitLocationRating } = useLocationRatingRequest({ domain });

  return {
    isError,
    isPending,
    locationsDict,
    locationsIds,
    locationsRating,
    submitLocationRating,
  };
}

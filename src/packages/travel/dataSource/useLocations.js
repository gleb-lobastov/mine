import { useSelector } from 'react-redux';
import {
  useProvision,
  useRequest,
  selectDict,
} from 'core/connection';
import {
  selectIsPending,
  selectIsError,
  selectIsReady,
} from 'core/connection/request/controllerRedux';

export default function useLocations({
  domain,
  locationsIds: requiredLocationIds,
}) {
  const locationsDict = useSelector(
    state => selectDict(state, 'locations') || {},
  );

  const missingLocationsIds = requiredLocationIds.filter(
    locationId => !locationsDict[locationId],
  );

  const provision = useProvision({
    domain,
    isProvision: true,
    modelName: 'locations',
    observe: requiredLocationIds,
    condition: Boolean(missingLocationsIds.length),
    query: {
      filter: { id: { comparator: 'in', value: missingLocationsIds } },
      navigation: { isDisabled: true },
    },
  });

  return {
    locationsDict,
    isReady: selectIsReady(provision),
    isLoading: selectIsPending(provision),
    isError: selectIsError(provision),
    counters: provision.counters,
  };
}

export function useLocationRatingRequest({ domain }) {
  const [submitLocationRating, provision] = useRequest({
    domain,
    modelName: 'locations',
    method: 'POST',
  });

  return {
    ...provision,
    submitLocationRating,
  };
}

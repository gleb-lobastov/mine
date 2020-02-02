import { useProvision } from 'core/connection';
import {
  selectResult,
  selectIsReady,
  selectIsPending,
  selectIsError,
} from 'core/connection/request/controllerRedux';

export default function useCountries() {
  const provision = useProvision({
    domain: `travel.countries`,
    isProvision: true,
    modelName: 'countries',
    query: { navigation: { isDisabled: true } },
  });

  const { data: countriesIds = [] } = selectResult(provision) || {};

  return {
    countriesIds,
    isReady: selectIsReady(provision),
    isLoading: selectIsPending(provision),
    isError: selectIsError(provision),
  };
}

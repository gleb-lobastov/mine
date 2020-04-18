import { useProvision } from 'core/connection';
import {
  selectResult,
  selectIsReady,
  selectIsPending,
  selectIsError,
} from 'core/connection/request/controllerRedux';

export default function useCountries() {
  return useProvision({
    domain: `travel.countries`,
    isProvision: true,
    modelName: 'countries',
    query: { navigation: { isDisabled: true } },
  });
}

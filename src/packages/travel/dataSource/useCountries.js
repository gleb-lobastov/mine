import { useProvision } from 'core/connection';

export default function useCountries() {
  return useProvision({
    domain: `travel.countries`,
    isProvision: true,
    modelName: 'countries',
    query: { navigation: { isDisabled: true } },
  });
}

import { PLAIN_GROUPS } from '../../consts';

export function resolveGroupingYear(groupingFields) {
  const yearGroupField = groupingFields.find(
    ({ fieldName }) => fieldName === PLAIN_GROUPS.YEARS,
  );
  if (!yearGroupField) {
    return null;
  }
  const { value: year } = yearGroupField;
  return parseInt(year, 10) ?? null;
}

export function resolveGroupingCountry(groupingFields) {
  const countryGroupField = groupingFields.find(
    ({ fieldName }) => fieldName === PLAIN_GROUPS.COUNTRIES,
  );
  if (!countryGroupField) {
    return null;
  }
  const { value: countryId } = countryGroupField;
  return parseInt(countryId, 10) ?? null;
}

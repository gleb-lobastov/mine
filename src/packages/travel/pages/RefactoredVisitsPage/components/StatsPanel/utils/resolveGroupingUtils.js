import { PLAIN_GROUPS } from '../../VisitsArranger/arrangement/groupping';


export function resolveGroupingYear(groupingFields) {
  const yearGroupField = groupingFields.find(
    ({ plainGroup }) => plainGroup === PLAIN_GROUPS.YEARS,
  );
  if (!yearGroupField) {
    return null;
  }
  const { value: year } = yearGroupField;
  return parseInt(year, 10) ?? null;
}

export function resolveGroupingCountry(groupingFields) {
  const countryGroupField = groupingFields.find(
    ({ plainGroup }) => plainGroup === PLAIN_GROUPS.COUNTRIES,
  );
  if (!countryGroupField) {
    return null;
  }
  const { value: countryId } = countryGroupField;
  return parseInt(countryId, 10) ?? null;
}

export function resolveGroupingLocation(groupingFields) {
  const locationGroupField = groupingFields.find(
    ({ plainGroup }) => plainGroup === PLAIN_GROUPS.LOCATIONS,
  );
  if (!locationGroupField) {
    return null;
  }
  const { value: locationId } = locationGroupField;
  return parseInt(locationId, 10) ?? null;
}

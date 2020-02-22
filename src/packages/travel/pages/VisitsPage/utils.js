import { GROUP_VISITS_BY } from './consts';

export function resolveTripCountryId(tripId, countryId) {
  return `t${tripId}_c${countryId}`;
}
export function resolveYearCountryId(year, countryId) {
  return `y${year}_c${countryId}`;
}

export function resolveArrivalYear({ arrivalDateTime }) {
  if (!arrivalDateTime) {
    return null;
  }
  return arrivalDateTime.getFullYear(arrivalDateTime);
}

export function checkIsGroupedByTrip(groupBy) {
  return (
    groupBy === GROUP_VISITS_BY.TRIPS ||
    groupBy === GROUP_VISITS_BY.TRIPS_COUNTRIES
  );
}

export function checkIsGroupedByYear(groupBy) {
  return (
    groupBy === GROUP_VISITS_BY.YEARS ||
    groupBy === GROUP_VISITS_BY.COUNTRIES_YEARS ||
    groupBy === GROUP_VISITS_BY.YEARS_COUNTRIES
  );
}

export function checkIsGroupedByCountry(groupBy) {
  return (
    groupBy === GROUP_VISITS_BY.TRIPS_COUNTRIES ||
    groupBy === GROUP_VISITS_BY.COUNTRIES ||
    groupBy === GROUP_VISITS_BY.COUNTRIES_YEARS ||
    groupBy === GROUP_VISITS_BY.YEARS_COUNTRIES
  );
}

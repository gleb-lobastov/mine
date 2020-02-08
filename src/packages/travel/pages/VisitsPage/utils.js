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

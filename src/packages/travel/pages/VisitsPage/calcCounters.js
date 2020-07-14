import minBy from 'lodash/minBy';
import maxBy from 'lodash/maxBy';
import {
  resolveTripCountryId,
  resolveYearCountryId,
  resolveArrivalYear,
} from './utils';

let lastCacheKey = null;
let cachedResult = null;
export default function calcCounters(visitsList, cacheKey) {
  if (cacheKey && cacheKey === lastCacheKey) {
    return cachedResult;
  }

  const counters = {
    totalVisits: {},
    countries: {},
    years: {},
    trips: {},
    tripsCountries: {},
    yearsCountries: {},
    locations: {},
  };

  visitsList.forEach(visit => {
    const { locationId, countryId, tripId, visitId } = visit;
    const year = resolveArrivalYear(visit);

    inc(counters.countries, countryId, 'visits', visitId);
    inc(counters.countries, countryId, 'locations', locationId);
    if (year) {
      inc(counters.countries, countryId, 'years', year);
    }
    inc(counters.countries, countryId, 'trips', tripId);

    if (year) {
      inc(counters.years, year, 'locations', locationId);
      inc(counters.years, year, 'countries', countryId);
      inc(counters.years, year, 'trips', tripId);
    }

    inc(counters.trips, tripId, 'visits', visitId);
    inc(counters.trips, tripId, 'locations', locationId);
    inc(counters.trips, tripId, 'countries', countryId);

    inc(counters.locations, locationId, 'visits', visitId);
    if (year) {
      inc(counters.locations, locationId, 'years', year);
    }
    inc(counters.locations, locationId, 'trips', tripId);

    inc(
      counters.tripsCountries,
      resolveTripCountryId(tripId, countryId),
      'locations',
      locationId,
    );

    if (year) {
      inc(
        counters.yearsCountries,
        resolveYearCountryId(year, countryId),
        'locations',
        locationId,
      );
    }
  }, {});

  lastCacheKey = cacheKey;
  cachedResult = counters;

  return counters;
}

function inc(ref, refKey, counterName, counterKey) {
  /* eslint-disable no-multi-assign, no-param-reassign */
  let countersRef = ref[refKey];
  if (!countersRef) {
    countersRef = ref[refKey] = {};
  }

  let counterRef = countersRef[counterName];
  if (!counterRef) {
    counterRef = countersRef[counterName] = {};
  }
  /* eslint-enable no-multi-assign, no-param-reassign */

  const currentCount = counterRef[counterKey] || 0;
  counterRef[counterKey] = currentCount + 1;
}

export function getLocationVisitsCount(counters = {}, locationId) {
  const { locations: { [locationId]: { visits = {} } = {} } = {} } = counters;
  return Object.keys(visits).length;
}

export function getLocationFirstVisit(counters = {}, locationId, visitsDict) {
  const { locations: { [locationId]: { visits = {} } = {} } = {} } = counters;
  return minBy(
    Object.keys(visits).map(visitId => visitsDict[visitId]?.arrivalDateTime),
    date => date.getTime(),
  );
}

export function getLocationLastVisit(counters = {}, locationId, visitsDict) {
  const { locations: { [locationId]: { visits = {} } = {} } = {} } = counters;
  return maxBy(
    Object.keys(visits).map(visitId => visitsDict[visitId]?.departureDateTime),
    date => date.getTime(),
  );
}

export function getCountryVisitsCount(counters = {}, countryId) {
  const { countries: { [countryId]: { visits = {} } = {} } = {} } = counters;
  return Object.keys(visits).length;
}

export function getCountryFirstVisit(counters = {}, countryId, visitsDict) {
  const { countries: { [countryId]: { visits = {} } = {} } = {} } = counters;
  return minBy(
    Object.keys(visits).map(visitId => visitsDict[visitId]?.arrivalDateTime),
    date => date.getTime(),
  );
}

export function getCountryLastVisit(counters = {}, countryId, visitsDict) {
  const { countries: { [countryId]: { visits = {} } = {} } = {} } = counters;
  return maxBy(
    Object.keys(visits).map(visitId => visitsDict[visitId]?.departureDateTime),
    date => date.getTime(),
  );
}

export function getLocationVisitsByYearCount(counters, locationId, year) {
  const {
    years: {
      [year]: {
        locations: { [locationId]: locationVisitsByYearCount } = {},
      } = {},
    } = {},
  } = counters;
  return locationVisitsByYearCount;
}

export function getYearsOfVisits(counters, locationId) {
  const { locations: { [locationId]: { years = {} } = {} } = {} } = counters;
  return Object.keys(years);
}

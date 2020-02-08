import {
  resolveTripCountryId,
  resolveYearCountryId,
  resolveArrivalYear,
} from './utils';

let lastCacheKey = null;
let cachedResult = null;
export default function calcCounters(visitsList, cacheKey) {
  if (cacheKey && cacheKey === lastCacheKey) {
    console.log({ cacheKey });
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
    inc(counters.countries, countryId, 'years', year);
    inc(counters.countries, countryId, 'trips', tripId);

    inc(counters.years, year, 'locations', locationId);
    inc(counters.years, year, 'countries', countryId);
    inc(counters.years, year, 'trips', tripId);

    inc(counters.trips, tripId, 'visits', visitId);
    inc(counters.trips, tripId, 'locations', locationId);
    inc(counters.trips, tripId, 'countries', countryId);

    inc(counters.locations, locationId, 'visits', visitId);
    inc(counters.locations, locationId, 'years', year);
    inc(counters.locations, locationId, 'trips', tripId);

    inc(
      counters.tripsCountries,
      resolveTripCountryId(tripId, countryId),
      'locations',
      locationId,
    );
    inc(
      counters.yearsCountries,
      resolveYearCountryId(year, countryId),
      'locations',
      locationId,
    );
  }, {});

  lastCacheKey = cacheKey;
  cachedResult = counters;
  console.log({ counters });

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

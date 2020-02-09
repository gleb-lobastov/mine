import warning from 'warning';
import memoize from 'lodash/memoize';
import sum from 'lodash/sum';
import memoizeOne from 'memoize-one';
import { GROUP_VISITS_BY, SORT_VISITS_BY, COMPARATORS } from './consts';
import { getLocationVisitsCount, getCountryVisitsCount } from './calcCounters';

const COMPARATOR_FUNCTIONS_MAPPING = {
  [COMPARATORS.VISIT.ARRIVAL_YEAR]: createArrivalYearComparator,
  [COMPARATORS.COUNTRY.NAME_ID]: createCountryNameIdComparator,
  [COMPARATORS.COUNTRY.RATING]: createCountryRatingComparator,
  [COMPARATORS.COUNTRY.VISITS]: createCountryVisitsComparator,
  [COMPARATORS.LOCATION.NAME_ID]: createLocationNameIdComparator,
  [COMPARATORS.LOCATION.RATING]: createLocationRatingComparator,
  [COMPARATORS.LOCATION.VISITS]: createLocationVisitsComparator,
  [COMPARATORS.TRIP.DEPARTURE_TIME]: createTripDepartureTimeComparator,
  [COMPARATORS.TRIP.ID]: createTripIdComparator,
};

export default function switchSortingFn(queryFilter, dicts, counters) {
  const { groupBy, sortBy } = queryFilter;
  switch (groupBy) {
    case GROUP_VISITS_BY.TRIPS:
      return createComparator(dicts, counters, [
        COMPARATORS.TRIP.DEPARTURE_TIME,
        COMPARATORS.TRIP.ID,
        resolveComparatorBySortFn(sortBy, COMPARATORS.LOCATION),
        COMPARATORS.LOCATION.NAME,
      ]);
    case GROUP_VISITS_BY.TRIPS_COUNTRIES:
      return createComparator(dicts, counters, [
        COMPARATORS.TRIP.DEPARTURE_TIME,
        COMPARATORS.TRIP.ID,
        resolveComparatorBySortFn(sortBy, COMPARATORS.COUNTRY),
        COMPARATORS.COUNTRY.NAME_ID,
        resolveComparatorBySortFn(sortBy, COMPARATORS.LOCATION),
        COMPARATORS.LOCATION.NAME_ID,
      ]);
    case GROUP_VISITS_BY.COUNTRIES:
      return createComparator(dicts, counters, [
        resolveComparatorBySortFn(sortBy, COMPARATORS.COUNTRY),
        COMPARATORS.COUNTRY.NAME_ID,
        resolveComparatorBySortFn(sortBy, COMPARATORS.LOCATION),
        COMPARATORS.LOCATION.NAME_ID,
      ]);
    case GROUP_VISITS_BY.YEARS:
      return createComparator(dicts, counters, [
        COMPARATORS.VISIT.ARRIVAL_YEAR,
        resolveComparatorBySortFn(sortBy, COMPARATORS.LOCATION),
        COMPARATORS.LOCATION.NAME_ID,
      ]);
    case GROUP_VISITS_BY.YEARS_COUNTRIES:
      return createComparator(dicts, counters, [
        COMPARATORS.VISIT.ARRIVAL_YEAR,
        resolveComparatorBySortFn(sortBy, COMPARATORS.COUNTRY),
        COMPARATORS.COUNTRY.NAME_ID,
        resolveComparatorBySortFn(sortBy, COMPARATORS.LOCATION),
        COMPARATORS.LOCATION.NAME_ID,
      ]);
    case GROUP_VISITS_BY.COUNTRIES_YEARS:
      return createComparator(dicts, counters, [
        resolveComparatorBySortFn(sortBy, COMPARATORS.COUNTRY),
        COMPARATORS.COUNTRY.NAME_ID,
        COMPARATORS.VISIT.ARRIVAL_YEAR,
        resolveComparatorBySortFn(sortBy, COMPARATORS.LOCATION),
        COMPARATORS.LOCATION.NAME_ID,
      ]);
    case GROUP_VISITS_BY.LOCATIONS:
    default:
      return createComparator(dicts, counters, [
        resolveComparatorBySortFn(sortBy, COMPARATORS.LOCATION),
        COMPARATORS.LOCATION.NAME_ID,
      ]);
  }
}

function resolveComparatorBySortFn(sortFn, ENTITY_COMPARATORS) {
  switch (sortFn) {
    case SORT_VISITS_BY.VISITS_ALPHABET:
      return ENTITY_COMPARATORS?.VISITS;
    case SORT_VISITS_BY.RATING_ALPHABET:
      return ENTITY_COMPARATORS?.RATING;
    default:
      return undefined;
  }
}

function createComparator(dicts, counters, comparatorsKeys) {
  const comparatorFuncs = comparatorsKeys
    .map(comparatorKey => {
      const comparatorFnCreator = COMPARATOR_FUNCTIONS_MAPPING[comparatorKey];
      warning(comparatorFnCreator, 'missing comparatorKey: %s', comparatorKey);
      if (!comparatorFnCreator) {
        return null;
      }
      return comparatorFnCreator(dicts, counters);
    })
    .filter(Boolean);

  return (visitA, visitB) => {
    for (let fnIdx = 0; fnIdx < comparatorFuncs.length; fnIdx += 1) {
      const comparisonResult = comparatorFuncs[fnIdx](visitA, visitB);
      if (comparisonResult) {
        return comparisonResult;
      }
    }
    return 0;
  };
}

function createLocationNameIdComparator() {
  return (visitA, visitB) => {
    const { locationId: locationIdA, locationName: locationNameA } = visitA;
    const { locationId: locationIdB, locationName: locationNameB } = visitB;
    if (locationNameA > locationNameB) {
      return 1;
    }
    if (locationNameB > locationNameA) {
      return -1;
    }
    return locationIdA - locationIdB;
  };
}

function createLocationRatingComparator({ locationsDict }) {
  return (visitA, visitB) => {
    const { locationId: locationIdA } = visitA;
    const { locationId: locationIdB } = visitB;
    const { rating: ratingA } = locationsDict[locationIdA];
    const { rating: ratingB } = locationsDict[locationIdB];
    return ratingA - ratingB;
  };
}

function createLocationVisitsComparator(_, counters) {
  return (visitA, visitB) => {
    const { locationId: locationIdA } = visitA;
    const { locationId: locationIdB } = visitB;
    return (
      getLocationVisitsCount(counters, locationIdB) -
      getLocationVisitsCount(counters, locationIdA)
    );
  };
}

function createCountryNameIdComparator({ countriesDict }) {
  return (visitA, visitB) => {
    const { countryId: countryIdA } = visitA;
    const { countryId: countryIdB } = visitB;
    const { countryName: countryNameA } = countriesDict[countryIdA] || {};
    const { countryName: countryNameB } = countriesDict[countryIdB] || {};

    if (countryNameA > countryNameB) {
      return 1;
    }
    if (countryNameB > countryNameA) {
      return -1;
    }
    return countryIdA - countryIdB;
  };
}

const resolveCountryRating = memoizeOne(locationsDict =>
  memoize(countryId => {
    const ratings = Object.values(locationsDict)
      .filter(
        ({ countryId: countryIdToCompare }) => countryId === countryIdToCompare,
      )
      .map(({ rating }) => rating);
    if (!ratings.length) {
      return 0;
    }
    return sum(ratings) / ratings.length;
  }),
);

function createCountryRatingComparator({ locationsDict }) {
  return (visitA, visitB) => {
    const { countryId: countryIdA } = visitA;
    const { countryId: countryIdB } = visitB;
    const ratingResolver = resolveCountryRating(locationsDict);
    return ratingResolver(countryIdA) - ratingResolver(countryIdB);
  };
}

function createCountryVisitsComparator(_, counters) {
  return (visitA, visitB) => {
    const { countryId: countryIdA } = visitA;
    const { countryId: countryIdB } = visitB;
    return (
      getCountryVisitsCount(counters, countryIdB) -
      getCountryVisitsCount(counters, countryIdA)
    );
  };
}

function createTripDepartureTimeComparator({ tripsDict }) {
  return (visitA, visitB) => {
    const { tripId: tripIdA } = visitA;
    const { tripId: tripIdB } = visitB;
    const { departureDateTime: departureDateTimeA } = tripsDict[tripIdA] || {};
    const { departureDateTime: departureDateTimeB } = tripsDict[tripIdB] || {};

    if (!departureDateTimeA && !departureDateTimeB) {
      return 0;
    }
    if (!departureDateTimeA || !departureDateTimeB) {
      // here also considered previous check: !arrivalDateTimeA && !arrivalDateTimeB
      return departureDateTimeA ? -1 : 1;
    }
    return departureDateTimeB.getFullYear() - departureDateTimeA.getFullYear();
  };
}

function createTripIdComparator() {
  return (visitA, visitB) => {
    const { tripId: tripIdA } = visitA;
    const { tripId: tripIdB } = visitB;

    return tripIdA - tripIdB;
  };
}

function createArrivalYearComparator() {
  return (visitA, visitB) => {
    const { arrivalDateTime: arrivalDateTimeA } = visitA;
    const { arrivalDateTime: arrivalDateTimeB } = visitB;

    if (!arrivalDateTimeA && !arrivalDateTimeB) {
      return 0;
    }
    if (!arrivalDateTimeA || !arrivalDateTimeB) {
      // here also considered previous check: !arrivalDateTimeA && !arrivalDateTimeB
      return arrivalDateTimeA ? -1 : 1;
    }
    return arrivalDateTimeB.getFullYear() - arrivalDateTimeA.getFullYear();
  };
}

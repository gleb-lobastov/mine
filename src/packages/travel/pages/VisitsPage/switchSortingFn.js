import warning from 'warning';
import memoize from 'lodash/memoize';
import sum from 'lodash/sum';
import memoizeOne from 'memoize-one';
import compareDateTime from 'modules/utilities/dateTime/compareDateTime';
import { GROUP_VISITS_BY, SORT_VISITS_BY, COMPARATORS } from './consts';
import {
  getLocationVisitsCount,
  getLocationFirstVisit,
  getLocationLastVisit,
  getCountryVisitsCount,
  getCountryFirstVisit,
  getCountryLastVisit,
} from './calcCounters';

const COMPARATOR_FUNCTIONS_MAPPING = {
  [COMPARATORS.VISIT.ARRIVAL_YEAR]: createArrivalYearComparator,
  [COMPARATORS.COUNTRY.NAME_ID]: createCountryNameIdComparator,
  [COMPARATORS.COUNTRY.RATING]: createCountryRatingComparator,
  [COMPARATORS.COUNTRY.VISITS]: createCountryVisitsComparator,
  [COMPARATORS.COUNTRY.FIRST_VISIT]: createCountryFirstVisitComparator,
  [COMPARATORS.COUNTRY.LAST_VISIT]: createCountryLastVisitComparator,
  [COMPARATORS.LOCATION.NAME_ID]: createLocationNameIdComparator,
  [COMPARATORS.LOCATION.RATING]: createLocationRatingComparator,
  [COMPARATORS.LOCATION.VISITS]: createLocationVisitsComparator,
  [COMPARATORS.LOCATION.FIRST_VISIT]: createLocationFirstVisitComparator,
  [COMPARATORS.LOCATION.LAST_VISIT]: createLocationLastVisitComparator,
  [COMPARATORS.TRIP.PRESERVE_ORDER]: createTripPreserveOrderComparator,
  [COMPARATORS.TRIP.DEPARTURE_TIME]: createTripDepartureTimeComparator,
  [COMPARATORS.TRIP.ID]: createTripIdComparator,
};

export default function switchSortingFn(provision, counters, queryFilter) {
  const { groupBy, sortBy } = queryFilter;
  switch (groupBy) {
    case GROUP_VISITS_BY.TRIPS:
      // sorting is not applicable, as locations ordered chronologically
      return createComparator(provision, counters, queryFilter, [
        COMPARATORS.TRIP.DEPARTURE_TIME,
        COMPARATORS.TRIP.PRESERVE_ORDER,
        COMPARATORS.TRIP.ID,
        COMPARATORS.LOCATION.NAME_ID,
      ]);
    case GROUP_VISITS_BY.TRIPS_COUNTRIES:
      return createComparator(provision, counters, queryFilter, [
        COMPARATORS.TRIP.DEPARTURE_TIME,
        COMPARATORS.TRIP.PRESERVE_ORDER,
        COMPARATORS.TRIP.ID,
        ...resolveComparatorBySortFn(sortBy, COMPARATORS.COUNTRY),
        COMPARATORS.COUNTRY.NAME_ID,
        ...resolveComparatorBySortFn(sortBy, COMPARATORS.LOCATION),
        COMPARATORS.LOCATION.NAME_ID,
      ]);
    case GROUP_VISITS_BY.COUNTRIES:
      return createComparator(provision, counters, queryFilter, [
        ...resolveComparatorBySortFn(sortBy, COMPARATORS.COUNTRY),
        COMPARATORS.COUNTRY.NAME_ID,
        ...resolveComparatorBySortFn(sortBy, COMPARATORS.LOCATION),
        COMPARATORS.LOCATION.NAME_ID,
      ]);
    case GROUP_VISITS_BY.YEARS:
      return createComparator(provision, counters, queryFilter, [
        COMPARATORS.VISIT.ARRIVAL_YEAR,
        ...resolveComparatorBySortFn(sortBy, COMPARATORS.LOCATION),
        COMPARATORS.LOCATION.NAME_ID,
      ]);
    case GROUP_VISITS_BY.YEARS_COUNTRIES:
      return createComparator(provision, counters, queryFilter, [
        COMPARATORS.VISIT.ARRIVAL_YEAR,
        ...resolveComparatorBySortFn(sortBy, COMPARATORS.COUNTRY),
        COMPARATORS.COUNTRY.NAME_ID,
        ...resolveComparatorBySortFn(sortBy, COMPARATORS.LOCATION),
        COMPARATORS.LOCATION.NAME_ID,
      ]);
    case GROUP_VISITS_BY.COUNTRIES_YEARS:
      return createComparator(provision, counters, queryFilter, [
        ...resolveComparatorBySortFn(sortBy, COMPARATORS.COUNTRY),
        COMPARATORS.COUNTRY.NAME_ID,
        COMPARATORS.VISIT.ARRIVAL_YEAR,
        ...resolveComparatorBySortFn(sortBy, COMPARATORS.LOCATION),
        COMPARATORS.LOCATION.NAME_ID,
      ]);
    case GROUP_VISITS_BY.LOCATIONS:
    default:
      return createComparator(provision, counters, queryFilter, [
        ...resolveComparatorBySortFn(sortBy, COMPARATORS.LOCATION),
        COMPARATORS.LOCATION.NAME_ID,
      ]);
  }
}

function resolveComparatorBySortFn(sortFn, ENTITY_COMPARATORS) {
  switch (sortFn) {
    case SORT_VISITS_BY.VISITS_ALPHABET:
      return [ENTITY_COMPARATORS?.VISITS];
    case SORT_VISITS_BY.FIRST_VISIT_ALPHABET:
      return [ENTITY_COMPARATORS?.FIRST_VISIT];
    case SORT_VISITS_BY.LAST_VISIT_ALPHABET:
      return [ENTITY_COMPARATORS?.LAST_VISIT];
    case SORT_VISITS_BY.RATING_ALPHABET:
      return [ENTITY_COMPARATORS?.RATING, ENTITY_COMPARATORS?.VISITS];
    default:
      return [];
  }
}

function createComparator(provision, counters, queryFilter, comparatorsKeys) {
  const comparatorFuncs = comparatorsKeys
    .map(comparatorKey => {
      const comparatorFnCreator = COMPARATOR_FUNCTIONS_MAPPING[comparatorKey];
      warning(comparatorFnCreator, 'missing comparatorKey: %s', comparatorKey);
      if (!comparatorFnCreator) {
        return null;
      }
      return comparatorFnCreator(provision, counters, queryFilter);
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

function createLocationRatingComparator({ locationsRating }) {
  return (visitA, visitB) => {
    const { locationId: locationIdA } = visitA;
    const { locationId: locationIdB } = visitB;
    const ratingA = locationsRating[locationIdA] || 10;
    const ratingB = locationsRating[locationIdB] || 10;
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

function createLocationFirstVisitComparator({ visitsDict }, counters) {
  return (visitA, visitB) => {
    const { locationId: locationIdA } = visitA;
    const { locationId: locationIdB } = visitB;
    return compareDateTime(
      getLocationFirstVisit(counters, locationIdA, visitsDict),
      getLocationFirstVisit(counters, locationIdB, visitsDict),
      { reverse: true },
    );
  };
}

function createLocationLastVisitComparator({ visitsDict }, counters) {
  return (visitA, visitB) => {
    const { locationId: locationIdA } = visitA;
    const { locationId: locationIdB } = visitB;
    return compareDateTime(
      getLocationLastVisit(counters, locationIdA, visitsDict),
      getLocationLastVisit(counters, locationIdB, visitsDict),
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

function createCountryRatingComparator({ countriesRating }) {
  return (visitA, visitB) => {
    const { countryId: countryIdA } = visitA;
    const { countryId: countryIdB } = visitB;
    const ratingA = countriesRating[countryIdA] || 10;
    const ratingB = countriesRating[countryIdB] || 10;
    return ratingA - ratingB;
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

function createCountryFirstVisitComparator({ visitsDict }, counters) {
  return (visitA, visitB) => {
    const { countryId: countryIdA } = visitA;
    const { countryId: countryIdB } = visitB;
    return compareDateTime(
      getCountryFirstVisit(counters, countryIdB, visitsDict),
      getCountryFirstVisit(counters, countryIdA, visitsDict),
    );
  };
}

function createCountryLastVisitComparator({ visitsDict }, counters) {
  return (visitA, visitB) => {
    const { countryId: countryIdA } = visitA;
    const { countryId: countryIdB } = visitB;
    return compareDateTime(
      getCountryLastVisit(counters, countryIdA, visitsDict),
      getCountryLastVisit(counters, countryIdB, visitsDict),
    );
  };
}

function createTripPreserveOrderComparator({ tripsIds }) {
  return (visitA, visitB) => {
    if (!tripsIds) {
      return 0;
    }
    const { tripId: tripIdA } = visitA;
    const { tripId: tripIdB } = visitB;
    const indexA = tripsIds.indexOf(tripIdA);
    const indexB = tripsIds.indexOf(tripIdB);
    if (indexA < 0 || indexB < 0) {
      if (indexA < 0 && indexB < 0) {
        return 0;
      }
      if (indexB < 0) {
        return -1;
      }
      return 1;
    }
    return indexA - indexB;
  };
}

function createTripDepartureTimeComparator({ tripsDict }, _, { sortBy }) {
  return (visitA, visitB) => {
    const { tripId: tripIdA } = visitA;
    const { tripId: tripIdB } = visitB;
    const { departureDateTime: departureDateTimeA } = tripsDict[tripIdA] || {};
    const { departureDateTime: departureDateTimeB } = tripsDict[tripIdB] || {};

    return compareDateTime(departureDateTimeA, departureDateTimeB, {
      matchBy: 'time',
      reverse: sortBy === SORT_VISITS_BY.FIRST_VISIT_ALPHABET,
    });
  };
}

function createTripIdComparator() {
  return (visitA, visitB) => {
    const { tripId: tripIdA } = visitA;
    const { tripId: tripIdB } = visitB;

    return tripIdA - tripIdB;
  };
}

function createArrivalYearComparator(_, __, { sortBy }) {
  return (visitA, visitB) => {
    const { arrivalDateTime: arrivalDateTimeA } = visitA;
    const { arrivalDateTime: arrivalDateTimeB } = visitB;

    return compareDateTime(arrivalDateTimeA, arrivalDateTimeB, {
      matchBy: 'year',
      reverse: sortBy === SORT_VISITS_BY.FIRST_VISIT_ALPHABET,
    });
  };
}

import sortBy from 'lodash/sortBy';
import orderBy from 'lodash/orderBy';
import iterateeFn from 'lodash/iteratee';
import property from 'lodash/property';
import { PLAIN_GROUPS } from '../../groupping/consts';
import { PLAIN_SORTING } from '../consts';

export default function sortVisitsBy(
  visitsGroups,
  sortingOrder,
  plainGroup,
  provision,
) {
  const comparators = sortingOrder.flatMap(switchComparator);
  const hasOrder = comparators.some(property('order'));

  return hasOrder
    ? orderBy(visitsGroups, ...withOrder(comparators))
    : sortBy(visitsGroups, comparators);

  function switchComparator(plainSorting) {
    switch (plainSorting) {
      case PLAIN_SORTING.FIRST_VISIT:
        return dates('stats.visitsStats.firstVisit.arrivalDateTime');
      case PLAIN_SORTING.LAST_VISIT:
        return {
          iteratee: nullsLast(
            dates('stats.visitsStats.lastVisit.departureDateTime'),
          ),
          order: 'desc',
        };
      case PLAIN_SORTING.RATING:
        return createRatingComparator(plainGroup, provision);
      case PLAIN_SORTING.VISITS_COUNT:
        return {
          iteratee: 'stats.locationsStats.total',
          order: 'desc',
        };
      case PLAIN_SORTING.ALPHABET:
      default:
        return createAlphabetComparator(plainGroup, provision);
    }
  }
}

function withOrder(comparators) {
  return Object.values(
    comparators.reduce(
      (acc, current) => {
        const { iteratee = [], order = 'asc' } = current.order
          ? current
          : { iteratee: current };
        acc.iteratee.push(iteratee);
        acc.order.push(order);
        return acc;
      },
      {
        iteratee: [],
        order: [],
      },
    ),
  );
}

function createRatingComparator(plainGroup, provision) {
  switch (plainGroup) {
    // case PLAIN_GROUPS.COUNTRIES:
    //   return createCountryRatingComparator(provision);
    case PLAIN_GROUPS.LOCATIONS:
      return createLocationRatingComparator(provision);
    default:
      return () => 0;
  }
}

function createAlphabetComparator(plainGroup, provision) {
  switch (plainGroup) {
    case PLAIN_GROUPS.YEARS:
      return [
        {
          iteratee: nullsLast('stats.visitsStats.firstVisit.arrivalYear'),
          order: 'desc',
        },
      ];
    case PLAIN_GROUPS.COUNTRIES:
      return createCountryNameComparator(provision);
    case PLAIN_GROUPS.LOCATIONS:
      return createLocationNameComparator(provision);
    default:
      return () => 0;
  }
}

function createCountryNameComparator({ countriesDict }) {
  return ({ field: { value: countryId } }) => {
    const { countryName } = countriesDict[countryId] ?? {};
    return countryName;
  };
}

function createLocationNameComparator({ locationsDict }) {
  return ({ field: { value: locationId } }) => {
    const { locationName } = locationsDict[locationId] ?? {};
    return locationName;
  };
}

const DEFAULT_RATING = 10;
function createLocationRatingComparator({ locationsRating }) {
  return ({ field: { value: locationId } }) =>
    locationsRating[locationId] ?? DEFAULT_RATING;
}

function nullsLast(iteratee) {
  const resolve = iterateeFn(iteratee);
  return value => resolve(value) || '';
}

function dates(iteratee) {
  const resolve = iterateeFn(iteratee);
  return value => (resolve(value) || '').valueOf();
}

import fpUniqBy from 'lodash/fp/uniqBy';
import fpGroupBy from 'lodash/fp/groupBy';
import fpSortBy from 'lodash/fp/sortBy';

const NO_YEAR = 0;

export const fpEnhanceVisitsWithDates = ({ ridesDict }) => visitsList =>
  visitsList.map(visit => {
    const { arrivalRideId } = visit;
    const ride = (arrivalRideId && ridesDict[arrivalRideId]) || {};
    const { arrivalDateTime, departureDateTime } = ride;
    return {
      ...visit,
      arrivalDateTime,
      departureDateTime,
      year:
        (departureDateTime && departureDateTime.getFullYear()) ||
        (arrivalDateTime && arrivalDateTime.getFullYear()) ||
        NO_YEAR,
    };
  });

export const uniqByLocations = fpUniqBy('locationId');
export const uniqByCountries = fpUniqBy('countryId');
export const groupByYears = fpGroupBy('year');
export const orderByYears = fpSortBy('year');

export const enhanceVisitsWithCounters = visitsList => {
  return {
    visitsList,
    countriesCount: uniqByCountries(visitsList).length,
    locationsCount: uniqByLocations(visitsList).length,
    year: Number(visitsList[0].year),
  };
};

export const plural = (value, { one, few, many }) => {
  if (value >= 5 && value <= 20) {
    return many;
  }
  const part = value % 10;
  if (part === 1) {
    return one;
  }
  if (part >= 2 && part <= 4) {
    return few;
  }
  return many;
};

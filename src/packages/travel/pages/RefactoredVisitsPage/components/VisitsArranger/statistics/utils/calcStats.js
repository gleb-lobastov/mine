import minBy from 'lodash/minBy';
import maxBy from 'lodash/maxBy';
import { PLAIN_GROUPS } from '../../arrangement/groupping/consts';
import { findClosestGroupValue } from '../../arrangement/groupping/utils/resolveGroupingUtils';
import createCalcByYearUtils from './createCalcByYearUtils';
import calcDaysTravellingStats from './calcDaysTravellingStats';

export default function calcStats(visitsGroup, provision) {
  const locationId = findClosestGroupValue(visitsGroup, PLAIN_GROUPS.LOCATIONS);
  const countryId = findClosestGroupValue(visitsGroup, PLAIN_GROUPS.COUNTRIES);
  const year = findClosestGroupValue(visitsGroup, PLAIN_GROUPS.YEARS);
  const { plainGroup, visitsList } = visitsGroup;

  return {
    visitsStats: calcVisitsStats(visitsList, provision),
    countriesStats: countryId
      ? null
      : calcCountriesStats(visitsList, provision, { year }),
    locationsStats: locationId
      ? null
      : calcLocationsStats(visitsList, provision, { year }),
    daysTravellingStats: calcDaysTravellingStats(visitsList, provision, {
      // Consider rides time, when count travelling days in groups, like country
      // or year. So when you move across country, you still in trip,
      // even if you sleep in train.
      considerRides: [PLAIN_GROUPS.COUNTRIES, PLAIN_GROUPS.YEARS].includes(
        plainGroup,
      )
        ? plainGroup
        : false,
    }),
  };
}

const {
  calcTotal: calcCountriesTotal,
  calcByYear: calcCountriesByYear,
} = createCalcByYearUtils('countryId');

function calcCountriesStats(visitsList, { visitsDict }, { year }) {
  const { newAtYear, totalAtYear, total, newbies } = year
    ? calcCountriesByYear(visitsDict, visitsList, year)
    : calcCountriesTotal(visitsList);
  return { year, newAtYear, totalAtYear, total, newbies };
}

const {
  calcTotal: calcLocationsTotal,
  calcByYear: calcLocationsByYear,
} = createCalcByYearUtils('locationId');

function calcVisitsStats(visitsList) {
  return {
    visitsCount: visitsList.length,
    firstVisit: minBy(visitsList, 'arrivalDateTime'),
    lastVisit: maxBy(visitsList, 'departureDateTime'),
  };
}

function calcLocationsStats(visitsList, { visitsDict }, { year }) {
  const { newAtYear, totalAtYear, total, newbies } = year
    ? calcLocationsByYear(visitsDict, visitsList, year)
    : calcLocationsTotal(visitsList);
  return {
    year,
    newAtYear,
    totalAtYear,
    total,
    newbies,
  };
}

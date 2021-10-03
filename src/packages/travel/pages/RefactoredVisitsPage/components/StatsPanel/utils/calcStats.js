import { PLAIN_GROUPS } from '../../../consts';
import {
  resolveGroupingCountry,
  resolveGroupingLocation,
  resolveGroupingYear,
} from './resolveGroupingUtils';
import createCalcByYearUtils from './createCalcByYearUtils';
import calcDaysTravellingStats from './calcDaysTravellingStats';

export default function calcStats(visitsList, provision, groupingFields) {
  const locationId = resolveGroupingLocation(groupingFields);
  const countryId = resolveGroupingCountry(groupingFields);
  const year = resolveGroupingYear(groupingFields);
  const { plainGroup } = groupingFields[groupingFields.length - 1];

  return {
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

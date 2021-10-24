import CountryVisitsGroup from './components/CountryVisitsGroup';
import LocationVisitsGroup from './components/LocationVisitsGroup';
import YearVisitsGroup from './components/YearVisitsGroup';
import TripVisitsGroup from './components/TripVisitsGroup';
import VisitsItselfGroup from './components/VisitsItselfGroup';
import { VISITS_SECTIONS } from 'travel/pages/RefactoredVisitsPage/consts';

export const KEY_GROUP_VISITS_BY = 'group';
export const GROUP_VISITS_BY = {
  LOCATIONS: 'loc',
  COUNTRIES: 'c',
  YEARS: 'yr',
  YEARS_COUNTRIES: 'yr_c',
  COUNTRIES_YEARS: 'c_yr',
  TRIPS: 't',
  TRIPS_COUNTRIES: 't_с',
};

export const PLAIN_GROUPS = {
  // ALL: 'ALL',
  LOCATIONS: 'LOCATIONS',
  COUNTRIES: 'COUNTRIES',
  YEARS: 'YEARS',
  TRIPS: 'TRIPS',
  JUST_VISITS: 'JUST_VISITS',
};

export const PLAIN_GROUPS_MAPPING = {
  [GROUP_VISITS_BY.LOCATIONS]: PLAIN_GROUPS.LOCATIONS,
  [GROUP_VISITS_BY.COUNTRIES]: PLAIN_GROUPS.COUNTRIES,
  [GROUP_VISITS_BY.YEARS]: PLAIN_GROUPS.YEARS,
  [GROUP_VISITS_BY.TRIPS]: PLAIN_GROUPS.TRIPS,
};

export const PLAIN_GROUPS_CONFIG = {
  [PLAIN_GROUPS.TRIPS]: {
    groupingFieldName: 'tripId',
    component: TripVisitsGroup,
  },
  [PLAIN_GROUPS.YEARS]: {
    groupingFieldName: ({ arrivalDateTime }) => arrivalDateTime.getFullYear(),
    component: YearVisitsGroup,
  },
  [PLAIN_GROUPS.COUNTRIES]: {
    groupingFieldName: 'countryId',
    component: CountryVisitsGroup,
  },
  [PLAIN_GROUPS.LOCATIONS]: {
    groupingFieldName: 'locationId',
    component: LocationVisitsGroup,
  },
  [PLAIN_GROUPS.JUST_VISITS]: {
    groupingFieldName: 'visitId',
    component: VisitsItselfGroup,
  },
};

export function resolveGroupingOrder(groupBy) {
  const groupingOrder = groupBy
    .split('_')
    .map(currentGroupBy => PLAIN_GROUPS_MAPPING[currentGroupBy]);

  const shouldShowVisits = groupingOrder.includes(PLAIN_GROUPS.TRIPS);
  const lastGroup = groupingOrder[groupingOrder.length - 1];

  if (!shouldShowVisits && lastGroup !== PLAIN_GROUPS.LOCATIONS) {
    groupingOrder.push(PLAIN_GROUPS.LOCATIONS);
  }
  if (shouldShowVisits) {
    groupingOrder.push(PLAIN_GROUPS.JUST_VISITS);
  }
  return groupingOrder;
}

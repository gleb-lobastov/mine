import CountryVisitsGroup from './components/CountryVisitsGroup';
import LocationVisitsGroup from './components/LocationVisitsGroup';
import YearVisitsGroup from './components/YearVisitsGroup';
import TripVisitsGroup from './components/TripVisitsGroup';
import VisitsItselfGroup from './components/VisitsItselfGroup';

export const KEY_GROUP_VISITS_BY = 'group';
export const GROUP_VISITS_BY = {
  LOCATIONS: 'loc',
  COUNTRIES: 'c',
  YEARS: 'yr',
  YEARS_COUNTRIES: 'yr_c',
  COUNTRIES_YEARS: 'c_yr',
  TRIPS: 't',
  TRIPS_COUNTRIES: 't_c',
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
    groupFieldName: 'tripId',
    component: TripVisitsGroup,
    adapter: Number, // Will be applied to value of "groupFieldName" field
  },
  [PLAIN_GROUPS.YEARS]: {
    groupFieldName: ({ arrivalDateTime }) => arrivalDateTime.getFullYear(),
    component: YearVisitsGroup,
    adapter: Number,
  },
  [PLAIN_GROUPS.COUNTRIES]: {
    groupFieldName: 'countryId',
    component: CountryVisitsGroup,
    adapter: Number,
  },
  [PLAIN_GROUPS.LOCATIONS]: {
    groupFieldName: 'locationId',
    component: LocationVisitsGroup,
    adapter: Number,
  },
  [PLAIN_GROUPS.JUST_VISITS]: {
    groupFieldName: 'visitId',
    component: VisitsItselfGroup,
    adapter: Number,
  },
};

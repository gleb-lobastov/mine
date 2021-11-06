import CountryVisitsGroup from './components/CountryVisitsGroup';
import LocationVisitsGroup from './components/LocationVisitsGroup';
import YearVisitsGroup from './components/YearVisitsGroup';
import TripVisitsGroup from './components/TripVisitsGroup';
import VisitsItselfGroup from './components/VisitsItselfGroup';

export const PLAIN_GROUPS = {
  // ALL: 'ALL',
  LOCATIONS: 'LOCATIONS',
  COUNTRIES: 'COUNTRIES',
  YEARS: 'YEARS',
  TRIPS: 'TRIPS',
  JUST_VISITS: 'JUST_VISITS',
};

export const PLAIN_GROUPS_CONFIG = {
  [PLAIN_GROUPS.TRIPS]: {
    groupFieldName: 'tripId',
    component: TripVisitsGroup,
    adapter: Number, // Will be applied to value of "groupFieldName" field
  },
  [PLAIN_GROUPS.YEARS]: {
    groupFieldName: function getArrivalYear({ arrivalDateTime }) {
      return arrivalDateTime.getFullYear();
    },
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

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

export const VISITS_SECTIONS = {
  TRIPS: 'trips',
  LOCATIONS: 'locations',
};
export const VISITS_SECTION_DEFAULT = VISITS_SECTIONS.TRIPS;
export const VISITS_SECTIONS_GROUPS = {
  [VISITS_SECTIONS.LOCATIONS]: [
    { key: GROUP_VISITS_BY.LOCATIONS, l10n: 'По городам' },
    { key: GROUP_VISITS_BY.COUNTRIES, l10n: 'По странам' },
    { key: GROUP_VISITS_BY.YEARS, l10n: 'По годам' },
    { key: GROUP_VISITS_BY.YEARS_COUNTRIES, l10n: 'По годам и странам' },
    { key: GROUP_VISITS_BY.COUNTRIES_YEARS, l10n: 'По странам и годам' },
  ],
  [VISITS_SECTIONS.TRIPS]: [
    { key: GROUP_VISITS_BY.TRIPS, l10n: 'По поездкам' },
    { key: GROUP_VISITS_BY.TRIPS_COUNTRIES, l10n: 'По поездкам и странам' },
  ],
};
export const GROUP_VISITS_BY_DEFAULTS = {
  [VISITS_SECTIONS.LOCATIONS]: GROUP_VISITS_BY.LOCATIONS,
  [VISITS_SECTIONS.TRIPS]: GROUP_VISITS_BY.TRIPS,
};

export const KEY_SORT_VISITS_BY = 'sort';
export const SORT_VISITS_BY = {
  RATING_ALPHABET: 'r_a',
  VISITS_ALPHABET: 'v_a',
  ALPHABET: 'a',
};
export const SORT_VISITS_BY_DEFAULT = SORT_VISITS_BY.ALPHABET;

export const COMPARATORS = {
  VISIT: { ARRIVAL_YEAR: 'ARRIVAL_YEAR' },
  TRIP: { DEPARTURE_TIME: 'TRIP_DEPARTURE_DATE', ID: 'TRIP_ID' },
  COUNTRY: {
    VISITS: 'COUNTRY_VISITS',
    RATING: 'COUNTRY_RATING',
    NAME_ID: 'COUNTRY_NAME_ID',
  },
  LOCATION: {
    VISITS: 'LOCATION_VISITS',
    RATING: 'LOCATION_RATING',
    NAME_ID: 'LOCATION_NAME_ID',
  },
};

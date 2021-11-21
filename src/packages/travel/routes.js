import React from 'react';
const USER_ALIAS_TYPE = '[a-z0-9-]+';
const SECTION_TYPE = 'trips|places';

export const entry = {
  path: '/',
  Component: React.lazy(() =>
    import(/* webpackChunkName: 'travel-Dashboard' */ './pages/Dashboard'),
  ),
};

export const visit = {
  path: `/:userAlias(${USER_ALIAS_TYPE})/:section(${SECTION_TYPE})/visits/:strVisitId(\\d+)`,
  defaultRouteParams: { userAlias: 'my', section: 'trips' },
  layoutProps: { breadcrumbs: [{ caption: 'Посещение' }] },
  Component: React.lazy(() =>
    import(/* webpackChunkName: 'travel-Places' */ './pages/VisitPage'),
  ),
};

export const visits = {
  path: `/:userAlias(${USER_ALIAS_TYPE})/:section(${SECTION_TYPE})?`,
  defaultRouteParams: { userAlias: 'my', section: 'trips' },
  Component: React.lazy(() =>
    import(/* webpackChunkName: 'travel-Places' */ './pages/VisitsPage'),
  ),
};

export const tripEdit = {
  path: `/:userAlias(${USER_ALIAS_TYPE})/trips/:strTripId(\\d+)/edit`,
  defaultRouteParams: { userAlias: 'my' },
  layoutProps: { breadcrumbs: [{ caption: 'Редактирование поездки' }] },
  Component: React.lazy(() =>
    import(/* webpackChunkName: 'travel-TripEditPage' */ './pages/TripEditPage'),
  ),
};

export const tripCreate = {
  path: `/:userAlias(${USER_ALIAS_TYPE})/trips/:action`,
  defaultRouteParams: { userAlias: 'my', action: 'create' },
  layoutProps: { breadcrumbs: [{ caption: 'Создание поездки' }] },
  Component: React.lazy(() =>
    import(/* webpackChunkName: 'travel-TripEditPage' */ './pages/TripEditPage'),
  ),
};

export const locations = {
  path: `/:userAlias(${USER_ALIAS_TYPE})/:section(${SECTION_TYPE})/locations`,
  defaultRouteParams: { userAlias: 'my' },
  layoutProps: { breadcrumbs: [{ caption: 'Места' }] },
  Component: React.lazy(() =>
    import(/* webpackChunkName: 'travel-Places' */ './pages/LocationsPage'),
  ),
};

export const location = {
  path: `/:userAlias(${USER_ALIAS_TYPE})/:section(${SECTION_TYPE})/locations/:strLocationId(\\d+)`,
  defaultRouteParams: { userAlias: 'my', section: 'trips' },
  layoutProps: { breadcrumbs: [{ caption: 'Место' }] },
  Component: React.lazy(() =>
    import(/* webpackChunkName: 'travel-Places' */ './pages/LocationPage'),
  ),
};

export const country = {
  path: `/:userAlias(${USER_ALIAS_TYPE})/:section(${SECTION_TYPE})/countries/:strCountryId(\\d+)`,
  defaultRouteParams: { userAlias: 'my', section: 'trips' },
  layoutProps: { breadcrumbs: [{ caption: 'Страна' }] },
  Component: React.lazy(() =>
    import(/* webpackChunkName: 'travel-Places' */ './pages/CountryPage'),
  ),
};

export const year = {
  path: `/:userAlias(${USER_ALIAS_TYPE})/:section(${SECTION_TYPE})/years/:strYear(\\d{4})`,
  defaultRouteParams: { userAlias: 'my', section: 'trips' },
  layoutProps: {
    breadcrumbs: [{ caption: ({ strYear }) => `${strYear} год` }],
  },
  Component: React.lazy(() =>
    import(/* webpackChunkName: 'travel-Places' */ './pages/YearPage'),
  ),
};

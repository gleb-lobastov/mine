import React from 'react';
const USER_ALIAS_TYPE = '[a-z0-9-]+';

export const entry = {
  path: '/',
  Component: React.lazy(() =>
    import(/* webpackChunkName: 'travel-Dashboard' */ './pages/Dashboard'),
  ),
};

export const visits = {
  path: `/:userAlias(${USER_ALIAS_TYPE})/visits/:section?`,
  defaultRouteParams: { userAlias: 'my', section: 'trips' },
  Component: React.lazy(() =>
    import(/* webpackChunkName: 'travel-VisitsPage' */ './pages/VisitsPage'),
  ),
};

export const visitEdit = {
  path: `/:userAlias(${USER_ALIAS_TYPE})/visits/:strVisitId(\\d+)/edit`,
  defaultRouteParams: { userAlias: 'my' },
  layoutProps: { breadcrumbs: [{ caption: 'Редактирование посещения' }] },
  Component: React.lazy(() =>
    import(/* webpackChunkName: 'travel-TripEditPage' */ './pages/VisitEditPage'),
  ),
};

export const tripEdit = {
  path: `/:userAlias(${USER_ALIAS_TYPE})/visits/trips/:strTripId(\\d+)/edit`,
  defaultRouteParams: { userAlias: 'my' },
  layoutProps: { breadcrumbs: [{ caption: 'Редактирование поездки' }] },
  Component: React.lazy(() =>
    import(/* webpackChunkName: 'travel-TripEditPage' */ './pages/TripEditPage'),
  ),
};

export const tripCreate = {
  path: `/:userAlias(${USER_ALIAS_TYPE})/visits/trips/:action`,
  defaultRouteParams: { userAlias: 'my', action: 'create' },
  layoutProps: { breadcrumbs: [{ caption: 'Создание поездки' }] },
  Component: React.lazy(() =>
    import(/* webpackChunkName: 'travel-TripEditPage' */ './pages/TripEditPage'),
  ),
};

export const locations = {
  path: `/:userAlias(${USER_ALIAS_TYPE})/visits/locations/edit/:strLocationId?`,
  defaultRouteParams: { userAlias: 'my' },
  layoutProps: { breadcrumbs: [{ caption: 'Города' }] },
  Component: React.lazy(() =>
    import(/* webpackChunkName: 'travel-LocationsPage' */ './pages/LocationsPage'),
  ),
};

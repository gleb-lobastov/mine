import React from 'react';
import { VISITS_SECTIONS } from './pages/VisitsPage/consts';
const USER_ALIAS_TYPE = '[a-z0-9-]+';

export const entry = {
  path: '/',
  Component: React.lazy(() =>
    import(/* webpackChunkName: 'travel-Dashboard' */ './pages/Dashboard'),
  ),
};

export const visits = {
  path: `/:userAlias(${USER_ALIAS_TYPE})/visits/:section?`,
  defaultRouteParams: { userAlias: 'my', section: VISITS_SECTIONS.TRIPS },
  Component: React.lazy(() =>
    import(/* webpackChunkName: 'travel-TripStory' */ './pages/VisitsPage'),
  ),
};

export const tripEdit = {
  path: `/:userAlias(${USER_ALIAS_TYPE})/trips/:strTripId/edit`,
  defaultRouteParams: { userAlias: 'my' },
  Component: React.lazy(() =>
    import(/* webpackChunkName: 'travel-Trips' */ './pages/TripEditPage'),
  ),
};

export const tripCreate = {
  path: `/:userAlias(${USER_ALIAS_TYPE})/trip/:action`,
  defaultRouteParams: { userAlias: 'my', action: 'create' },
  Component: React.lazy(() =>
    import(/* webpackChunkName: 'travel-Trips' */ './pages/TripEditPage'),
  ),
};

export const locations = {
  path: `/:userAlias(${USER_ALIAS_TYPE})/visits/locations/:strLocationId?`,
  defaultRouteParams: { userAlias: 'my' },
  Component: React.lazy(() =>
    import(/* webpackChunkName: 'travel-TripStory' */ './pages/LocationsPage'),
  ),
};

import React from 'react';

const USER_ALIAS_TYPE = '[a-z0-9-]+';

export const entry = {
  path: '/',
  Component: React.lazy(() =>
    import(/* webpackChunkName: 'travel-Dashboard' */ './pages/Dashboard'),
  ),
};

export const visits = {
  path: `/:userAlias(${USER_ALIAS_TYPE})/visits`,
  defaultRouteParams: { userAlias: 'my' },
  Component: React.lazy(() =>
    import(/* webpackChunkName: 'travel-TripStory' */ './pages/VisitsPage'),
  ),
};

export const trips = {
  path: `/:userAlias(${USER_ALIAS_TYPE})/trips/:strTripId?`,
  defaultRouteParams: { userAlias: 'my' },
  Component: React.lazy(() =>
    import(/* webpackChunkName: 'travel-Trips' */ './pages/TripsPage'),
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
  path: `/:userAlias(${USER_ALIAS_TYPE})/createTrip`,
  defaultRouteParams: { userAlias: 'my' },
  Component: React.lazy(() =>
    import(/* webpackChunkName: 'travel-Trips' */ './pages/TripEditPage'),
  ),
};

export const tripStory = {
  path: `/:userAlias(${USER_ALIAS_TYPE})/trips/:strTripId`,
  defaultRouteParams: { userAlias: 'my' },
  Component: React.lazy(() =>
    import(/* webpackChunkName: 'travel-TripStory' */ './pages/TripStoryPage'),
  ),
};

export const locations = {
  path: `/:userAlias(${USER_ALIAS_TYPE})/visits/locations/:strLocationId?`,
  defaultRouteParams: { userAlias: 'my' },
  Component: React.lazy(() =>
    import(/* webpackChunkName: 'travel-TripStory' */ './pages/LocationsPage'),
  ),
};

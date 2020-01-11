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
    import(/* webpackChunkName: 'travel-Countries' */ './pages/VisitsPage'),
  ),
};

export const years = {
  path: `/:userAlias(${USER_ALIAS_TYPE})/yearly/:year?`,
  defaultRouteParams: { userAlias: 'my' },
  Component: React.lazy(() =>
    import(/* webpackChunkName: 'travel-Countries' */ './pages/YearCountryCityPage'),
  ),
};

export const rides = {
  path: `/:userAlias(${USER_ALIAS_TYPE})/rides`,
  defaultRouteParams: { userAlias: 'my' },
  Component: React.lazy(() =>
    import(/* webpackChunkName: 'travel-Countries' */ './pages/RidesPage'),
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

export const tripStory = {
  path: `/:userAlias(${USER_ALIAS_TYPE})/trips/:strTripId`,
  defaultRouteParams: { userAlias: 'my' },
  Component: React.lazy(() =>
    import(/* webpackChunkName: 'travel-TripStory' */ './pages/TripStoryPage'),
  ),
};

export const location = {
  path: `/:userAlias(${USER_ALIAS_TYPE})/visits/location/:strLocationId`,
  defaultRouteParams: { userAlias: 'my' },
  Component: React.lazy(() =>
    import(/* webpackChunkName: 'travel-TripStory' */ './pages/LocationPage'),
  ),
};

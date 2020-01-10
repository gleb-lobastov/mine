import React from 'react';

const USER_ALIAS_TYPE = '[a-z0-9-]+';

export default mountPath => {
  const entry = {
    path: mountPath,
    Component: React.lazy(() =>
      import(/* webpackChunkName: 'travel-Dashboard' */ './pages/Dashboard'),
    ),
  };

  const visits = {
    path: `${mountPath}/:userAlias(${USER_ALIAS_TYPE})/visits`,
    defaultRouteParams: { userAlias: 'my' },
    Component: React.lazy(() =>
      import(/* webpackChunkName: 'travel-Countries' */ './pages/VisitsPage'),
    ),
  };

  const years = {
    path: `${mountPath}/:userAlias(${USER_ALIAS_TYPE})/yearly/:year?`,
    defaultRouteParams: { userAlias: 'my' },
    Component: React.lazy(() =>
      import(/* webpackChunkName: 'travel-Countries' */ './pages/YearCountryCityPage'),
    ),
  };

  const rides = {
    path: `${mountPath}/:userAlias(${USER_ALIAS_TYPE})/rides`,
    defaultRouteParams: { userAlias: 'my' },
    Component: React.lazy(() =>
      import(/* webpackChunkName: 'travel-Countries' */ './pages/RidesPage'),
    ),
  };

  const trips = {
    path: `${mountPath}/:userAlias(${USER_ALIAS_TYPE})/trips`,
    defaultRouteParams: { userAlias: 'my' },
    Component: React.lazy(() =>
      import(/* webpackChunkName: 'travel-Trips' */ './pages/TripsPage'),
    ),
  };

  const tripEdit = {
    path: `${mountPath}/:userAlias(${USER_ALIAS_TYPE})/trips/:strTripId/edit`,
    defaultRouteParams: { userAlias: 'my' },
    Component: React.lazy(() =>
      import(/* webpackChunkName: 'travel-Trips' */ './pages/TripStoryPage'),
    ),
  };

  const tripStory = {
    path: `${mountPath}/:userAlias(${USER_ALIAS_TYPE})/trips/:strTripId`,
    defaultRouteParams: { userAlias: 'my' },
    Component: React.lazy(() =>
      import(/* webpackChunkName: 'travel-TripStory' */ './pages/TripStoryPage'),
    ),
  };

  const location = {
    path: `${mountPath}/:userAlias(${USER_ALIAS_TYPE})/visits/location/:strLocationId`,
    defaultRouteParams: { userAlias: 'my' },
    Component: React.lazy(() =>
      import(/* webpackChunkName: 'travel-TripStory' */ './pages/LocationPage'),
    ),
  };

  return {
    routesDict: {
      entry,
      visits,
      rides,
      years,
      trips,
      tripStory,
      tripEdit,
      location,
    },
    routes: [entry, visits, rides, years, trips, tripStory, tripEdit, location],
  };
};

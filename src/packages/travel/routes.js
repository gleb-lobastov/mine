import React from 'react';

const USER_ALIAS_TYPE = '[a-z0-9-]+';

export default mountPath => {
  const entry = {
    routeName: 'entry',
    path: mountPath,
    Component: React.lazy(() =>
      import(/* webpackChunkName: 'travel-Dashboard' */ './pages/Dashboard'),
    ),
  };

  const visits = {
    routeName: 'countries',
    path: `${mountPath}/:userAlias(${USER_ALIAS_TYPE})/visits`,
    defaultRouteParams: { userAlias: 'my' },
    Component: React.lazy(() =>
      import(/* webpackChunkName: 'travel-Countries' */ './pages/VisitsPage'),
    ),
  };

  const years = {
    routeName: 'yearly',
    path: `${mountPath}/:userAlias(${USER_ALIAS_TYPE})/yearly/:year?`,
    defaultRouteParams: { userAlias: 'my' },
    Component: React.lazy(() =>
      import(/* webpackChunkName: 'travel-Countries' */ './pages/YearCountryCityPage'),
    ),
  };

  const rides = {
    routeName: 'rides',
    path: `${mountPath}/:userAlias(${USER_ALIAS_TYPE})/rides`,
    defaultRouteParams: { userAlias: 'my' },
    Component: React.lazy(() =>
      import(/* webpackChunkName: 'travel-Countries' */ './pages/RidesPage'),
    ),
  };

  const trips = {
    routeName: 'trips',
    path: `${mountPath}/:userAlias(${USER_ALIAS_TYPE})/trips`,
    defaultRouteParams: { userAlias: 'my' },
    Component: React.lazy(() =>
      import(/* webpackChunkName: 'travel-Trips' */ './pages/TripsPage'),
    ),
  };

  const tripStory = {
    routeName: 'tripStory',
    path: `${mountPath}/:userAlias(${USER_ALIAS_TYPE})/trips/:strTripId`,
    defaultRouteParams: { userAlias: 'my' },
    Component: React.lazy(() =>
      import(/* webpackChunkName: 'travel-TripStory' */ './pages/TripStoryPage'),
    ),
  };

  const location = {
    routeName: 'locationPath',
    path: `${mountPath}/:userAlias(${USER_ALIAS_TYPE})/visits/location/:strLocationId`,
    defaultRouteParams: { userAlias: 'my' },
    Component: React.lazy(() =>
      import(/* webpackChunkName: 'travel-TripStory' */ './pages/LocationPage'),
    ),
  };

  return {
    routes: [entry, visits, rides, years, trips, tripStory, location],
    menu: [
      { routeName: entry.routeName, caption: 'Об' },
      { routeName: visits.routeName, caption: 'По посещенным местам' },
      { routeName: years.routeName, caption: 'По годам' },
      { routeName: trips.routeName, caption: 'По поездкам' },
    ],
  };
};

import React from 'react';

export default mountPath => {
  const entry = {
    routeName: 'entry',
    path: mountPath,
    Component: React.lazy(() =>
      import(/* webpackChunkName: 'travel-Dashboard' */ './pages/Dashboard'),
    ),
  };

  const countries = {
    routeName: 'countries',
    path: `${mountPath}/countries`,
    Component: React.lazy(() =>
      import(/* webpackChunkName: 'travel-Countries' */ './pages/Countries'),
    ),
  };

  const cities = {
    routeName: 'cities',
    path: `${mountPath}/cities`,
    Component: React.lazy(() =>
      import(/* webpackChunkName: 'travel-Cities' */ './pages/Cities'),
    ),
  };

  const trips = {
    routeName: 'trips',
    path: `${mountPath}/:userAlias([a-z0-9\\-]+)/trips`,
    defaultRouteParams: { userAlias: 'my' },
    Component: React.lazy(() =>
      import(/* webpackChunkName: 'travel-Trips' */ './pages/Trips'),
    ),
  };

  const tripStory = {
    routeName: 'tripStory',
    path: `${mountPath}/:userAlias([a-z0-9\\-]+)/trips/:strTripId`,
    defaultRouteParams: { userAlias: 'my' },
    Component: React.lazy(() =>
      import(/* webpackChunkName: 'travel-TripStory' */ './pages/TripStory'),
    ),
  };

  return {
    routes: [entry, countries, cities, trips, tripStory],
    menu: [
      { routeName: entry.routeName, caption: 'Об' },
      { routeName: countries.routeName, caption: 'По странам' },
      { routeName: cities.routeName, caption: 'По городам' },
      { routeName: trips.routeName, caption: 'По поездкам' },
    ],
  };
};

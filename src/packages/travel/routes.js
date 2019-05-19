import React from 'react';

export default mountPath => {
  const entry = {
    routeName: 'entry',
    path: mountPath,
    Component: React.lazy(() =>
      import(/* webpackChunkName: 'literature-Dashboard' */ './pages/Dashboard'),
    ),
  };

  const countries = {
    routeName: 'countries',
    path: `${mountPath}/countries`,
    Component: React.lazy(() =>
      import(/* webpackChunkName: 'literature-Books' */ './pages/Countries'),
    ),
  };

  const cities = {
    routeName: 'cities',
    path: `${mountPath}/cities`,
    Component: React.lazy(() =>
      import(/* webpackChunkName: 'literature-Articles' */ './pages/Cities'),
    ),
  };

  const trips = {
    routeName: 'trips',
    path: `${mountPath}/trips`,
    Component: React.lazy(() =>
      import(/* webpackChunkName: 'literature-Article' */ './pages/Trips'),
    ),
  };

  const rides = {
    routeName: 'rides',
    path: `${mountPath}/rides`,
    Component: React.lazy(() =>
      import(/* webpackChunkName: 'literature-Article' */ './pages/Rides'),
    ),
  };

  return {
    routes: [entry, countries, cities, trips, rides],
    menu: [
      { routeName: entry.routeName, caption: 'Об' },
      { routeName: countries.routeName, caption: 'По странам' },
      { routeName: cities.routeName, caption: 'По городам' },
      { routeName: trips.routeName, caption: 'По поездкам' },
      { routeName: rides.routeName, caption: 'Транспорт' },
    ],
  };
};

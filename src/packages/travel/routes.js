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

  return {
    routes: [entry, countries, cities, trips],
    menu: [
      { routeName: 'entry', caption: 'Об' },
      { routeName: 'countries', caption: 'По странам' },
      { routeName: 'cities', caption: 'По городам' },
      { routeName: 'trips', caption: 'По поездкам' },
    ],
  };
};

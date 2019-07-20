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

  const trips = {
    routeName: 'trips',
    path: `${mountPath}/:userAlias(${USER_ALIAS_TYPE})/trips`,
    defaultRouteParams: { userAlias: 'my' },
    Component: React.lazy(() =>
      import(/* webpackChunkName: 'travel-Trips' */ './pages/Trips'),
    ),
  };

  const tripStory = {
    routeName: 'tripStory',
    path: `${mountPath}/:userAlias(${USER_ALIAS_TYPE})/trips/:strTripId`,
    defaultRouteParams: { userAlias: 'my' },
    Component: React.lazy(() =>
      import(/* webpackChunkName: 'travel-TripStory' */ './pages/TripStory'),
    ),
  };

  return {
    routes: [entry, visits, trips, tripStory],
    menu: [
      { routeName: entry.routeName, caption: 'Об' },
      { routeName: visits.routeName, caption: 'По поещенным местам' },
      { routeName: trips.routeName, caption: 'По поездкам' },
    ],
  };
};

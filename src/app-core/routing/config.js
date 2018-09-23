import React from 'react';
import Dashboard from 'components/Dashboard';
import ArticlesController from 'blog/ArticlesController';
import TravelDashboard from 'travel/Dashboard';
import * as routes from './routes';

export default {
  routes: [{
    route: routes.root,
    exact: true,
    component: () => (<Dashboard />),
  }, {
    route: routes.blogRoute,
    exact: true,
    component: () => (<ArticlesController domain='articles' />),
  }, {
    route: routes.travelsRoute,
    exact: true,
    component: () => (<TravelDashboard domain='locations' />),
  }],
};

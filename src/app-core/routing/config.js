import React from 'react';
import Dashboard from 'components/Dashboard';
import ArticlesController from 'blog/ArticlesController';
import TravelDashboard from 'travel/Dashboard';
import Books from 'components/Books';
import Chaldini from 'components/longreads/Chaldini';
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
  }, {
    route: routes.booksRoute,
    exact: true,
    component: () => (<Books />),
  }, {
    route: routes.chaldiniRoute,
    exact: true,
    component: () => (<Chaldini />),
  }],
};

import React from 'react';
import ArticlesController from 'pages/literature/ArticlesController';
import Books from 'pages/literature/Books';
import Chaldini from 'pages/literature/longreads/Chaldini';
import CodeDashboard from 'pages/code/Dashboard';
import Dashboard from 'pages/main/Dashboard';
import TravelDashboard from 'pages/travel/Dashboard';
import LiteratureDashboard from 'pages/literature/Dashboard';
import * as routes from './routes';

export default {
  routes: [
    {
      route: routes.root,
      exact: true,
      component: () => <Dashboard />,
    },
    {
      route: routes.blogRoute,
      exact: true,
      component: () => <ArticlesController domain="articles" />,
    },
    {
      route: routes.travelsRoute,
      exact: true,
      component: () => <TravelDashboard domain="locations" />,
    },
    {
      route: routes.literatureRoute,
      exact: true,
      component: () => <LiteratureDashboard />,
    },
    {
      route: routes.codeRoute,
      exact: true,
      component: () => <CodeDashboard />,
    },
    {
      route: routes.booksRoute,
      exact: true,
      component: () => <Books />,
    },
    {
      route: routes.chaldiniRoute,
      exact: true,
      component: () => <Chaldini />,
    },
  ],
};

import React from 'react';
import IconCode from '@material-ui/icons/Code';

export default ({ mountPath }) => {
  const entry = {
    routeName: 'entry',
    path: mountPath,
    Component: React.lazy(() =>
      import(/* webpackChunkName: 'code-Dashboard' */ './pages/CodeDashboard'),
    ),
  };

  const articles = {
    routeName: 'articles',
    defaultRouteParams: { tag: 'code' },
    path: `${mountPath}/articles/:tag(code)/:slug?`,
    Component: React.lazy(() =>
      import(/* webpackChunkName: 'code-Dashboard' */ '../literature/pages/Articles'),
    ),
  };

  return {
    id: '9f7b3838-779c-452b-9da0-67db3fd4ece4',
    packageName: 'code',
    title: { caption: 'Код', icon: IconCode },
    routing: {
      routesDict: { entry, articles },
      routes: [entry, articles],
    },
  };
};

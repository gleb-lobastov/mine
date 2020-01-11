import React from 'react';

export const entry = {
  path: '/',
  Component: React.lazy(() =>
    import(/* webpackChunkName: 'code-Dashboard' */ './pages/CodeDashboard'),
  ),
};

export const articles = {
  defaultRouteParams: { tag: 'code' },
  path: '/articles/:tag(code)/:slug?',
  Component: React.lazy(() =>
    import(/* webpackChunkName: 'code-Dashboard' */ '../literature/pages/Articles'),
  ),
};

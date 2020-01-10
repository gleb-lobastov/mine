import React, { useMemo } from 'react';
import { Package } from 'modules/packages';

export default function createPackage({ mountPath }) {
  const entry = {
    path: mountPath,
    Component: React.lazy(() =>
      import(/* webpackChunkName: 'code-Dashboard' */ './pages/CodeDashboard'),
    ),
  };

  const articles = {
    defaultRouteParams: { tag: 'code' },
    path: `${mountPath}/articles/:tag(code)/:slug?`,
    Component: React.lazy(() =>
      import(/* webpackChunkName: 'code-Dashboard' */ '../literature/pages/Articles'),
    ),
  };

  return {
    id: '9f7b3838-779c-452b-9da0-67db3fd4ece4',
    packageName: 'code',
    routing: {
      routesDict: { entry, articles },
      routes: [entry, articles],
    },
  };
}

const {
  routing: { routesDict: routes },
} = createPackage({ mountPath: '' });

export function Code({ mountPath, ...forwardingProps }) {
  return (
    <Package
      name="code"
      mountPath={mountPath}
      routes={routes}
      {...forwardingProps}
    />
  );
}

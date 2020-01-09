import React from 'react';
import { Package } from 'modules/packages';
import MainDashboard from './pages/Dashboard';

export default function createPackage({ mountPath }) {
  return {
    id: '8ea85cf5-8d52-4cb7-b127-6c540ff41531',
    packageName: 'main',
    routing: {
      routes: [
        {
          routeName: 'entry',
          path: mountPath,
          Component: MainDashboard,
        },
      ],
      routesDict: {
        entry: {
          routeName: 'entry',
          path: mountPath,
          Component: MainDashboard,
        },
      },
    },
  };
}

const {
  routing: { routesDict: routes },
} = createPackage({ mountPath: '' });

export function Main({ mountPath, ...forwardingProps }) {
  return (
    <Package
      name="main"
      mountPath={mountPath}
      routes={routes}
      {...forwardingProps}
    />
  );
}

import React from 'react';
import { Package } from 'modules/packages';
import LoginPage from './pages/LoginPage';

export default function createPackage({ mountPath }) {
  return {
    id: '9f7b3838-779c-452b-9da0-67db3fd4ece4',
    packageName: 'auth',
    routing: {
      routes: [
        {
          routeName: 'entry',
          path: mountPath,
          Component: LoginPage,
        },
      ],
      routesDict: {
        entry: {
          routeName: 'entry',
          path: mountPath,
          Component: LoginPage,
        },
      },
    },
  };
}

const {
  routing: { routesDict: routes },
} = createPackage({ mountPath: '' });

export function Auth({ mountPath, ...forwardingProps }) {
  return (
    <Package
      name="auth"
      mountPath={mountPath}
      routes={routes}
      {...forwardingProps}
    />
  );
}

import React from 'react';
import { Switch, Route } from 'react-router';
import isString from 'lodash/isString';
import ComponentWithHook from './ComponentWithHook';
import usePackageLifecycleEffect from './usePackageLifecycleEffect';

function Package({ isActive, mountPath, packageKey, routes, setLayoutProps }) {
  usePackageLifecycleEffect({ packageKey, routes, mountPath });

  if (!isActive || !isString(mountPath)) {
    return null;
  }

  return (
    <Switch>
      {Object.values(routes).map(
        ({
          Component,
          layoutProps,
          path,
          exact = true,
          ...forwardingRouteProps
        }) => {
          const actualPath = `${mountPath}${path}`;
          return (
            <Route
              key={actualPath}
              path={actualPath}
              exact={exact}
              render={routerProps => (
                <ComponentWithHook
                  Component={Component}
                  actualPath={actualPath}
                  routerProps={routerProps}
                  layoutProps={layoutProps}
                  setLayoutProps={setLayoutProps}
                />
              )}
              {...forwardingRouteProps}
            />
          );
        },
      )}
    </Switch>
  );
}

Package.defaultProps = {
  isActive: false,
  routes: {},
};

export default React.memo(Package);

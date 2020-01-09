import React, { useEffect, useContext, useRef } from 'react';
import PropTypes from 'prop-types';
import warning from 'warning';
import { Switch, Route } from 'react-router';
import PackageContext from '../PackagesContext';
import { routeShape } from '../propTypes';

function Package({ name, routes, mountPath, isActive }) {
  const { registerPackage, unregisterPackage } = useContext(PackageContext);
  const routesRef = useRef(routes);
  useEffect(
    () => {
      if (!mountPath) {
        const routesStr = JSON.stringify(Object.keys(routesRef.current || {}));
        warning(false, `Package with routes ${routesStr} has no mountPath`);
        return undefined;
      }
      const packageKey = name || mountPath;
      registerPackage(packageKey, { routes: routesRef.current, mountPath });
      return () => unregisterPackage(packageKey);
    },
    [name, mountPath],
  );

  if (!isActive || !mountPath) {
    return null;
  }

  return (
    <Switch>
      {Object.values(routes).map(
        ({ Component, path, exact = true, ...forwardingProps }) => {
          const actualPath = `${mountPath}${path}`;
          return (
            <Route
              key={actualPath}
              path={actualPath}
              exact={exact}
              component={Component}
              {...forwardingProps}
            />
          );
        },
      )}
    </Switch>
  );
}

Package.propTypes = {
  routes: PropTypes.objectOf(PropTypes.shape(routeShape)),
  mountPath: PropTypes.string.isRequired,
  isActive: PropTypes.bool,
  name: PropTypes.string,
};

Package.defaultProps = {
  routes: {},
  isActive: false,
  name: undefined,
};

export default React.memo(Package);

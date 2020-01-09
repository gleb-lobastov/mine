import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router';
import { routeShape } from '../propTypes';
import usePackageLifecycleEffect from './usePackageLifecycleEffect';

function Package({ name, routes, mountPath, isActive }) {
  usePackageLifecycleEffect({ name, routes, mountPath });

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

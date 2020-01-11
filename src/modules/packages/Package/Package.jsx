import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router';
import isString from 'lodash/isString';
import { routeShape } from '../propTypes';
import usePackageLifecycleEffect from './usePackageLifecycleEffect';

function Package({ isActive, mountPath, packageKey, routes }) {
  usePackageLifecycleEffect({ packageKey, routes, mountPath });

  if (!isActive || !isString(mountPath)) {
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
  isActive: PropTypes.bool,
  mountPath: PropTypes.string.isRequired,
  packageKey: PropTypes.string.isRequired,
  routes: PropTypes.objectOf(PropTypes.shape(routeShape)),
};

Package.defaultProps = {
  isActive: false,
  routes: {},
};

export default React.memo(Package);

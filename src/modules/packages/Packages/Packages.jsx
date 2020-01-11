import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router';
import isString from 'lodash/isString';
import PlainLoader from 'modules/components/loaders/PlainLoader';
import PackagesContext from '../PackagesContext';
import usePackagesContextValue from './usePackagesContextValue';

export default function Packages({ children, Loader, Wrapper }) {
  const packagesContextValue = usePackagesContextValue();
  const { packages } = packagesContextValue;

  const transformedChildrenNode = React.Children.map(children, child => {
    if (!child) {
      return null;
    }

    const { mountPath, alias } = child.props;
    const packageKey = alias || mountPath;
    const isRegistered = Boolean(packages[packageKey]);

    if (!isString(mountPath)) {
      return null;
    }

    return (
      <React.Suspense fallback={<Loader />}>
        <Route key={mountPath} path={mountPath}>
          {routerProps =>
            React.cloneElement(child, {
              ...child.props,
              isActive: isRegistered && routerProps.match !== null,
              packageKey,
            })
          }
        </Route>
      </React.Suspense>
    );
  });

  const actualChildrenNode = Wrapper ? (
    <Wrapper>{transformedChildrenNode}</Wrapper>
  ) : (
    transformedChildrenNode
  );

  return (
    <PackagesContext.Provider value={packagesContextValue}>
      {actualChildrenNode}
    </PackagesContext.Provider>
  );
}

Packages.propTypes = {
  children: PropTypes.node.isRequired,
  Wrapper: PropTypes.func,
  Loader: PropTypes.func,
};

Packages.defaultProps = {
  Wrapper: null,
  Loader: PlainLoader,
};

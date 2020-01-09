import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router';
import PlainLoader from 'modules/components/loaders/PlainLoader';
import PackagesContext from '../PackagesContext';
import usePackagesContextValue from './usePackagesContextValue';

export default function Packages({ children, Loader, Wrapper }) {
  const packagesContextValue = usePackagesContextValue();

  const transformedChildrenNode = React.Children.map(children, child => {
    const { mountPath } = child.props;
    return (
      <React.Suspense fallback={<Loader />}>
        <Route key={mountPath} path={mountPath}>
          {routerProps =>
            React.cloneElement(child, {
              ...child.props,
              isActive: routerProps.match !== null,
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

import React from 'react';
import PropTypes from 'prop-types';
import collectPaths, { pathsPropTypes } from './collectPaths';

const AppContext = React.createContext({});

export default AppContext;

export const withConfig = Component => props => (
  <AppContext.Consumer>
    {config => <Component {...props} config={config} />}
  </AppContext.Consumer>
);

export const withPackages = Component => props => (
  <AppContext.Consumer>
    {({ packages }) => <Component {...props} packages={packages} />}
  </AppContext.Consumer>
);

export const withPaths = Component => props => (
  <AppContext.Consumer>
    {({ packages }) => <Component {...props} {...collectPaths(packages)} />}
  </AppContext.Consumer>
);

export const routeConfigPropTypes = {
  routeName: PropTypes.string,
  path: PropTypes.string,
  Component: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
};

export const routesMenuConfigType = {
  routeName: PropTypes.string,
  caption: PropTypes.string,
};

export const packagePropTypes = {
  id: PropTypes.string,
  packageName: PropTypes.string,
  title: PropTypes.shape({
    caption: PropTypes.string,
    icon: PropTypes.func,
  }),
  routing: PropTypes.shape({
    routes: PropTypes.arrayOf(PropTypes.shape(routeConfigPropTypes)),
    menu: PropTypes.arrayOf(PropTypes.shape(routesMenuConfigType)),
  }),
};

export const configPropTypes = {
  packages: PropTypes.arrayOf(PropTypes.shape(packagePropTypes)).isRequired,
};

export { pathsPropTypes };
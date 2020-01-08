import React from 'react';
import PropTypes from 'prop-types';
import reactComponentPropType from 'modules/customPropTypes/reactComponentPropType';
import Path from 'modules/utilities/routing/Path';
import collectPaths, { pathsPropTypes, pathPropType } from './collectPaths';

const AppContext = React.createContext({});

export default AppContext;

export const withPaths = Component => props => (
  <AppContext.Consumer>
    {({ packages }) => <Component {...props} {...collectPaths(packages)} />}
  </AppContext.Consumer>
);

export const withNavigation = Component => props => (
  <AppContext.Consumer>
    {({ navigation }) => <Component {...props} navigation={navigation} />}
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
    icon: reactComponentPropType,
  }),
  routing: PropTypes.shape({
    routes: PropTypes.arrayOf(PropTypes.shape(routeConfigPropTypes)),
    menu: PropTypes.arrayOf(PropTypes.shape(routesMenuConfigType)),
  }),
};

export const navigationPropTypes = {
  menu: PropTypes.arrayOf(
    PropTypes.shape({
      route: PropTypes.instanceOf(Path),
      caption: PropTypes.string,
      icon: PropTypes.func,
      menu: PropTypes.arrayOf(
        PropTypes.shape({
          route: PropTypes.instanceOf(Path),
          caption: PropTypes.string,
        }),
      ),
    }),
  ),
};

export const configPropTypes = {
  packages: PropTypes.arrayOf(PropTypes.shape(packagePropTypes)).isRequired,
};

export { pathsPropTypes, pathPropType };

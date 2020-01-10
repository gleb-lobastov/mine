import PropTypes from 'prop-types';
import reactComponentPropType from 'modules/customPropTypes/reactComponentPropType';

export const routeConfigPropTypes = {
  path: PropTypes.string,
  Component: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
};

export const routesMenuConfigType = {
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

export const configPropTypes = {
  packages: PropTypes.arrayOf(PropTypes.shape(packagePropTypes)).isRequired,
};

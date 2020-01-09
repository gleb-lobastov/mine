import PropTypes from 'prop-types';

export const routeShape = {
  path: PropTypes.string,
  Component: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
};

import PropTypes from 'prop-types';

export const packagePropTypes = {
  mountPath: PropTypes.string,
};

export const configPropTypes = {
  packages: PropTypes.objectOf(PropTypes.shape(packagePropTypes)).isRequired,
};

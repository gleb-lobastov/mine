/* eslint-disable import/prefer-default-export */
import PropTypes from 'prop-types';
import Path from 'modules/utilities/routing/Path';

export default {
  menu: PropTypes.arrayOf(
    PropTypes.shape({
      path: PropTypes.instanceOf(Path),
      caption: PropTypes.string,
      icon: PropTypes.func,
      menu: PropTypes.arrayOf(
        PropTypes.shape({
          path: PropTypes.instanceOf(Path),
          caption: PropTypes.string,
        }),
      ),
    }),
  ),
};

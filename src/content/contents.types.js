import PropTypes from 'prop-types';

export const articlePropTypes = {
  date: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
};

export const contentsPropTypes = {
  articles: PropTypes.arrayOf(PropTypes.shape(articlePropTypes)),
};

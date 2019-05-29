import PropTypes from 'prop-types';

export default {
  content: PropTypes.string,
  date: PropTypes.instanceOf(Date),
  header: PropTypes.string,
  id: PropTypes.number,
};

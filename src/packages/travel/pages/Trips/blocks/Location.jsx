import React from 'react';
import PropTypes from 'prop-types';

const Location = ({ location: { locationName = 'unknown' } }) => (
  <div>{locationName}</div>
);

Location.propTypes = {
  location: PropTypes.shape({
    locationName: PropTypes.string,
  }),
};

Location.defaultProps = {
  location: {},
};

export default Location;

import React from 'react';
import PropTypes from 'prop-types';

const Visit = ({ visit: { locationId } = {}, locationsDict }) => {
  const location = locationsDict[locationId] || {};
  const { locationName = 'unknown' } = location;
  return <div>{locationName}</div>;
};

Visit.propTypes = {
  visit: PropTypes.shape({
    tripId: PropTypes.number,
    orderInTrip: PropTypes.number,
  }).isRequired,
  locationsDict: PropTypes.objectOf(
    PropTypes.shape({
      locationId: PropTypes.number,
      locationName: PropTypes.string,
    }),
  ).isRequired,
};

export default Visit;

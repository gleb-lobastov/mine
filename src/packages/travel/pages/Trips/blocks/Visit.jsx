import React from 'react';
import PropTypes from 'prop-types';
import Location from './Location';

const Visit = ({ visit: { locationId } = {}, locationsDict }) => (
  <Location location={locationsDict[locationId]} />
);

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

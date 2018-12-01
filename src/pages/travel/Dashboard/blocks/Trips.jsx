import React from 'react';
import PropTypes from 'prop-types';
import withContents from 'state/withContentsHOC';

const Trips = ({ contents: { trips = [] } = {} }) => (
  <div>
    {trips.map(({ tripName }, tripIndex) => (
      <div key={tripName}>{`${tripIndex + 1}. ${tripName}`}</div>
    ))}
  </div>
);
Trips.propTypes = {
  contents: PropTypes.shape({
    trips: PropTypes.arrayOf(
      PropTypes.shape({
        tripName: PropTypes.string,
      }),
    ),
  }).isRequired,
};

export default withContents(Trips);

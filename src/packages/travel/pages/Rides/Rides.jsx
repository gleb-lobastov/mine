import React from 'react';
import PropTypes from 'prop-types';
import withProvision from 'core/connection/withProvision';

const Rides = ({ rides: { data: ridesList = [] } = {} }) => (
  <div>
    {ridesList.map(({ vehicleName, arrivalDateTime }) => (
      <div>
        <span>{vehicleName}</span>
        {arrivalDateTime && (
          <>
            <span>, </span>
            <span>{arrivalDateTime.toLocaleDateString()}</span>
          </>
        )}
      </div>
    ))}
  </div>
);
Rides.propTypes = {
  rides: PropTypes.shape({
    data: PropTypes.arrayOf(
      PropTypes.shape({
        vehicleName: PropTypes.string,
        arrivalDateTime: PropTypes.instanceOf(Date),
      }),
    ),
  }).isRequired,
};

export default withProvision(() => ({
  require: {
    rides: {
      modelName: 'rides',
    },
  },
  meta: {
    domain: 'trips',
  },
}))(Rides);

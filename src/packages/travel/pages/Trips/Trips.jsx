import React from 'react';
import PropTypes from 'prop-types';
import groupBy from 'lodash/groupBy';
import withProvision from 'core/connection/withProvision';

const Trips = ({
  provision: { trips = [], visits = [], locations = [] } = {},
}) => {
  const visitsByTrips = groupBy(visits, 'tripId');
  return (
    <div>
      {trips.map(({ tripName, tripId }, tripIndex) => (
        <div>
          <h1 key={tripName}>{`${tripIndex + 1}. ${tripName}`}</h1>
          {visitsByTrips[tripId] &&
            visitsByTrips[tripId].map(({ locationId }) => (
              <div>
                {(
                  locations.find(
                    ({ locationId: locationIdToCompare }) =>
                      locationIdToCompare === locationId,
                  ) || {}
                ).locationName || 'unknown'}
              </div>
            ))}
        </div>
      ))}
    </div>
  );
};
Trips.propTypes = {
  provision: PropTypes.shape({
    trips: PropTypes.arrayOf(
      PropTypes.shape({
        tripName: PropTypes.string,
      }),
    ),
  }).isRequired,
};

export default withProvision(() => ({
  require: ['trips', 'visits', 'locations'],
  meta: {
    domain: 'trips',
  },
}))(Trips);

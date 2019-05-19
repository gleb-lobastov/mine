import React from 'react';
import PropTypes from 'prop-types';
import groupBy from 'lodash/groupBy';
import withProvision from 'core/connection/withProvision';

const Trips = ({
  trips: { data: tripsList = [] } = {},
  visits: { data: visitsList = [] } = {},
  locations: { data: locationsList = [] } = {},
}) => {
  const visitsByTrips = groupBy(visitsList, 'tripId');
  return (
    <div>
      {tripsList.map(({ tripName, tripId }, tripIndex) => (
        <div>
          <h1 key={tripName}>{`${tripIndex + 1}. ${tripName}`}</h1>
          {visitsByTrips[tripId] &&
            visitsByTrips[tripId]
              .sort(
                (
                  { orderInTrip: orderInTripA },
                  { orderInTrip: orderInTripB },
                ) => orderInTripA - orderInTripB,
              )
              .map(({ locationId }) => (
                <div>
                  {(
                    locationsList.find(
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
  trips: PropTypes.shape({
    data: PropTypes.arrayOf(
      PropTypes.shape({
        tripName: PropTypes.string,
        tripId: PropTypes.number,
      }),
    ),
  }).isRequired,
  visits: PropTypes.shape({
    data: PropTypes.arrayOf(
      PropTypes.shape({
        tripId: PropTypes.number,
        orderInTrip: PropTypes.number,
      }),
    ),
  }).isRequired,
  locations: PropTypes.shape({
    data: PropTypes.arrayOf(
      PropTypes.shape({
        locationId: PropTypes.number,
        locationName: PropTypes.string,
      }),
    ),
  }).isRequired,
};

export default withProvision(() => ({
  require: {
    trips: {
      modelName: 'trips',
    },
    visits: {
      modelName: 'visits',
    },
    locations: {
      modelName: 'locations',
    },
  },
  meta: {
    domain: 'trips',
  },
}))(Trips);

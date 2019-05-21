import React from 'react';
import PropTypes from 'prop-types';
import { selectDict } from 'core/connection';
import withProvision from 'core/connection/withProvision';
import Trip from './blocks/Trip';

const Trips = ({
  trips: { data: tripsList = [] } = {},
  visits: { data: visitsList = [] } = {},
  locationsDict,
}) =>
  !locationsDict ? (
    <div>None</div>
  ) : (
    <div>
      {tripsList.map((trip, tripIndex) => (
        <div>
          <h1 key={trip.tripName}>{`${tripIndex + 1}. ${trip.tripName}`}</h1>
          <Trip
            key={trip.tripId}
            trip={trip}
            visitsList={visitsList}
            locationsDict={locationsDict}
          />
        </div>
      ))}
    </div>
  );
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
  locationsDict: PropTypes.arrayOf(
    PropTypes.shape({
      locationId: PropTypes.number,
      locationName: PropTypes.string,
    }),
  ).isRequired,
};

export default withProvision(
  () => ({
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
  }),
  state => ({ locationsDict: selectDict(state, 'locations') }),
)(Trips);

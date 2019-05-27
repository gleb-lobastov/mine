import React, { useCallback } from 'react';
import compose from 'lodash/fp/compose';
import PropTypes from 'prop-types';
import { selectDict } from 'core/connection';
import withProvision from 'core/connection/withProvision';
import { authContextPropTypes, withAuth } from 'core/context/AuthContext';
import Trip from './blocks/Trip';

const createOrderCalculator = resolveOrder => ({ index, collection }) => {
  if (index <= 0) {
    return resolveOrder(collection[0]) - 1;
  }
  if (index >= collection.length - 1) {
    return resolveOrder(collection[collection.length - 1]) + 1;
  }
  const prevOrder = resolveOrder(collection[index]);
  const nextOrder = resolveOrder(collection[index + 1]);
  const randomness = ((Math.random() - 0.5) * (nextOrder - prevOrder)) / 2;
  return (prevOrder + nextOrder) / 2 + randomness;
};
const calcOrder = createOrderCalculator(({ orderInTrip }) => orderInTrip);

const Trips = ({
  trips: { data: tripsList = [] } = {},
  visits: { data: visitsList = [] } = {},
  locationsDict,
  ridesDict,
  request,
  isAuthenticated,
}) => {
  if (!locationsDict || !ridesDict) {
    return <div>None</div>;
  }
  const handleSortEndOfVisit = useCallback(
    ({ oldIndex, newIndex, collection }) => {
      if (oldIndex === newIndex) {
        return;
      }
      request({
        modelName: 'visits',
        query: {
          id: collection[oldIndex].visitId,
          body: {
            orderInTrip: calcOrder({ index: newIndex, collection }),
          },
        },
        meta: {
          domain: 'trips.visits',
        },
      });
    },
    [request],
  );
  const handleRideUpdate = useCallback(
    ({ ride, departureFromVisitId, arrivalToVisitId }) => {
      request({
        modelName: 'rides',
        query: {
          id: ride && ride.id,
          body: {
            ...ride,
            departureFromVisitId,
            arrivalToVisitId,
          },
        },
        meta: {
          domain: 'trips.visits.rides',
        },
      });
    },
    [request],
  );

  return (
    <div>
      {tripsList.map((trip, tripIndex) => (
        <div key={trip.tripId}>
          <h1 key={trip.tripName}>{`${tripIndex + 1}. ${trip.tripName}`}</h1>
          <Trip
            isEditable={isAuthenticated}
            onSortEndOfVisit={handleSortEndOfVisit}
            onRideUpdate={handleRideUpdate}
            trip={trip}
            visitsList={visitsList}
            locationsDict={locationsDict}
            ridesDict={ridesDict}
          />
        </div>
      ))}
    </div>
  );
};
Trips.propTypes = {
  isAuthenticated: authContextPropTypes.isAuthenticated.isRequired,
  request: PropTypes.func.isRequired,
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
  ridesDict: PropTypes.arrayOf(
    PropTypes.shape({
      rideId: PropTypes.number,
      vehicleTypeId: PropTypes.number,
    }),
  ).isRequired,
};

export default compose(
  withAuth,
  withProvision(
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
        rides: {
          modelName: 'rides',
        },
      },
      meta: {
        domain: 'trips',
      },
    }),
    state => ({
      locationsDict: selectDict(state, 'locations'),
      ridesDict: selectDict(state, 'rides'),
    }),
  ),
)(Trips);

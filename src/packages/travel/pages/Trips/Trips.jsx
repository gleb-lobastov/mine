import React, { useCallback } from 'react';
import compose from 'lodash/fp/compose';
import PropTypes from 'prop-types';
import groupBy from 'lodash/groupBy';
import mapValues from 'lodash/mapValues';
import EditIcon from '@material-ui/icons/Edit';
import { memoizeByLastArgs } from 'modules/utilities/memo';
import { selectDict } from 'core/connection';
import withProvision from 'core/connection/withProvision';
import { authContextPropTypes, withAuth } from 'core/context/AuthContext';
import TripEditDialog from 'travel/components/models/trips/TripEditDialog';
import locationsPropTypes from 'travel/models/locations/propTypes';
import ridesPropTypes from 'travel/models/rides/propTypes';
import initializeTrip from 'travel/models/trips/initialize';
import tripPropTypes from 'travel/models/trips/propTypes';
import visitPropTypes from 'travel/models/visits/propTypes';
import Trip from './blocks/Trip';
import { submitRide, submitOrderInTrip, submitTrip } from './actionCreators';

const groupAndOrderVisitsByTrips = memoizeByLastArgs(visitsList =>
  mapValues(groupBy(visitsList, 'tripId'), tripVisitsList =>
    tripVisitsList.sort(
      ({ orderInTrip: orderInTripA }, { orderInTrip: orderInTripB }) =>
        orderInTripA - orderInTripB,
    ),
  ),
);

const Trips = ({
  trips: { data: tripsList = [] } = {},
  visits: { data: visitsList = [] } = {},
  locationsDict,
  ridesDict,
  request,
  isAuthenticated: isEditable,
}) => {
  if (!ridesDict || !visitsList) {
    return <div>None</div>;
  }
  const handleVisitsOrderUpdate = useCallback(
    (event, { oldIndex, newIndex, collection }) => {
      if (oldIndex !== newIndex) {
        request(submitOrderInTrip({ oldIndex, newIndex, collection }));
      }
    },
    [request],
  );
  const handleRideUpdate = useCallback(ride => request(submitRide({ ride })), [
    request,
  ]);
  const handleTripUpdate = useCallback(trip => request(submitTrip({ trip })), [
    request,
  ]);

  const visitsGroupedByTrips = groupAndOrderVisitsByTrips(visitsList);
  return (
    <>
      {isEditable && (
        <TripEditDialog
          initialState={initializeTrip()}
          onSubmit={handleTripUpdate}
        >
          <EditIcon />
        </TripEditDialog>
      )}
      {tripsList.map((trip, tripIndex) => {
        const { tripId } = trip;
        return (
          <div key={tripId}>
            <Trip
              isEditable={isEditable}
              locationsDict={locationsDict}
              onRideUpdate={handleRideUpdate}
              onTripUpdate={handleTripUpdate}
              onVisitsOrderUpdate={handleVisitsOrderUpdate}
              ridesDict={ridesDict}
              trip={trip}
              tripIndex={tripIndex}
              tripVisitsList={visitsGroupedByTrips[tripId]}
            />
          </div>
        );
      })}
    </>
  );
};
Trips.propTypes = {
  isAuthenticated: authContextPropTypes.isAuthenticated.isRequired,
  request: PropTypes.func.isRequired,
  trips: PropTypes.shape({
    data: PropTypes.arrayOf(PropTypes.shape(tripPropTypes)),
  }).isRequired,
  visits: PropTypes.shape({
    data: PropTypes.arrayOf(PropTypes.shape(visitPropTypes)),
  }).isRequired,
  ridesDict: PropTypes.objectOf(PropTypes.shape(ridesPropTypes)).isRequired,
  locationsDict: PropTypes.objectOf(PropTypes.shape(locationsPropTypes))
    .isRequired,
};

export default compose(
  withAuth,
  withProvision(
    () => ({
      require: {
        locations: {
          modelName: 'locations',
          query: { navigation: { isDisabled: true } },
        },
        rides: {
          modelName: 'rides',
          query: { navigation: { isDisabled: true } },
        },
        trips: {
          modelName: 'trips',
          query: { navigation: { isDisabled: true } },
        },
        visits: {
          modelName: 'visits',
          query: { navigation: { isDisabled: true } },
        },
      },
      meta: { domain: 'trips' },
    }),
    state => ({
      locationsDict: selectDict(state, 'locations'),
      ridesDict: selectDict(state, 'rides'),
    }),
  ),
)(Trips);

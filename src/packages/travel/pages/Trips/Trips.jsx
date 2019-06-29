import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import compose from 'lodash/fp/compose';
import groupBy from 'lodash/groupBy';
import mapValues from 'lodash/mapValues';
import EditIcon from '@material-ui/icons/Edit';
import { memoizeByLastArgs } from 'modules/utilities/memo';
import { selectDict, selectProvisionStatus } from 'core/connection';
import withProvision from 'core/connection/withProvision';
import { authContextPropTypes, useAuthContext } from 'core/context/AuthContext';
import TripEditDialog from 'travel/components/models/trips/TripEditDialog';
import locationsPropTypes from 'travel/models/locations/propTypes';
import ridesPropTypes from 'travel/models/rides/propTypes';
import initializeTrip from 'travel/models/trips/initialize';
import tripPropTypes from 'travel/models/trips/propTypes';
import visitPropTypes from 'travel/models/visits/propTypes';
import Trip from './blocks/Trip';
import {
  submitRide,
  submitOrderInTrip,
  submitTrip,
  submitVisit,
} from './actionCreators';

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
}) => {
  const { isAuthenticated: isEditable } = useAuthContext();
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

  const handleRideUpdate = useCallback(
    ride =>
      request(
        submitRide({
          ride,
        }),
      ),
    [request],
  );

  const handleTripUpdate = useCallback(
    trip =>
      request(
        submitTrip({
          trip,
        }),
      ),
    [request],
  );

  const handleVisitUpdate = useCallback(
    (visit, { indexInCollection, collection, tripId }) =>
      request(
        submitVisit({
          visit,
          tripId,
          indexInCollection,
          collection,
        }),
      ),
    [request],
  );

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
              locationsDict={locationsDict}
              onRideUpdate={handleRideUpdate}
              onTripUpdate={handleTripUpdate}
              onVisitUpdate={handleVisitUpdate}
              onVisitsOrderUpdate={handleVisitsOrderUpdate}
              ridesDict={ridesDict}
              trip={trip}
              tripIndex={tripIndex}
              tripVisitsList={visitsGroupedByTrips[tripId]}
              isEditable={isEditable}
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

const mapStateToRequirements = (
  state,
  {
    match: {
      params: { userAlias },
    },
  },
  { userAlias: prevUserAlias } = {},
) => {
  const { fallback = {} } = selectProvisionStatus(state, 'trips.trips') || {};
  const { data: userTripsIds = [] } = fallback[0] || {};
  const isUserChanged = prevUserAlias !== userAlias;
  return {
    identity: {
      userAlias,
      userTripsIds,
    },
    require: {
      locations: {
        modelName: 'locations',
        isMissingIf: !prevUserAlias,
        query: { navigation: { isDisabled: true } },
      },
      trips: {
        modelName: 'trips',
        isMissingIf: isUserChanged,
        query: { userAlias, navigation: { isDisabled: true } },
      },
      rides: {
        modelName: 'rides',
        isMissingIf: !userTripsIds.length,
        query: {
          filter: { trip_id: { comparator: 'in', value: userTripsIds } },
          navigation: { isDisabled: true },
        },
      },
      visits: {
        modelName: 'visits',
        isMissingIf: !userTripsIds.length,
        query: {
          filter: { trip_id: { comparator: 'in', value: userTripsIds } },
          navigation: { isDisabled: true },
        },
      },
    },
    meta: { domain: 'trips' },
  };
};

const mapStateToProps = state => ({
  locationsDict: selectDict(state, 'locations'),
  ridesDict: selectDict(state, 'rides'),
});

export default compose(
  withRouter,
  withProvision(mapStateToRequirements, mapStateToProps),
)(Trips);

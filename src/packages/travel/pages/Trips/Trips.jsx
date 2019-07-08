import React, { useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import compose from 'lodash/fp/compose';
import uniq from 'lodash/uniq';
import EditIcon from '@material-ui/icons/Edit';
import { memoizeByLastArgs } from 'modules/utilities/memo';
import { selectDict, selectProvisionStatus } from 'core/connection';
import withProvision from 'core/connection/withProvision';
import { withPaths, pathsPropTypes } from 'core/context/AppContext';
import { useAuthContext } from 'core/context/AuthContext';
import WelcomeScreen from 'travel/components/common/WelcomeScreen';
import TripEditDialog from 'travel/components/models/trips/TripEditDialog';
import locationsPropTypes from 'travel/models/locations/propTypes';
import ridesPropTypes from 'travel/models/rides/propTypes';
import initializeTrip from 'travel/models/trips/initialize';
import { groupAndSortVisitsByTrips } from 'travel/models/trips/utils';
import tripPropTypes from 'travel/models/trips/propTypes';
import visitPropTypes from 'travel/models/visits/propTypes';
import Trip from './blocks/Trip';
import {
  submitRide,
  submitOrderInTrip,
  submitTrip,
  submitVisit,
} from './actionCreators';

const memoizedGroupAndSortVisitsByTrips = memoizeByLastArgs(
  groupAndSortVisitsByTrips,
);

const Trips = ({
  match: {
    params: { userAlias: visitedUserAlias },
  },
  trips: { data: tripsList = [] } = {},
  visits: { data: visitsList = [] } = {},
  locationsDict,
  namedPaths,
  ridesDict,
  request,
}) => {
  const {
    isAuthenticated,
    userAlias: authenticatedUserAlias,
  } = useAuthContext();

  const isEditable =
    isAuthenticated && authenticatedUserAlias === visitedUserAlias;

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
    (visit, { indexInCollection, collection, tripId } = {}) =>
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

  // changes of node, when used in WelcomeScreen lead to recreation of
  // Message Component, so loosing all internal state of TripEditDialog
  // actually it became hidden, after isOpen flag reset
  const addTripNode = useMemo(
    () => (
      <TripEditDialog
        initialState={initializeTrip()}
        onSubmit={handleTripUpdate}
      >
        <EditIcon />
      </TripEditDialog>
    ),
    [handleTripUpdate],
  );
  if (!tripsList.length) {
    return (
      <WelcomeScreen shouldShowLinkToTrips={false}>{addTripNode}</WelcomeScreen>
    );
  }

  const visitsGroupedByTrips = memoizedGroupAndSortVisitsByTrips(visitsList);
  return (
    <>
      {isEditable && addTripNode}
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
              storyUrl={namedPaths.travel.tripStory.toUrl({
                strTripId: String(tripId),
              })}
            />
          </div>
        );
      })}
    </>
  );
};

Trips.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      userAlias: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  namedPaths: pathsPropTypes.namedPaths.isRequired,
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
    locationsDict = {},
    match: {
      params: { userAlias },
    },
  },
  { userAlias: prevUserAlias } = {},
) => {
  const { isComplete: isUserTripsFetchComplete, fallback } =
    selectProvisionStatus(state, 'trips.trips') || {};
  const { data: userTripsIds = [] } = fallback[0] || {};
  const tripsDict = selectDict(state, 'trips');
  const requiredLocationsIds = uniq(
    userTripsIds.reduce((memo, tripId) => {
      const trip = tripsDict[tripId];
      if (trip) {
        const { originLocationId } = trip;
        if (originLocationId) {
          memo.push(originLocationId);
        }
      }
      return memo;
    }, []),
  );
  const missingLocationsIds = requiredLocationsIds.filter(
    requiredLocationId => !locationsDict[requiredLocationId],
  );
  const isUserChanged = prevUserAlias !== userAlias;
  return {
    identity: {
      userAlias,
      userTripsIds,
      missingLocationsIds,
    },
    require: {
      locations: {
        modelName: 'locations',
        isMissingIf: missingLocationsIds.length,
        query: {
          filter: {
            id: { comparator: 'in', value: missingLocationsIds },
          },
          navigation: { isDisabled: true },
        },
      },
      trips: {
        modelName: 'trips',
        isMissingIf: isUserChanged,
        query: { userAlias, navigation: { isDisabled: true } },
      },
      rides: {
        modelName: 'rides',
        isMissingIf: isUserTripsFetchComplete && userTripsIds.length,
        query: {
          filter: { trip_id: { comparator: 'in', value: userTripsIds } },
          navigation: { isDisabled: true },
        },
      },
      visits: {
        modelName: 'visits',
        isMissingIf: isUserTripsFetchComplete && userTripsIds.length,
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
  withPaths,
  withProvision(mapStateToRequirements, mapStateToProps),
)(Trips);

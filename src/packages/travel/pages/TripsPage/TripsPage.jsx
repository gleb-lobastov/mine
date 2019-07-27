import React, { useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import compose from 'lodash/fp/compose';
import Button from '@material-ui/core/Button';
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
import { selectUserTripsIds, selectLocationsIds } from './selectors';

const memoizedGroupAndSortVisitsByTrips = memoizeByLastArgs(
  groupAndSortVisitsByTrips,
);

const TripsPage = ({
  match: {
    params: { userAlias: visitedUserAlias },
  },
  isTripsComplete,
  trips: { data: tripsList = [] } = {},
  visits: { data: visitsList = [] } = {},
  locationsDict,
  namedPaths,
  ridesDict,
  request,
  invalidateRequest,
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
      ).then(() => invalidateRequest({ domain: 'tripsPage.trips' })),
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
      ).then(() => invalidateRequest({ domain: 'tripsPage.visits' })),
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
        <Button size="small" variant="outlined" color="primary">
          Добавить поездку
        </Button>
      </TripEditDialog>
    ),
    [handleTripUpdate],
  );
  if (isTripsComplete && !tripsList.length) {
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

TripsPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      userAlias: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  namedPaths: pathsPropTypes.namedPaths.isRequired,
  request: PropTypes.func.isRequired,
  isTripsComplete: PropTypes.bool.isRequired,
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

const mapStateToProps = state => ({
  locationsDict: selectDict(state, 'locations'),
  ridesDict: selectDict(state, 'rides'),
  isTripsComplete: selectProvisionStatus(state, 'tripsPage.trips')
    .isComplete,
});

const mapStateToRequirements = (
  state,
  {
    match: {
      params: { userAlias },
    },
  },
) => {
  const userTripsIds = selectUserTripsIds(state);
  const { requiredLocationsIds, missingLocationsIds } = selectLocationsIds(
    state,
    userTripsIds,
  );

  return {
    domain: 'tripsPage',
    request: {
      trips: {
        modelName: 'trips',
        observe: userAlias,
        query: { userAlias, navigation: { isDisabled: true } },
      },
      locations: {
        modelName: 'locations',
        observe: requiredLocationsIds,
        isNoop: !missingLocationsIds.length,
        query: {
          filter: { id: { comparator: 'in', value: missingLocationsIds } },
          navigation: { isDisabled: true },
        },
      },
      rides: {
        modelName: 'rides',
        observe: userTripsIds,
        isNoop: !userTripsIds || !userTripsIds.length,
        query: {
          filter: {
            trip_id: { comparator: 'in', value: userTripsIds },
          },
          navigation: { isDisabled: true },
        },
      },
      visits: {
        modelName: 'visits',
        observe: userTripsIds,
        isNoop: !userTripsIds || !userTripsIds.length,
        query: {
          filter: {
            trip_id: { comparator: 'in', value: userTripsIds },
          },
          navigation: { isDisabled: true },
        },
      },
    },
  };
};

export default compose(
  withRouter,
  withPaths,
  withProvision(mapStateToRequirements, mapStateToProps),
)(TripsPage);

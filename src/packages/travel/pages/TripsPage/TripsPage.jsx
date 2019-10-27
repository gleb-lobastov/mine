import React, { useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import compose from 'lodash/fp/compose';
import Button from '@material-ui/core/Button';
import { memoizeByLastArgs } from 'modules/utilities/memo';
import { selectDict, selectProvisionStatus } from 'core/connection';
import { withPaths, pathsPropTypes } from 'core/context/AppContext';
import { useAuthContext } from 'core/context/AuthContext';
import withTripsData, {
  DATA_CHUNKS,
} from 'travel/components/common/withTripsData/withTripsData';
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

const TripsPage = ({
  match: {
    params: { userAlias: visitedUserAlias },
  },
  isTripsComplete,
  userTrips: { data: tripsList = [] } = {},
  userVisits: { data: visitsList = [] } = {},
  countriesDict,
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
              countriesDict={countriesDict}
              onRideUpdate={handleRideUpdate}
              onTripUpdate={handleTripUpdate}
              onVisitUpdate={handleVisitUpdate}
              onVisitsOrderUpdate={handleVisitsOrderUpdate}
              ridesDict={ridesDict}
              trip={trip}
              tripIndex={tripIndex}
              tripVisitsList={visitsGroupedByTrips[tripId]}
              isEditable={isEditable}
              storyPath={namedPaths.travel.tripStory}
              locationPath={namedPaths.travel.locationPath}
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
  countriesDict: selectDict(state, 'countries'),
  locationsDict: selectDict(state, 'locations'),
  ridesDict: selectDict(state, 'rides'),
  isTripsComplete: selectProvisionStatus(state, 'tripsPage.userTrips')
    .isComplete,
});

export default compose(
  withPaths,
  withTripsData({
    domain: 'tripsPage',
    mapStateToProps,
    requirementsConfig: {
      [DATA_CHUNKS.COMMON.COUNTRIES]: true,
      [DATA_CHUNKS.USER.TRIPS]: true,
      [DATA_CHUNKS.USER.LOCATIONS]: true,
      [DATA_CHUNKS.USER.VISITS]: true,
      [DATA_CHUNKS.USER.RIDES]: true,
    },
  }),
)(TripsPage);

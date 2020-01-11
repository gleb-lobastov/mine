import React, { useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import compose from 'lodash/fp/compose';
import Button from '@material-ui/core/Button';
import { memoizeByLastArgs } from 'modules/utilities/memo';
import { usePaths } from 'modules/packages';
import { selectDict, selectProvisionStatus } from 'core/connection';
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

function TripEditPage({
  match: {
    params: { userAlias: visitedUserAlias, strTripId },
  },
  isTripsComplete,
  userTrips: { data: tripsList = [] } = {},
  userVisits: { data: visitsList = [] } = {},
  countriesDict,
  locationsDict,
  ridesDict,
  request,
  invalidateRequest,
}) {
  const {
    isAuthenticated,
    userAlias: authenticatedUserAlias,
  } = useAuthContext();

  const {
    travel: { tripStory: tripStoryPath, location: locationPath },
  } = usePaths();

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

  const specifiedTripId = parseInt(strTripId, 10);
  const tripToEdit =
    specifiedTripId &&
    tripsList.find(({ tripId }) => tripId === specifiedTripId);

  const isEditable =
    isAuthenticated && authenticatedUserAlias === visitedUserAlias;

  if (!isTripsComplete || !tripToEdit || !isEditable) {
    return null;
  }

  const visitsGroupedByTrips = memoizedGroupAndSortVisitsByTrips(visitsList);
  const { tripId } = tripToEdit;
  return (
    <Trip
      locationsDict={locationsDict}
      countriesDict={countriesDict}
      onRideUpdate={handleRideUpdate}
      onTripUpdate={handleTripUpdate}
      onVisitUpdate={handleVisitUpdate}
      onVisitsOrderUpdate={handleVisitsOrderUpdate}
      ridesDict={ridesDict}
      trip={tripToEdit}
      tripVisitsList={visitsGroupedByTrips[tripId]}
      tripStoryPath={tripStoryPath}
      locationPath={locationPath}
    />
  );
}

TripEditPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      userAlias: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
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
)(TripEditPage);

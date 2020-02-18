import React from 'react';
import PropTypes from 'prop-types';
import { usePaths } from 'modules/packages';
import { useAuthContext } from 'core/context/AuthContext';
import { useTripsStats } from 'travel/dataSource/useTrips';
import Trip from './blocks/Trip';

function TripsPage({
  match: {
    params: { userAlias: visitedUserAlias, strTripId },
  },
}) {
  const {
    isAuthenticated,
    userAlias: authenticatedUserAlias,
  } = useAuthContext();

  const {
    travel: {
      tripStory: tripStoryPath,
      locations: locationsPath,
      tripEdit: tripEditPath,
    },
  } = usePaths();

  const {
    isError,
    isPending,
    tripsIds,
    tripsDict,
    countriesDict,
    locationsDict,
    visitsDict,
    ridesDict,
  } = useTripsStats({ userAlias: visitedUserAlias });

  const specifiedTripId = parseInt(strTripId, 10);
  const actualTripsIds = specifiedTripId
    ? tripsIds.filter(tripId => tripId === specifiedTripId)
    : tripsIds;
  const tripsList = actualTripsIds
    .map(tripId => tripsDict[tripId])
    .filter(Boolean);

  const isEditable =
    isAuthenticated && authenticatedUserAlias === visitedUserAlias;

  if (isError) {
    return <div>...Error</div>;
  }
  if (isPending) {
    return <div>...Loading</div>;
  }

  return (
    <>
      {tripsList.map(trip => {
        const { tripId } = trip;
        return (
          <div key={tripId}>
            <Trip
              locationsDict={locationsDict}
              countriesDict={countriesDict}
              ridesDict={ridesDict}
              trip={trip}
              tripVisitsList={trip.visits.map(visitId => visitsDict[visitId])}
              isEditable={isEditable}
              tripStoryUrl={tripStoryPath.toUrl({
                strTripId: String(tripId),
                userAlias: visitedUserAlias,
              })}
              locationsPath={locationsPath}
              tripEditUrl={tripEditPath.toUrl({
                strTripId: String(tripId),
                userAlias: visitedUserAlias,
              })}
            />
          </div>
        );
      })}
    </>
  );
}

TripsPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      userAlias: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default TripsPage;

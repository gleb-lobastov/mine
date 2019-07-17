import React from 'react';
import PropTypes from 'prop-types';
import groupBy from 'lodash/groupBy';
import uniqBy from 'lodash/uniqBy';
import property from 'lodash/property';
import withProvision from 'core/connection/withProvision';
import { selectProvisionStatus } from 'core/connection';
import WelcomeScreen from 'travel/components/common/WelcomeScreen';
import visitPropTypes from 'travel/models/visits/propTypes';

const byVisitsCount = ([, nameA, countA], [, nameB, countB]) =>
  countB - countA || nameA.localeCompare(nameB);

const Cities = ({ visits: { data: visitsList = [] } = {} }) => {
  if (!visitsList.length) {
    return <WelcomeScreen />;
  }
  const visitsGroupedByLocation = groupBy(visitsList, property('locationId'));
  const visitedLocationsWithCounter = Object.values(
    visitsGroupedByLocation,
  ).map(visits => {
    const uniqTripVisits = uniqBy(visits, property('tripId'));
    return [
      visits[0].locationId,
      visits[0].locationName,
      uniqTripVisits.length,
    ];
  });

  return (
    <div>
      {visitedLocationsWithCounter
        .sort(byVisitsCount)
        .map(([locationId, locationName, visitsCount], locationIndex) => (
          <div key={`id${locationId}`}>
            <span>{`${locationIndex + 1}. `}</span>
            <span>{locationName}</span>
            {visitsCount > 1 && <span>{` x${visitsCount}`}</span>}
          </div>
        ))}
    </div>
  );
};

Cities.propTypes = {
  visits: PropTypes.shape({
    data: PropTypes.arrayOf(PropTypes.shape(visitPropTypes)),
  }),
};

Cities.defaultProps = {
  visits: { data: [] },
};

const mapStateToRequirements = (
  state,
  {
    match: {
      params: { userAlias },
    },
  },
  { userAlias: prevUserAlias, userTripsIds: prevUserTripsIds } = {},
) => {
  const { fallback = {} } = selectProvisionStatus(state, 'cities.trips') || {};
  const { data: userTripsIds = [] } = fallback[0] || {};
  const isUserChanged = prevUserAlias !== userAlias;
  const isUserTripsFetchCompleted =
    (!prevUserTripsIds || !prevUserTripsIds.length) &&
    Boolean(userTripsIds.length);
  return {
    domain: 'citiesPage',
    identity: {
      userAlias,
      userTripsIds,
    },
    request: {
      trips: {
        modelName: 'trips',
        isMissingIf: isUserChanged,
        query: { userAlias, navigation: { isDisabled: true } },
      },
      visits: {
        modelName: 'visits',
        isMissingIf: isUserTripsFetchCompleted,
        query: {
          filter: { trip_id: { comparator: 'in', value: userTripsIds } },
          navigation: { isDisabled: true },
        },
      },
    },
  };
};

export default withProvision(mapStateToRequirements)(Cities);

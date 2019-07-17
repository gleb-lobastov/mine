import React, { useMemo } from 'react';
import groupBy from 'lodash/groupBy';
import uniq from 'lodash/uniq';
import property from 'lodash/property';
import PropTypes from 'prop-types';
import withProvision from 'core/connection/withProvision';
import { selectDict, selectProvisionStatus } from 'core/connection';
import WelcomeScreen from 'travel/components/common/WelcomeScreen';
import countriesPropTypes from 'travel/models/countries/propTypes';
import visitPropTypes from 'travel/models/visits/propTypes';

const byCountriesVisitsCount = (
  {
    countryName: countryNameA = '',
    visitsCount: visitsCountA = 0,
    locations: locationsA = [],
  },
  {
    countryName: countryNameB = '',
    visitsCount: visitsCountB = 0,
    locations: locationsB = [],
  },
) =>
  visitsCountB - visitsCountA ||
  locationsB.length - locationsA.length ||
  countryNameA.localeCompare(countryNameB);

const byLocationsVisitsCount = (
  { locationName: locationNameA = '', visitsCount: visitsCountA = 0 },
  { locationName: locationNameB = '', visitsCount: visitsCountB = 0 },
) => visitsCountB - visitsCountA || locationNameA.localeCompare(locationNameB);

const Countries = ({
  countriesDict,
  visits: { data: visitsList = [] } = {},
}) => {
  if (!visitsList.length) {
    return <WelcomeScreen />;
  }

  /**
  visitsWithCounter structure example:
   
  [{
    countryId: 1,    
    countryName: 'Russia',
    visitsCount: 30,
    locations: [
      { locationId: 1, locationName: 'Moscow', visitsCount: 25 },
      { locationId: 2, locationName: 'Saint-Petersburg', visitsCount: 7 },
    ],
  }];
  */
  const visitsWithCounter = useMemo(
    () =>
      Object.values(groupBy(visitsList, property('countryId')))
        .map(countryVisits => {
          const { countryId } = countryVisits[0];
          const { countryName } = countriesDict[countryId] || {};
          return {
            countryId,
            countryName,
            visitsCount: uniq(countryVisits.map(property('tripId'))).length,
            locations: Object.values(
              groupBy(countryVisits, property('locationId')),
            )
              .map(locationVisits => {
                const { locationId, locationName } = locationVisits[0];
                return {
                  locationId,
                  locationName,
                  visitsCount: uniq(locationVisits.map(property('tripId')))
                    .length,
                };
              })
              .sort(byLocationsVisitsCount),
          };
        })
        .sort(byCountriesVisitsCount),
    [visitsList, countriesDict],
  );

  return (
    <div>
      {visitsWithCounter.map(
        (
          {
            countryId,
            countryName,
            locations,
            visitsCount: countryVisitsCount,
          },
          countryIndex,
        ) => (
          <div key={`id${countryId}`}>
            <h2>
              <span>{`${countryIndex + 1}. `}</span>
              <span>{countryName}</span>
              {countryVisitsCount > 1 && (
                <span>{` x${countryVisitsCount}`}</span>
              )}
            </h2>
            <div>
              {locations.map(
                (
                  {
                    locationId,
                    locationName,
                    visitsCount: locationVisitsCount,
                  },
                  locationIndex,
                ) => (
                  <div key={`id${locationId}`}>
                    <span>{`${locationIndex + 1}. `}</span>
                    <span>{locationName}</span>
                    {locationVisitsCount > 1 && (
                      <span>{` x${locationVisitsCount}`}</span>
                    )}
                  </div>
                ),
              )}
            </div>
          </div>
        ),
      )}
    </div>
  );
};
Countries.propTypes = {
  countriesDict: PropTypes.shape(countriesPropTypes),
  visits: PropTypes.shape({
    data: PropTypes.arrayOf(PropTypes.shape(visitPropTypes)),
  }),
};
Countries.defaultProps = {
  countriesDict: {},
  visits: { data: [] },
};

const mapStateToProps = state => ({
  countriesDict: selectDict(state, 'countries'),
});

const mapStateToRequirements = (
  state,
  {
    countriesDict,
    match: {
      params: { userAlias },
    },
  },
  { userAlias: prevUserAlias, userTripsIds: prevUserTripsIds } = {},
) => {
  const { fallback = {} } =
    selectProvisionStatus(state, 'countries.trips') || {};
  const { data: userTripsIds = [] } = fallback[0] || {};
  const isUserChanged = prevUserAlias !== userAlias;
  const isUserTripsFetchCompleted =
    (!prevUserTripsIds || !prevUserTripsIds.length) &&
    Boolean(userTripsIds.length);
  return {
    domain: 'countriesPage',
    identity: {
      userAlias,
      userTripsIds,
    },
    request: {
      countries: {
        isMissingIf: !countriesDict || !Object.keys(countriesDict).length,
        modelName: 'countries',
        query: { navigation: { isDisabled: true } },
      },
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

export default withProvision(mapStateToRequirements, mapStateToProps)(
  Countries,
);

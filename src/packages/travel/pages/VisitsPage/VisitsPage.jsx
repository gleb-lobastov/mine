import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import groupBy from 'lodash/groupBy';
import uniq from 'lodash/uniq';
import property from 'lodash/property';
import compose from 'lodash/fp/compose';
import { usePaths } from 'modules/packages';
import withTripsData, {
  DATA_CHUNKS,
} from 'travel/components/common/withTripsData/withTripsData';
import { selectDict, selectIsReady } from 'core/connection';
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

const VisitsPage = ({
  countriesDict,
  isVisitsComplete,
  userVisits: { data: visitsList = [] } = {},
}) => {
  const {
    travel: { location: locationPath },
  } = usePaths();

  if (isVisitsComplete && !visitsList.length) {
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
                    <Link
                      to={locationPath.toUrl({
                        strLocationId: String(locationId),
                      })}
                    >
                      {locationName}
                    </Link>
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
VisitsPage.propTypes = {
  countriesDict: PropTypes.shape(countriesPropTypes),
  isVisitsComplete: PropTypes.bool.isRequired,
  visits: PropTypes.shape({
    data: PropTypes.arrayOf(PropTypes.shape(visitPropTypes)),
  }),
};
VisitsPage.defaultProps = {
  countriesDict: {},
  visits: { data: [] },
};

const mapStateToProps = state => ({
  countriesDict: selectDict(state, 'countries'),
  isVisitsComplete: selectIsReady(state, 'visitsPage.visits'),
});

export default compose(
  withTripsData({
    domain: 'visitsPage',
    mapStateToProps,
    requirementsConfig: {
      [DATA_CHUNKS.COMMON.COUNTRIES]: true,
      [DATA_CHUNKS.USER.TRIPS]: true,
      [DATA_CHUNKS.USER.VISITS]: true,
    },
  }),
)(VisitsPage);

import React from 'react';
import { Link } from 'react-router-dom';
import fpGroupBy from 'lodash/fp/groupBy';
import flow from 'lodash/flow';
import fpMapValues from 'lodash/fp/mapValues';
import PropTypes from 'prop-types';
import countriesPropTypes from 'travel/models/countries/propTypes';
import visitPropTypes from 'travel/models/visits/propTypes';
import VisitsByLocation from './VisitsByLocation';

const LocationsByCountries = ({ visitsList, locationPath }) => {
  const groupByLocations = fpGroupBy('locationId');

  const enhanceWithCounters = visitsList => ({
    visitsList,
    locationName: visitsList[0] && visitsList[0].locationName,
  });
  const enhancedVisitsList = flow(
    groupByLocations,
    fpMapValues(enhanceWithCounters),
    Object.entries,
  )(visitsList);
  return (
    <div>
      {enhancedVisitsList.map(
        ([
          strLocationId,
          { locationName, visitsList: visitsListByLocation },
        ]) => (
          <div>
            <div
              style={{
                display: 'inline',
                marginRight: '4px',
                lineHeight: '20px',
              }}
            >
              <Link to={locationPath.toUrl({ strLocationId })}>
                {locationName}
              </Link>
            </div>
            <VisitsByLocation visitsList={visitsListByLocation} />
          </div>
        ),
      )}
    </div>
  );
};
LocationsByCountries.propTypes = {
  countriesDict: PropTypes.shape(countriesPropTypes),
  visits: PropTypes.arrayOf(PropTypes.shape(visitPropTypes)),
};
LocationsByCountries.defaultProps = {
  countriesDict: {},
  visits: [],
};

export default LocationsByCountries;

import React from 'react';
import format from 'date-fns/format';
import ru from 'date-fns/locale/ru';
import fpGroupBy from 'lodash/fp/groupBy';
import flow from 'lodash/flow';
import fpMapValues from 'lodash/fp/mapValues';
import PropTypes from 'prop-types';
import countriesPropTypes from 'travel/models/countries/propTypes';
import visitPropTypes from 'travel/models/visits/propTypes';
import VisitsByLocation from './VisitsByLocation';

const LocationsByCountries = ({ visitsList }) => {
  const groupByLocations = fpGroupBy('locationId');

  const enhanceWithCounters = visitsList => ({
    visitsList,
    locationName: visitsList[0] && visitsList[0].locationName,
  });
  const enhancedVisitsList = flow(
    groupByLocations,
    fpMapValues(enhanceWithCounters),
    Object.values,
  )(visitsList);
  return (
    <div>
      {enhancedVisitsList.map(
        ({ locationName, visitsList: visitsListByLocation }) => (
          <div>
            <div
              style={{
                fontSize: '21px',
                display: 'inline',
                marginRight: '4px',
                lineHeight: '24px',
              }}
            >
              {locationName}
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

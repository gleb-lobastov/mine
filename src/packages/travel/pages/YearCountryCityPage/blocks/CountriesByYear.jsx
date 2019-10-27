import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import fpGroupBy from 'lodash/fp/groupBy';
import flow from 'lodash/flow';
import uniq from 'lodash/uniq';
import fpMapValues from 'lodash/fp/mapValues';
import countriesPropTypes from 'travel/models/countries/propTypes';
import visitPropTypes from 'travel/models/visits/propTypes';
import LocationsByCountries from './LocationsByCountries';
import { uniqByLocations, plural } from '../utils';

const CountriesByYear = ({
  countriesDict,
  visitsList,
  locationPath,
  classes,
}) => {
  const groupByCountries = fpGroupBy('countryId');

  const enhanceWithCounters = visitsList => ({
    visitsList,
    locationsCount: uniqByLocations(visitsList).length,
    countryId: visitsList[0] && visitsList[0].countryId,
  });
  const enhancedVisitsList = flow(
    groupByCountries,
    fpMapValues(enhanceWithCounters),
    Object.values,
  )(visitsList);
  return (
    <div>
      {enhancedVisitsList.map(
        (
          { countryId, visitsList: visitsListByCountry, locationsCount },
          countryIndex,
        ) => {
          const tripsCount = uniq(
            visitsListByCountry.map(({ tripId }) => tripId),
          ).length;
          return (
            <div className={classes.countryContainer}>
              <div
                style={{
                  display: 'inline',
                  marginRight: '4px',
                  fontSize: '24px',
                  fontWeight: 'bold',
                  lineHeight: '30px',
                }}
              >
                {`${countryIndex + 1}. `}
                {countriesDict[countryId] &&
                  countriesDict[countryId].countryName}
                {'. '}
              </div>
              <span>
                {tripsCount > 1 && (
                  <span>
                    {`${tripsCount} `}
                    {plural(tripsCount, {
                      one: 'поездка',
                      few: 'поездки',
                      many: 'поездок',
                    })}
                  </span>
                )}
                {locationsCount > 1 && tripsCount > 1 && ', '}
                {locationsCount > 1 && (
                  <span>
                    {locationsCount}{' '}
                    {plural(locationsCount, {
                      one: 'город',
                      few: 'города',
                      many: 'городов',
                    })}
                  </span>
                )}
              </span>
              <LocationsByCountries
                visitsList={visitsListByCountry}
                locationPath={locationPath}
              />
            </div>
          );
        },
      )}
    </div>
  );
};
CountriesByYear.propTypes = {
  countriesDict: PropTypes.shape(countriesPropTypes),
  visits: PropTypes.arrayOf(PropTypes.shape(visitPropTypes)),
};
CountriesByYear.defaultProps = {
  countriesDict: {},
  visits: [],
};

const styles = {
  countryContainer: {
    marginTop: '16px',
  },
};

export default withStyles(styles)(CountriesByYear);

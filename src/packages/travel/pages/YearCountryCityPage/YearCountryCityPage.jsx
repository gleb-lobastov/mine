import React from 'react';
import memoizeOne from 'memoize-one';
import fpMapValues from 'lodash/fp/mapValues';
import flow from 'lodash/fp/flow';
import fpReverse from 'lodash/fp/reverse';
import PropTypes from 'prop-types';
import { selectDict, selectIsReady } from 'core/connection';
import WelcomeScreen from 'travel/components/common/WelcomeScreen';
import withTravels from 'travel/components/common/withTravels';
import countriesPropTypes from 'travel/models/countries/propTypes';
import visitPropTypes from 'travel/models/visits/propTypes';
import {
  groupByYears,
  enhanceVisitsWithCounters,
  fpEnhanceVisitsWithDates,
  orderByYears,
  plural,
} from './utils';
import CountriesByYear from './blocks/CountriesByYear';

const enhanceVisits = memoizeOne((ridesDict, visitsList) =>
  flow(
    fpEnhanceVisitsWithDates({ ridesDict }),
    groupByYears,
    fpMapValues(enhanceVisitsWithCounters),
    Object.values,
    orderByYears,
    fpReverse,
  )(visitsList),
);

const YearCountryCityPage = ({
  countriesDict,
  ridesDict,
  isVisitsComplete,
  isRidesComplete,
  visits: { data: visitsList = [] } = {},
}) => {
  if (isVisitsComplete && isRidesComplete && !visitsList.length) {
    return <WelcomeScreen />;
  }

  const visitsByYears = enhanceVisits(ridesDict, visitsList);
  return (
    <div>
      {visitsByYears.map(
        ({
          year,
          visitsList: visitsListByYear,
          countriesCount,
          locationsCount,
        }) => (
          <div key={`y${year}`}>
            <h1>
              {year || 'Год не указан'}, {countriesCount}{' '}
              {plural(countriesCount, {
                one: 'страна',
                few: 'страны',
                many: 'стран',
              })}{' '}
              и {locationsCount}{' '}
              {plural(locationsCount, {
                one: 'город',
                few: 'города',
                many: 'городов',
              })}
            </h1>
            <CountriesByYear
              visitsList={visitsListByYear}
              countriesDict={countriesDict}
            />
          </div>
        ),
      )}
    </div>
  );
};
YearCountryCityPage.propTypes = {
  countriesDict: PropTypes.shape(countriesPropTypes),
  isVisitsComplete: PropTypes.bool.isRequired,
  visits: PropTypes.shape({
    data: PropTypes.arrayOf(PropTypes.shape(visitPropTypes)),
  }),
};
YearCountryCityPage.defaultProps = {
  countriesDict: {},
  visits: { data: [] },
};

const mapStateToProps = state => ({
  countriesDict: selectDict(state, 'countries'),
  ridesDict: selectDict(state, 'rides'),
  isVisitsComplete: selectIsReady(state, 'yearCountryCity.visits'),
  isRidesComplete: selectIsReady(state, 'yearCountryCity.rides'),
});

export default withTravels({ domain: 'yearCountryCity', mapStateToProps })(
  YearCountryCityPage,
);

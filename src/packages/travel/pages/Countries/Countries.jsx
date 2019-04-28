import React from 'react';
import groupBy from 'lodash/groupBy';
import PropTypes from 'prop-types';
import withProvision from 'core/connection/withProvision';

const byCitiesCount = ([, citiesA = []], [, citiesB = []]) =>
  citiesB.length - citiesA.length;
const alphabetically = ({ locationName: a }, { locationName: b }) =>
  a.localeCompare(b);

const Countries = ({ locations: { data: locationsList = [] } = {} }) => (
  <div>
    {Object.entries(groupBy(locationsList, 'countryName'))
      .sort(byCitiesCount)
      .map(([countryName, cities], countryIndex) => (
        <div key={countryName}>
          <h1>{`${countryIndex + 1}. ${countryName}`}</h1>
          {cities
            .sort(alphabetically)
            .map(({ locationName }, locationIndex) => (
              <div key={locationName}>{`${locationIndex +
                1}. ${locationName}`}</div>
            ))}
        </div>
      ))}
  </div>
);
Countries.propTypes = {
  locations: PropTypes.shape({ data: PropTypes.arrayOf(PropTypes.string) }),
};
Countries.defaultProps = {
  locations: { data: [] },
};

export default withProvision(() => ({
  require: {
    locations: {
      modelName: 'locations',
    },
  },
  meta: {
    domain: 'countries',
  },
}))(Countries);

import React from 'react';
import groupBy from 'lodash/groupBy';
import PropTypes from 'prop-types';
import withProvision from 'core/connection/withProvision';

const byCitiesCount = ([, citiesA = []], [, citiesB = []]) =>
  citiesB.length - citiesA.length;
const alphabetically = ({ locationName: a }, { locationName: b }) =>
  a.localeCompare(b);

const Countries = ({ provision: { locations = [] } }) => (
  <div>
    {Object.entries(groupBy(locations, 'countryName'))
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
  provision: PropTypes.shape({
    locations: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};

export default withProvision(() => ({
  require: 'locations',
  meta: {
    domain: 'countries',
  },
}))(Countries);

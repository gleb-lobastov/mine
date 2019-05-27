import React from 'react';
import PropTypes from 'prop-types';
import withProvision from 'core/connection/withProvision';

const alphabetically = ({ locationName: a }, { locationName: b }) =>
  a.localeCompare(b);

const Cities = ({ locations: { data: locationsList = [] } }) => (
  <div>
    {locationsList
      .sort(alphabetically)
      .map(({ locationName }, locationIndex) => (
        <div key={locationName}>{`${locationIndex + 1}. ${locationName}`}</div>
      ))}
  </div>
);
Cities.propTypes = {
  provision: PropTypes.shape({
    locations: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};

export default withProvision(() => ({
  require: {
    locations: {
      modelName: 'locations',
    },
  },
  meta: {
    domain: 'cities',
  },
}))(Cities);
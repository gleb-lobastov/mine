import React from 'react';
import PropTypes from 'prop-types';
import withProvision from 'core/connection/withProvision';
import locationPropTypes from 'travel/models/locations/propTypes';

const alphabetically = ({ locationName: a }, { locationName: b }) =>
  a.localeCompare(b);

const Cities = ({ locations: { data: locationsList = [] } = {} }) => (
  <div>
    {locationsList
      .sort(alphabetically)
      .map(({ locationName }, locationIndex) => (
        <div key={locationName}>{`${locationIndex + 1}. ${locationName}`}</div>
      ))}
  </div>
);

Cities.propTypes = {
  locations: PropTypes.shape({ data: PropTypes.arrayOf(locationPropTypes) }),
};

Cities.defaultProps = {
  locations: { data: [] },
};

export default withProvision(() => ({
  require: {
    locations: {
      modelName: 'locations',
      query: { navigation: { isDisabled: true } },
    },
  },
  meta: {
    domain: 'cities',
  },
}))(Cities);

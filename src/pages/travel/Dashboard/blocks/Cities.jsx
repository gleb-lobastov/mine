import React from 'react';
import PropTypes from 'prop-types';

const alphabetically = ({ locationName: a }, { locationName: b }) =>
  a.localeCompare(b);

const Cities = ({ contents: { locations = [] } }) => (
  <div>
    {locations.sort(alphabetically).map(({ locationName }, locationIndex) => (
      <div key={locationName}>{`${locationIndex + 1}. ${locationName}`}</div>
    ))}
  </div>
);
Cities.propTypes = {
  contents: PropTypes.shape({
    locations: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};

export default Cities;

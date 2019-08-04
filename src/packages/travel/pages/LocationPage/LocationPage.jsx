import React from 'react';
import PropTypes from 'prop-types';
import { toNumber } from 'modules/utilities/types/numbers';
import LocationCard from 'travel/components/models/locations/LocationCard';

const LocationPage = ({
  match: {
    params: { strLocationId },
  },
}) => <LocationCard locationId={toNumber(strLocationId)} />;

LocationPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({ strLocationId: PropTypes.string }).isRequired,
  }).isRequired,
};

export default LocationPage;

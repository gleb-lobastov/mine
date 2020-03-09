/* globals __GOOGLE_MAP_API_KEY__ */
import React from 'react';
import PropTypes from 'prop-types';
import GoogleMapReact from 'google-map-react';
import { makeStyles } from '@material-ui/core/styles';
import locationPropTypes from 'travel/models/locations/propTypes';
import useMarkers from './useMarkers';

const useStyles = makeStyles({
  googleMapContainer: {
    margin: '12px 0',
    width: '800px',
    maxWidth: '100%',
    height: '400px',
    maxHeight: '100%',
  },
});

export default function LocationsMap({ locationsDict, locationsIds }) {
  const classes = useStyles();

  const { handleGoogleApiLoaded } = useMarkers(
    locationsIds.map(
      locationIdToShowMarker => locationsDict[locationIdToShowMarker],
    ),
  );

  return (
    <div className={classes.googleMapContainer}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: __GOOGLE_MAP_API_KEY__ }}
        center={{ lat: 0, lng: 0 }}
        zoom={11}
        onGoogleApiLoaded={handleGoogleApiLoaded}
      />
    </div>
  );
}

LocationsMap.propTypes = {
  locationsDict: PropTypes.objectOf(PropTypes.shape(locationPropTypes))
    .isRequired,
  locationsIds: PropTypes.arrayOf(PropTypes.number).isRequired,
};

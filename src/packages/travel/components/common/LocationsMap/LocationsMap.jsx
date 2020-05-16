/* globals __GOOGLE_MAP_API_KEY__ */
import React from 'react';
import PropTypes from 'prop-types';
import cls from 'classnames';
import GoogleMapReact from 'google-map-react';
import { makeStyles } from '@material-ui/core/styles';
import locationPropTypes from 'travel/models/locations/propTypes';
import useMarkers from './useMarkers';

const useStyles = makeStyles({
  googleMapContainer: {
    margin: '12px 0',
    maxWidth: '100%',
    flexGrow: 1,
    minHeight: ({ minHeight }) => minHeight,
  },
});

export default function LocationsMap({
  className,
  locationsDict,
  locationsIds,
  minHeight,
}) {
  const classes = useStyles({ minHeight });

  const { handleGoogleApiLoaded } = useMarkers(
    locationsIds.map(
      locationIdToShowMarker => locationsDict[locationIdToShowMarker],
    ),
  );

  return (
    <div className={cls(className, classes.googleMapContainer)}>
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
  className: PropTypes.string,
  locationsDict: PropTypes.objectOf(PropTypes.shape(locationPropTypes))
    .isRequired,
  locationsIds: PropTypes.arrayOf(PropTypes.number).isRequired,
  minHeight: PropTypes.number,
};

LocationsMap.defaultProps = {
  className: undefined,
  minHeight: '400px',
};

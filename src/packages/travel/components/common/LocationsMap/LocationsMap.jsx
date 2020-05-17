/* globals __GOOGLE_MAP_API_KEY__ */
import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import cls from 'classnames';
import GoogleMapReact from 'google-map-react';
import { makeStyles } from '@material-ui/core/styles';
import locationPropTypes from 'travel/models/locations/propTypes';
import visitsPropTypes from 'travel/models/visits/propTypes';
import adaptMarkerData from './utils/adaptMarkerData';
import makeScaleUtils from './utils/makeScaleUtils';
import renderTitle from './utils/renderTitle';
import resolveMarkerUrl from './utils/resolveMarkerUrl';
import { MARKERS_SCALES } from './consts';
import useMarkers from './useMarkers';

export useMarkersScaleSidebar from './useMarkersScaleSidebar';

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
  visitsDict,
  locationsRating,
  locationsIds,
  minHeight,
  scaleBy,
}) {
  const classes = useStyles({ minHeight });
  const markersData = useMemo(
    () => {
      const adaptedMarkersData = adaptMarkerData({
        locationsDict,
        visitsDict,
        locationsRating,
        locationsIds,
      });
      const { resolveStep, resolveOptions } = makeScaleUtils(scaleBy);
      const options = resolveOptions && resolveOptions(adaptedMarkersData);
      return adaptedMarkersData.map(markerData => {
        const step = resolveStep(markerData, options);
        return {
          ...markerData,
          zIndex: [
            MARKERS_SCALES.BY_RATING,
            MARKERS_SCALES.BY_FIRST_VISIT,
          ].includes(scaleBy)
            ? 10 - step
            : step,
          iconUrl: resolveMarkerUrl(step, scaleBy),
          title: renderTitle(markerData),
        };
      });
    },
    [locationsDict, visitsDict, locationsRating, locationsIds, scaleBy],
  );
  const { handleGoogleApiLoaded } = useMarkers(markersData);

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
  visitsDict: PropTypes.objectOf(PropTypes.shape(visitsPropTypes)).isRequired,
  locationsDict: PropTypes.objectOf(PropTypes.shape(locationPropTypes))
    .isRequired,
  locationsIds: PropTypes.arrayOf(PropTypes.number).isRequired,
  locationsRating: PropTypes.objectOf(PropTypes.number).isRequired,
  minHeight: PropTypes.number,
  scaleBy: PropTypes.oneOf(Object.values(MARKERS_SCALES)).isRequired,
};

LocationsMap.defaultProps = {
  className: undefined,
  minHeight: '400px',
};

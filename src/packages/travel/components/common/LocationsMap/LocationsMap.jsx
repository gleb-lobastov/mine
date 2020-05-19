/* globals __GOOGLE_MAP_API_KEY__ */
import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import cls from 'classnames';
import GoogleMapReact from 'google-map-react';
import { makeStyles } from '@material-ui/core/styles';
import locationPropTypes from 'travel/models/locations/propTypes';
import visitsPropTypes from 'travel/models/visits/propTypes';
import adaptMarkerData from './utils/adaptMarkerData';
import filterMarkerData from './utils/filterMarkerData';
import makeScaleUtils from './utils/makeScaleUtils';
import renderTitle from './utils/renderTitle';
import resolveMarkerUrl from './utils/resolveMarkerUrl';
import { MARKERS_SCALES, MARKERS_RATING_LEVELS } from './consts';
import useMarkers from './useMarkers';

export { MARKERS_SCALES, MARKERS_RATING_LEVELS };
export useMarkersScaleSidebar from './useMarkersScaleSidebar';

const useStyles = makeStyles({
  googleMapContainer: {
    margin: '12px 0',
    maxWidth: '100%',
    flexGrow: 1,
    minHeight: ({ minHeight }) => minHeight,
    position: 'relative',
  },
  googleMapPosition: {
    position: 'absolute',
    top: '0',
    left: '0',
    right: '0',
    bottom: '0',
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
  ratingLevel,
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
      const actualMarkersData = filterMarkerData(adaptedMarkersData, {
        ratingLevel,
      });
      const { resolveStep, resolveOptions } = makeScaleUtils(scaleBy);
      const options = resolveOptions && resolveOptions(actualMarkersData);
      return actualMarkersData.map(markerData => {
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
    [
      locationsDict,
      visitsDict,
      locationsRating,
      locationsIds,
      scaleBy,
      ratingLevel,
    ],
  );
  const { handleGoogleApiLoaded } = useMarkers(markersData);

  return (
    <div className={cls(className, classes.googleMapContainer)}>
      <div className={classes.googleMapPosition}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: __GOOGLE_MAP_API_KEY__ }}
          center={{ lat: 0, lng: 0 }}
          zoom={11}
          onGoogleApiLoaded={handleGoogleApiLoaded}
        />
      </div>
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
  ratingLevel: PropTypes.oneOf(Object.values(MARKERS_RATING_LEVELS)).isRequired,
};

LocationsMap.defaultProps = {
  className: undefined,
  minHeight: '400px',
};

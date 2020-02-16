/* globals __GOOGLE_MAP_API_KEY__ */
import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import GoogleMapReact from 'google-map-react';
import { makeStyles } from '@material-ui/core/styles';
import { useAuthContext } from 'core/context/AuthContext';
import LocationRating from './blocks/LocationRating';
import useMarkers from './useMarkers';
import useUserLocations from './useUserLocations';

const useStyles = makeStyles({
  container: { fontSize: '16px', lineHeight: '1.5' },
  visitContainer: { margin: '20px 0' },
  location: { fontWeight: 'bold', fontSize: '21px' },
  googleMapContainer: {
    margin: '12px 0',
    width: '800px',
    maxWidth: '100%',
    height: '400px',
    maxHeight: '100%',
  },
});

const domain = 'travel.LocationsPage';
export default function LocationsPage({
  match: {
    params: { userAlias, strLocationId },
  },
}) {
  const classes = useStyles();

  const {
    isAuthenticated,
    userAlias: authenticatedUserAlias,
  } = useAuthContext();

  const {
    isError,
    isPending,
    locationsDict,
    locationsIds,
    locationsRating,
    submitLocationRating,
  } = useUserLocations({ domain, userAlias });

  const locationId = parseInt(strLocationId, 10);
  const actualLocationsIds = locationId ? [locationId] : locationsIds;

  const handleSubmitLocationRating = useCallback(
    (event, locationIdToSubmit, value) => {
      submitLocationRating({
        query: { rating: value, id: String(locationIdToSubmit) },
        condition: Boolean(locationIdToSubmit),
      });
    },
  );

  const { handleGoogleApiLoaded } = useMarkers(
    actualLocationsIds.map(
      locationIdToShowMarker => locationsDict[locationIdToShowMarker],
    ),
  );

  if (isError) {
    return <div>...Error</div>;
  }
  if (isPending) {
    return <div>...Loading</div>;
  }
  if (locationId && !locationsIds.includes(locationId)) {
    return (
      <div>{`Путешественик ${userAlias} еще не посетил данную локацию`}</div>
    );
  }

  const isEditable = isAuthenticated && authenticatedUserAlias === userAlias;
  return (
    <div className={classes.container}>
      <div className={classes.googleMapContainer}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: __GOOGLE_MAP_API_KEY__ }}
          center={{ lat: 0, lng: 0 }}
          zoom={11}
          onGoogleApiLoaded={handleGoogleApiLoaded}
        />
      </div>
      {actualLocationsIds.map(locationsIdToRender => {
        const location = locationsDict[locationsIdToRender];
        if (!location) {
          return null;
        }
        const { locationName } = location;
        return (
          <React.Fragment key={locationsIdToRender}>
            <h1 className={classes.location}>{locationName}</h1>
            <LocationRating
              locationId={locationsIdToRender}
              locationRating={locationsRating[locationsIdToRender]}
              isEditable={isEditable}
              onSubmitLocationRating={handleSubmitLocationRating}
            />
          </React.Fragment>
        );
      })}
    </div>
  );
}

LocationsPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      userAlias: PropTypes.string.isRequired,
      strLocationId: PropTypes.string,
    }).isRequired,
  }).isRequired,
};

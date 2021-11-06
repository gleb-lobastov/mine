import React, { useCallback, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import MUILink from '@material-ui/core/Link';
import { useAuthContext } from 'core/context/AuthContext';
import useVisitsUrls from 'travel/utils/useVisitsUrls';
import LocationsMap, { MARKERS_SCALES } from 'travel/components/LocationsMap';
import VisitsArranger, {
  PLAIN_GROUPS,
  PLAIN_SORTING,
  PLAIN_FILTERING,
} from 'travel/components/VisitsArranger';
import LocationRating from './blocks/LocationRating';
import useLocationWithTripStats from './useLocationWithTripStats';

const useStyles = makeStyles({
  container: { fontSize: '16px', lineHeight: '1.5' },
  visitContainer: { margin: '20px 0' },
  mapVisibilityToggle: { marginLeft: '8px', cursor: 'pointer' },
  googleMapContainer: {
    margin: '12px 0',
    width: '800px',
    maxWidth: '100%',
    height: '400px',
    maxHeight: '100%',
  },
});

const domain = 'travel.LocationPage';
export default function LocationPage({
  match: {
    params: { userAlias, strLocationId },
  },
}) {
  const classes = useStyles();

  const [mapVisible, setMapVisible] = useState(false);
  const {
    isAuthenticated,
    userAlias: authenticatedUserAlias,
  } = useAuthContext();

  const urls = useVisitsUrls({ editable: false, userAlias });

  // const editable = userAlias === authenticatedUserAlias;
  const isObscure = userAlias !== authenticatedUserAlias;

  const locationId = parseInt(strLocationId, 10);

  const {
    location,
    provision: { isError, isPending, isReady },
    isVisited,
    visitsList,
    tripsProvision,
    submitLocationRating,
    locationRating,
  } = useLocationWithTripStats({ domain, userAlias, locationId });

  const handleSubmitLocationRating = useCallback(
    (event, locationIdToSubmit, value) => {
      submitLocationRating({
        query: { rating: value, id: String(locationIdToSubmit) },
        condition: Boolean(locationIdToSubmit),
      });
    },
  );

  if (isError) {
    return <div>...Error</div>;
  }
  if (isPending || !isReady) {
    return <div>...Loading</div>;
  }

  if (!location) {
    return null;
  }

  const isEditable = isAuthenticated && authenticatedUserAlias === userAlias;
  return (
    <div className={classes.container}>
      <div>
        <Typography variant="h2" component="span">
          {location.locationName}
        </Typography>
        <MUILink
          variant="body2"
          onClick={() => setMapVisible(prevMapVisible => !prevMapVisible)}
          className={classes.mapVisibilityToggle}
        >
          {mapVisible ? 'скрыть карту' : 'на карте'}
        </MUILink>
        <LocationRating
          locationId={locationId}
          locationRating={location.rating}
          isEditable={isEditable}
          onSubmitLocationRating={handleSubmitLocationRating}
        />
      </div>
      {mapVisible && (
        <LocationsMap
          className={classes.mapContainer}
          locationsDict={tripsProvision.locationsDict}
          visitsDict={tripsProvision.visitsDict}
          locationsRating={tripsProvision.locationsRating}
          locationsIds={[locationId]}
          minHeight={300}
          scaleBy={isVisited ? MARKERS_SCALES.BY_RATING : null}
          ratingLevel={isVisited ? locationRating : null}
        />
      )}
      {isVisited && (
        <VisitsArranger
          visitsList={visitsList}
          provision={tripsProvision}
          groupsOrder={[PLAIN_GROUPS.LOCATIONS, PLAIN_GROUPS.YEARS]}
          photosSectionLevel={1}
          sortingOrder={[PLAIN_SORTING.LAST_VISIT]}
          filteringOption={PLAIN_FILTERING.ANY}
          isObscure={isObscure}
          urls={urls}
          config={{ LocationVisitsGroup: { hyperlinks: { location: false } } }}
        />
      )}
    </div>
  );
}

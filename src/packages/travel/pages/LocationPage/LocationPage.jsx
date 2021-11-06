import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { useAuthContext } from 'core/context/AuthContext';
import LocationsMap, {
  MARKERS_SCALES,
} from 'travel/components/common/LocationsMap';
import VisitsArranger from 'travel/pages/VisitsPage/components/VisitsArranger';
import useVisitsUrls from 'travel/pages/VisitsPage/useVisitsUrls';
import { GROUP_VISITS_BY } from 'travel/pages/VisitsPage/components/VisitsArranger/arrangement/groupping/consts';
import { SORT_VISITS_BY } from 'travel/pages/VisitsPage/components/VisitsArranger/arrangement/sorting/consts';
import { FILTER_VISITS_BY } from 'travel/pages/VisitsPage/components/VisitsArranger/arrangement/filtering/consts';
import LocationRating from './blocks/LocationRating';
import useLocationWithTripStats from './useLocationWithTripStats';
import MUILink from '@material-ui/core/Link';
import { Typography } from '@material-ui/core';

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

const domain = 'travel.LocationsPage';
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
        {!mapVisible && (
          <MUILink
            variant="body2"
            onClick={() => setMapVisible(true)}
            className={classes.mapVisibilityToggle}
          >
            на карте
          </MUILink>
        )}
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
          groupBy={GROUP_VISITS_BY.YEARS}
          sortBy={SORT_VISITS_BY.LAST_VISIT_ALPHABET}
          filterBy={FILTER_VISITS_BY.ANY}
          isObscure={isObscure}
          urls={urls}
        />
      )}
    </div>
  );
}

LocationPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      userAlias: PropTypes.string.isRequired,
      strLocationId: PropTypes.string,
    }).isRequired,
  }).isRequired,
};

import React, { useCallback } from 'react';
import Typography from '@material-ui/core/Typography';
import { useAuthContext } from 'core/context/AuthContext';
import useVisitsUrls from 'travel/utils/useVisitsUrls';
import VisitsArranger, {
  PLAIN_GROUPS,
  PLAIN_SORTING,
  PLAIN_FILTERING,
} from 'travel/components/VisitsArranger';
import LocationRating from './blocks/LocationRating';
import useLocationWithTripStats from './useLocationWithTripStats';

const domain = 'travel.LocationPage';
export default function LocationPage({
  match: {
    params: { userAlias, strLocationId },
  },
}) {
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

  if (!isVisited) {
    return (
      <Typography variant="h2" component="span">
        {location.locationName}
      </Typography>
    );
  }
  return (
    <VisitsArranger
      visitsList={visitsList}
      provision={tripsProvision}
      groupsOrder={[PLAIN_GROUPS.LOCATIONS, PLAIN_GROUPS.YEARS]}
      photosSectionLevel={1}
      sortingOrder={[PLAIN_SORTING.LAST_VISIT]}
      filteringOption={PLAIN_FILTERING.ANY}
      isObscure={isObscure}
      urls={urls}
      config={{
        LocationVisitsGroup: {
          hyperlinks: { location: false },
        },
        StatsPanel: {
          appearance: { CountriesStats: false },
        },
      }}
    >
      {({ level, index }) =>
        level === 0 &&
        index === 0 && (
          <LocationRating
            locationId={locationId}
            locationRating={location.rating}
            isEditable={isEditable}
            onSubmitLocationRating={handleSubmitLocationRating}
          />
        )
      }
    </VisitsArranger>
  );
}

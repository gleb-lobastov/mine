import React, { useCallback, useState } from 'react';
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
import MUILink from '@material-ui/core/Link';

const domain = 'travel.LocationPage';
export default function LocationPage({
  match: {
    params: { userAlias, strLocationId, section },
  },
}) {
  const [alsoGroupByYears, setAlsoGroupByYears] = useState(false);

  const {
    isAuthenticated,
    userAlias: authenticatedUserAlias,
  } = useAuthContext();

  const editable = userAlias === authenticatedUserAlias;
  const isObscure = userAlias !== authenticatedUserAlias;

  const urls = useVisitsUrls({ editable, userAlias, section });

  const locationId = parseInt(strLocationId, 10);

  const {
    location,
    provision: { isError, isPending, isReady },
    isVisited,
    visitsList,
    tripsStatsProvision,
    tripsStatsProvision: { userProvision },
    locationRating,
    submitLocationRating,
  } = useLocationWithTripStats({ domain, userAlias, locationId });

  const handleSubmitLocationRating = useCallback(
    (event, locationIdToSubmit, value) => {
      submitLocationRating({
        query: { rating: value, id: String(locationIdToSubmit) },
        condition: Boolean(locationIdToSubmit),
      }).finally(userProvision.invalidate); // todo: still need to imporeve invalidation ux
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
      provision={tripsStatsProvision}
      groupsOrder={[
        PLAIN_GROUPS.LOCATIONS,
        alsoGroupByYears && PLAIN_GROUPS.YEARS,
        PLAIN_GROUPS.JUST_VISITS,
      ].filter(Boolean)}
      photosSectionLevel={1}
      mapSectionLevel={0}
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
          <>
            <MUILink
              variant="body2"
              onClick={() =>
                setAlsoGroupByYears(
                  prevAlsoGroupByYears => !prevAlsoGroupByYears,
                )
              }
            >
              {alsoGroupByYears
                ? 'Убрать группировку по годам'
                : 'Сгруппировать по годам'}
            </MUILink>
            <LocationRating
              locationId={locationId}
              locationRating={locationRating}
              isEditable={isEditable}
              onSubmitLocationRating={handleSubmitLocationRating}
            />
          </>
        )
      }
    </VisitsArranger>
  );
}

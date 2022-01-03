import React, { useState } from 'react';
import MUILink from '@material-ui/core/Link';
import { useAuthContext } from 'core/context/AuthContext';
import {
  useTripsStats,
} from 'travel/dataSource';
import VisitsArranger, {
  PLAIN_FILTERING,
  PLAIN_GROUPS,
  PLAIN_SORTING,
} from 'travel/components/VisitsArranger';
import useVisitsUrls from 'travel/utils/useVisitsUrls';

const domain = 'travel.VisitPage';
export default function TripPage({
  match: {
    params: { userAlias, strTripId },
  },
}) {
  const [alsoGroupByCountries, setAlsoGroupByCountries] = useState(false);

  const {
    isAuthenticated,
    userAlias: authenticatedUserAlias,
  } = useAuthContext();

  const tripId = parseInt(strTripId, 10);
  const provision = useTripsStats({
    domain,
    userAlias,
    tripsIds: tripId ? [tripId] : [],
  });
  const {
    visitsIds: tripVisitsIds,
    isReady,
    visitsDict,
    isError,
    isPending,
  } = provision;

  const editable = isAuthenticated && authenticatedUserAlias === userAlias;
  const urls = useVisitsUrls({ editable, userAlias, section: 'trips' });

  if (isError) {
    return <div>...Error</div>;
  }
  if (isPending || !isReady) {
    return <div>...Loading</div>;
  }

  return (
    <VisitsArranger
      visitsList={tripVisitsIds.map(tripVisitsId => visitsDict[tripVisitsId])}
      provision={provision}
      groupsOrder={[
        PLAIN_GROUPS.TRIPS,
        alsoGroupByCountries && PLAIN_GROUPS.COUNTRIES,
        PLAIN_GROUPS.JUST_VISITS,
      ].filter(Boolean)}
      photosSectionLevel={0}
      mapSectionLevel={0}
      sortingOrder={[PLAIN_SORTING.LAST_VISIT]}
      filteringOption={PLAIN_FILTERING.ANY}
      isObscure={!editable}
      urls={urls}
      config={{ YearVisitsGroup: { hyperlinks: { year: false } } }}
    >
      {({ level, index }) =>
        level === 0 &&
        index === 0 && (
          <>
            <MUILink
              variant="body2"
              onClick={() =>
                setAlsoGroupByCountries(
                  prevAlsoGroupByCountries => !prevAlsoGroupByCountries,
                )
              }
            >
              {alsoGroupByCountries
                ? 'Убрать группировку по странам'
                : 'Сгруппировать по странам'}
            </MUILink>
          </>
        )
      }
    </VisitsArranger>
  );
}

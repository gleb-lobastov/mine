import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import MUILink from '@material-ui/core/Link';
import { useAuthContext } from 'core/context/AuthContext';
import useVisitsUrls from 'travel/utils/useVisitsUrls';
import VisitsArranger, {
  PLAIN_GROUPS,
  PLAIN_SORTING,
  PLAIN_FILTERING,
} from 'travel/components/VisitsArranger';
import useYearWithTripStats from './useYearWithTripStats';

const domain = 'travel.LocationPage';
export default function YearPage({
  match: {
    params: { userAlias, strYear, section },
  },
}) {
  const [alsoGroupByCountries, setAlsoGroupByCountries] = useState(false);

  const { userAlias: authenticatedUserAlias } = useAuthContext();

  const editable = userAlias === authenticatedUserAlias;
  const isObscure = userAlias !== authenticatedUserAlias;

  const urls = useVisitsUrls({ editable, userAlias, section });

  const year = parseInt(strYear, 10);

  const {
    provision,
    provision: { isError, isPending, isReady },
    visitsList,
  } = useYearWithTripStats({ domain, userAlias, year });

  if (isError) {
    return <div>...Error</div>;
  }
  if (isPending || !isReady) {
    return <div>...Loading</div>;
  }

  if (!visitsList.length) {
    return (
      <Typography variant="h2" component="span">
        {year}
      </Typography>
    );
  }
  return (
    <VisitsArranger
      visitsList={visitsList}
      provision={provision}
      groupsOrder={[
        PLAIN_GROUPS.YEARS,
        alsoGroupByCountries && PLAIN_GROUPS.COUNTRIES,
        PLAIN_GROUPS.JUST_VISITS,
      ].filter(Boolean)}
      photosSectionLevel={1}
      mapSectionLevel={0}
      sortingOrder={[PLAIN_SORTING.LAST_VISIT]}
      filteringOption={PLAIN_FILTERING.ANY}
      isObscure={isObscure}
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

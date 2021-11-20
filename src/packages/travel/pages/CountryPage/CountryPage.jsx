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
import useCountryWithTripStats from './useCountryWithTripStats';

export default function CountryPage({
  match: {
    params: { userAlias, strCountryId, section },
  },
}) {
  const [alsoGroupByYears, setAlsoGroupByYears] = useState(false);
  const { userAlias: authenticatedUserAlias } = useAuthContext();

  const urls = useVisitsUrls({ editable: false, userAlias, section });

  // const editable = userAlias === authenticatedUserAlias;
  const isObscure = userAlias !== authenticatedUserAlias;

  const countryId = parseInt(strCountryId, 10);

  const {
    country,
    provision,
    provision: { isError, isPending, isReady },
    isVisited,
    visitsList,
  } = useCountryWithTripStats({ userAlias, countryId });

  if (isError) {
    return <div>...Error</div>;
  }
  if (isPending || !isReady) {
    return <div>...Loading</div>;
  }

  if (!country) {
    return null;
  }

  if (!isVisited) {
    return (
      <Typography variant="h2" component="span">
        {country.countryName}
      </Typography>
    );
  }

  return (
    <VisitsArranger
      visitsList={visitsList}
      provision={provision}
      groupsOrder={[
        PLAIN_GROUPS.COUNTRIES,
        alsoGroupByYears && PLAIN_GROUPS.YEARS,
        PLAIN_GROUPS.LOCATIONS,
      ].filter(Boolean)}
      sortingOrder={[PLAIN_SORTING.LAST_VISIT]}
      filteringOption={PLAIN_FILTERING.ANY}
      isObscure={isObscure}
      urls={urls}
      config={{ CountryVisitsGroup: { hyperlinks: { country: false } } }}
    >
      {({ level, index }) =>
        level === 0 &&
        index === 0 && (
          <MUILink
            variant="body2"
            onClick={() =>
              setAlsoGroupByYears(prevAlsoGroupByYears => !prevAlsoGroupByYears)
            }
          >
            {alsoGroupByYears
              ? 'Убрать группировку по годам'
              : 'Сгруппировать по годам'}
          </MUILink>
        )
      }
    </VisitsArranger>
  );
}

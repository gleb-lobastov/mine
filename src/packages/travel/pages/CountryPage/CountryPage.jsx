import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { useAuthContext } from 'core/context/AuthContext';
import useVisitsUrls from 'travel/utils/useVisitsUrls';
import VisitsArranger, {
  PLAIN_GROUPS,
  PLAIN_SORTING,
  PLAIN_FILTERING,
} from 'travel/components/VisitsArranger';
import useCountryWithTripStats from './useCountryWithTripStats';

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

export default function CountryPage({
  match: {
    params: { userAlias, strCountryId },
  },
}) {
  const classes = useStyles();

  const {
    isAuthenticated,
    userAlias: authenticatedUserAlias,
  } = useAuthContext();

  const urls = useVisitsUrls({ editable: false, userAlias });

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

  return (
    <div className={classes.container}>
      <Typography variant="h2" component="span">
        {country.countryName}
      </Typography>
      {isVisited && (
        <VisitsArranger
          visitsList={visitsList}
          provision={provision}
          groupsOrder={[
            PLAIN_GROUPS.COUNTRIES,
            PLAIN_GROUPS.YEARS,
            PLAIN_GROUPS.LOCATIONS,
          ]}
          sortingOrder={[PLAIN_SORTING.LAST_VISIT]}
          filteringOption={PLAIN_FILTERING.ANY}
          isObscure={isObscure}
          urls={urls}
          config={{ CountryVisitsGroup: { hyperlinks: { country: false } } }}
        />
      )}
    </div>
  );
}

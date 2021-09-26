import React, { useRef } from 'react';
import { usePaths } from 'modules/packages';
import { useTripsStats } from 'travel/dataSource';
import { useQueryFilter } from 'core/context/QueryFilterContext';
import { useAuthContext } from 'core/context/AuthContext';
import useVisitsPageStyles from './useVisitsPageStyles';
import useVisitsGroupingSidebar from './useVisitsGroupingSidebar';
import switchFilteringFn from './switchFilteringFn';
import renderTitle from './blocks/renderTitle';
import calcCounters from './calcCounters';
import VisitsGroup from 'travel/pages/RefactoredVisitsPage/components/VisitsGroup';

export default function VisitsPage({
  match: {
    params: { userAlias, section },
  },
}) {
  const { userAlias: authenticatedUserAlias } = useAuthContext();
  const hasEditRights = userAlias === authenticatedUserAlias;
  const isObscure = userAlias !== authenticatedUserAlias;

  const classes = useVisitsPageStyles();
  const { queryFilter, setQueryFilter } = useQueryFilter();
  const { groupBy, sortBy, filterBy } = useVisitsGroupingSidebar(
    setQueryFilter,
    queryFilter,
    section,
  );

  const provision = useTripsStats({ userAlias });
  const { isPending, isError } = provision;

  const { travel: travelPaths } = usePaths();
  const {
    locations: locationsPath,
    tripCreate: tripCreatePath,
    visitEdit: visitEditPath,
  } = travelPaths;

  if (isError) {
    return <div>...Error</div>;
  }
  if (isPending) {
    return <div>...Loading</div>;
  }

  const { visitsIds, visitsDict } = provision;
  const unsortedVisitsList = visitsIds
    .map(visitId => visitsDict[visitId])
    .filter(switchFilteringFn(provision, filterBy));

  const { updatesCounter } = provision;
  const counters = calcCounters(unsortedVisitsList, updatesCounter);

  const titleNode = renderTitle({
    locationsUrl: locationsPath.toUrl({ userAlias }),
    createTripUrl: tripCreatePath.toUrl({ userAlias }),
    locationsCount: Object.keys(counters?.locations || {}).length,
    countriesCount: Object.keys(counters?.countries || {}).length,
    groupBy,
  });

  return (
    <>
      {titleNode}
      <VisitsGroup
        visitsList={unsortedVisitsList}
        provision={provision}
        groupBy={groupBy}
        paths={{
          locations: locationsPath,
          tripCreate: tripCreatePath,
          visitEdit: visitEditPath,
        }}
      />
    </>
  );
}

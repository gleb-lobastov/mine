import React from 'react';
import { usePaths } from 'modules/packages';
import { useTripsStats } from 'travel/dataSource';
import { useQueryFilter } from 'core/context/QueryFilterContext';
import { useAuthContext } from 'core/context/AuthContext';
import useVisitsGroupingSidebar from './useVisitsGroupingSidebar';
import switchFilteringFn from './switchFilteringFn';
import VisitsArranger from './components/VisitsArranger';
import calcStats from './components/VisitsArranger/statistics/utils/calcStats';
import VisitsTitle from './components/VisitsTitle';

export default function VisitsPage({
  match: {
    params: { userAlias, section },
  },
}) {
  const { userAlias: authenticatedUserAlias } = useAuthContext();
  const hasEditRights = userAlias === authenticatedUserAlias;
  const isObscure = userAlias !== authenticatedUserAlias;

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
  const visitsList = visitsIds
    .map(visitId => visitsDict[visitId])
    .filter(switchFilteringFn(provision, filterBy));

  const commonVisitsGroup = { visitsList, parent: null, field: null };
  const totalStats = calcStats(commonVisitsGroup, provision);

  return (
    <>
      <VisitsTitle
        locationsUrl={locationsPath.toUrl({ userAlias })}
        stats={totalStats}
      />
      <VisitsArranger
        visitsList={visitsList}
        provision={provision}
        groupBy={groupBy}
        sortBy={sortBy}
        paths={{
          locations: locationsPath,
          tripCreate: tripCreatePath,
          visitEdit: visitEditPath,
        }}
        isObscure={isObscure}
      />
    </>
  );
}

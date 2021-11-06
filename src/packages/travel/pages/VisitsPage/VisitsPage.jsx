import React from 'react';
import { useTripsStats } from 'travel/dataSource';
import BackdropLoader from 'modules/components/loaders/BackdropLoader';
import { useQueryFilter } from 'core/context/QueryFilterContext';
import { useAuthContext } from 'core/context/AuthContext';
import useVisitsGroupingSidebar from './useVisitsGroupingSidebar';
import VisitsArranger from './components/VisitsArranger';
import calcStats from './components/VisitsArranger/statistics/utils/calcStats';
import VisitsTitle from './components/VisitsTitle';
import useVisitsUrls from './useVisitsUrls';

export default function VisitsPage({
  match: {
    params: { userAlias, section },
  },
}) {
  const { userAlias: authenticatedUserAlias } = useAuthContext();
  const editable = userAlias === authenticatedUserAlias;
  const isObscure = userAlias !== authenticatedUserAlias;

  const { queryFilter, setQueryFilter } = useQueryFilter();
  const { groupBy, sortBy, filterBy } = useVisitsGroupingSidebar(
    setQueryFilter,
    queryFilter,
    section,
  );

  const provision = useTripsStats({ userAlias });
  const { isPending, isError } = provision;

  const urls = useVisitsUrls({ editable, userAlias });

  if (isError) {
    return <div>...Error</div>;
  }
  if (isPending) {
    return <BackdropLoader />;
  }

  const { visitsIds, visitsDict } = provision;
  const visitsList = visitsIds.map(visitId => visitsDict[visitId]);

  const commonVisitsGroup = { visitsList, parent: null, field: null };
  const totalStats = calcStats(commonVisitsGroup, provision);

  return (
    <>
      <VisitsTitle
        locationsUrl={urls.locationsUrl}
        tripCreateUrl={urls.tripCreateUrl}
        stats={totalStats}
      />
      <VisitsArranger
        visitsList={visitsList}
        provision={provision}
        groupBy={groupBy}
        sortBy={sortBy}
        filterBy={filterBy}
        isObscure={isObscure}
        urls={urls}
      />
    </>
  );
}

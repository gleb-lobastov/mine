import React from 'react';
import { useTripsStats } from 'travel/dataSource';
import BackdropLoader from 'modules/components/loaders/BackdropLoader';
import { useQueryFilter } from 'core/context/QueryFilterContext';
import { useAuthContext } from 'core/context/AuthContext';
import useVisitsGroupingSidebar from './useVisitsGroupingSidebar';
import useVisitsUrls from 'travel/utils/useVisitsUrls';
import VisitsArranger, {
  calcStats,
  PLAIN_SORTING,
} from 'travel/components/VisitsArranger';
import VisitsTitle from './components/VisitsTitle';
import resolveGroupsOrder from './resolveGroupsOrder';
import resolveSortingOrder from './resolveSortingOrder';
import resolveFiltering from './resolveFiltering';

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

  const urls = useVisitsUrls({ editable, userAlias, section });

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
        groupsOrder={resolveGroupsOrder(groupBy)}
        sortingOrder={
          section === 'trips'
            ? [PLAIN_SORTING.LAST_VISIT]
            : resolveSortingOrder(sortBy)
        }
        filteringOption={resolveFiltering(filterBy)}
        isObscure={isObscure}
        urls={urls}
        virtualize={true}
      />
    </>
  );
}

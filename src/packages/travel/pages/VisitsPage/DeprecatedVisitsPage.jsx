import React from 'react';
import { usePaths } from 'modules/packages';
import { useTripsStats } from 'travel/dataSource';
import { useQueryFilter } from 'core/context/QueryFilterContext';
import { useAuthContext } from 'core/context/AuthContext';
import { GROUP_VISITS_BY } from './consts';
import useVisitsPageStyles from './useVisitsPageStyles';
import useVisitsGroupingSidebar from './useVisitsGroupingSidebar';
import switchSortingFn from './switchSortingFn';
import switchFilteringFn from './switchFilteringFn';
import renderNodesInOrder from './blocks/renderNodesInOrder';
import renderTitle from './blocks/renderTitle';
import calcCounters from './calcCounters';

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

  const visitsList = unsortedVisitsList.sort(
    switchSortingFn(provision, counters, { groupBy, sortBy }),
  );
  const nodes = visitsList.reduce(
    (nodesAccumulator, visit, index) => {
      const prevVisit = index > 0 ? visitsList[index - 1] : {};
      const nextVisit =
        index < visitsList.length - 1 ? visitsList[index + 1] : {};

      renderNodesInOrder({
        prevVisit,
        visit,
        nextVisit,
        provision,
        classes,
        counters,
        groupBy,
        sortBy,
        hasEditRights,
        travelPaths,
        userAlias,
        visitEditUrl:
          hasEditRights && groupBy === GROUP_VISITS_BY.TRIPS
            ? visitEditPath.toUrl({ strVisitId: String(visit.visitId) })
            : undefined,
        isObscure,
      })
        .filter(Boolean)
        .forEach(node => nodesAccumulator.push(node));

      return nodesAccumulator;
    },
    [titleNode],
  );

  // without key there is strange bug with reconciling:
  // when group_by changed from trips to something other, then trips nodes still
  // rendering in three, but because of nodes keys collisions only
  // originalLocations is remaining on top of the list
  return <div key={`${groupBy}_${sortBy}`}>{nodes}</div>;
}
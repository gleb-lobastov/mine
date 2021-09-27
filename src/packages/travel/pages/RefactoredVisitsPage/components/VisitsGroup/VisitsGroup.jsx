import React from 'react';
import groupByFn from 'lodash/groupBy';
import {
  GROUP_VISITS_BY,
  PLAIN_GROUPS,
  PLAIN_GROUPS_MAPPING,
} from '../../consts';
import CountryVisitsGroup from './components/CountryVisitsGroup';
import LocationVisitsGroup from './components/LocationVisitsGroup';
import YearVisitsGroup from './components/YearVisitsGroup';
import TripVisitsGroup from './components/TripVisitsGroup';
import VisitsItselfGroup from './components/VisitsItselfGroup';

const PLAIN_GROUPS_CONFIG = {
  [PLAIN_GROUPS.TRIPS]: {
    groupKey: 'tripId',
    component: TripVisitsGroup,
  },
  [PLAIN_GROUPS.YEARS]: {
    groupKey: ({ arrivalDateTime }) => arrivalDateTime.getFullYear(),
    component: YearVisitsGroup,
  },
  [PLAIN_GROUPS.COUNTRIES]: {
    groupKey: 'countryId',
    component: CountryVisitsGroup,
  },
  [PLAIN_GROUPS.LOCATIONS]: {
    groupKey: 'locationId',
    component: LocationVisitsGroup,
  },
  [PLAIN_GROUPS.JUST_VISITS]: {
    groupKey: 'visitId',
    component: VisitsItselfGroup,
  },
};

export default function VisitsGroup({
  visitsList,
  groupBy,
  sortBy,
  provision,
  paths,
  isObscure,
}) {
  return renderRecursive({
    visitsList,
    groupingOrder: resolveGroupingOrder(groupBy),
    forwardingProps: {
      sortBy,
      groupBy,
      provision,
      paths,
      isObscure,
    },
  });
}

function renderRecursive({
  visitsList,
  groupingOrder,
  depth = 0,
  groupKeys = [],
  forwardingProps,
}) {
  const currentGroupBy = groupingOrder[depth];
  if (!currentGroupBy) {
    return null;
  }
  const {
    groupKey: currentGroupKey,
    component: VisitsGroupComponent,
  } = PLAIN_GROUPS_CONFIG[currentGroupBy];

  const groupedVisits =
    currentGroupBy === PLAIN_GROUPS.JUST_VISITS
      ? [[null, visitsList]]
      : Object.entries(groupByFn(visitsList, currentGroupKey));

  return groupedVisits.map(([groupKey, visitsByGroup]) => (
    <VisitsGroupComponent
      key={groupKey}
      groupKey={groupKey}
      groupingOrder={groupingOrder}
      depth={depth}
      groupKeys={groupKeys}
      visitsList={visitsByGroup}
      {...forwardingProps}
    >
      {renderRecursive({
        depth: depth + 1,
        visitsList: visitsByGroup,
        groupingOrder,
        groupKeys: [...groupKeys, groupKey],
        forwardingProps,
      })}
    </VisitsGroupComponent>
  ));
}

function resolveGroupingOrder(groupBy) {
  const groupingOrder = groupBy
    .split('_')
    .map(currentGroupBy => PLAIN_GROUPS_MAPPING[currentGroupBy]);

  const shouldShowVisits = groupingOrder.includes(PLAIN_GROUPS.TRIPS);
  const lastGroup = groupingOrder[groupingOrder.length - 1];

  if (!shouldShowVisits && lastGroup !== PLAIN_GROUPS.LOCATIONS) {
    groupingOrder.push(PLAIN_GROUPS.LOCATIONS);
  }
  if (shouldShowVisits) {
    groupingOrder.push(PLAIN_GROUPS.JUST_VISITS);
  }
  return groupingOrder;
}

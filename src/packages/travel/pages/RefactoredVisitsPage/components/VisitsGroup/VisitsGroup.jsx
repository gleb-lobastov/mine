import React from 'react';
import groupByFn from 'lodash/groupBy';
import { GROUP_VISITS_BY } from '../../consts';
import CountryVisitsGroup from './components/CountryVisitsGroup';
import LocationVisitsGroup from './components/LocationVisitsGroup';
import YearVisitsGroup from './components/YearVisitsGroup';
import TripVisitsGroup from './components/TripVisitsGroup';
import VisitsItselfGroup from './components/VisitsItselfGroup';

const PLAIN_VISITS_GROUPS = {
  TRIPS: {
    key: 'TRIPS',
    groupKey: 'tripId',
    component: TripVisitsGroup,
  },
  YEARS: {
    key: 'YEARS',
    groupKey: ({ arrivalDateTime }) => arrivalDateTime.getFullYear(),
    component: YearVisitsGroup,
  },
  COUNTRIES: {
    key: 'COUNTRIES',
    groupKey: 'countryId',
    component: CountryVisitsGroup,
  },
  LOCATIONS: {
    key: 'LOCATIONS',
    groupKey: 'locationId',
    component: LocationVisitsGroup,
  },
  JUST_VISITS: {
    key: 'JUST_VISITS',
    groupKey: 'visitId',
    component: VisitsItselfGroup,
  },
};

const PLAIN_VISITS_GROUPS_MAPPING = {
  [GROUP_VISITS_BY.TRIPS]: PLAIN_VISITS_GROUPS.TRIPS.key,
  [GROUP_VISITS_BY.YEARS]: PLAIN_VISITS_GROUPS.YEARS.key,
  [GROUP_VISITS_BY.COUNTRIES]: PLAIN_VISITS_GROUPS.COUNTRIES.key,
  [GROUP_VISITS_BY.LOCATIONS]: PLAIN_VISITS_GROUPS.LOCATIONS.key,
};

export default function VisitsGroup({
  visitsList,
  groupBy,
  sortBy,
  provision,
  paths,
}) {
  return renderRecursive({
    visitsList,
    groupingOrder: resolveGroupingOrder(groupBy),
    forwardingProps: {
      sortBy,
      groupBy,
      provision,
      paths,
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
  } = PLAIN_VISITS_GROUPS[currentGroupBy];

  const groupedVisits =
    currentGroupBy === PLAIN_VISITS_GROUPS.JUST_VISITS.key
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
    .map(currentGroupBy => PLAIN_VISITS_GROUPS_MAPPING[currentGroupBy]);

  const shouldShowVisits = groupingOrder.includes(
    PLAIN_VISITS_GROUPS.TRIPS.key,
  );
  const lastGroup = groupingOrder[groupingOrder.length - 1];

  if (!shouldShowVisits && lastGroup !== PLAIN_VISITS_GROUPS.LOCATIONS.key) {
    groupingOrder.push(PLAIN_VISITS_GROUPS.LOCATIONS.key);
  }
  if (shouldShowVisits) {
    groupingOrder.push(PLAIN_VISITS_GROUPS.JUST_VISITS.key);
  }
  return groupingOrder;
}

// function VisitsGroup1({
//   visitsList,
//   groupBy,
//   sortBy,
//   parentGroups,
//   provision,
//   paths,
// }) {
//   const { groupKey, groups } = lazyGroups(visitsList, groupBy);
//   const VisitsGroupComponent = componentMapping[actualGroupBy];
//
//   const visitsByGroups = Object.entries(
//     groupByFn(visitsList, keyMapping[actualGroupBy]),
//   );
//
//   return (
//     <>
//       {visitsByGroups.map(([groupKey, visitsByGroup]) => (
//         <VisitsGroupComponent
//           key={groupKey}
//           groupKey={groupKey}
//           sortBy={sortBy}
//           groupBy={groupBy}
//           visitsList={visitsByGroup}
//           provision={provision}
//           parentGroups={parentGroups}
//           paths={paths}
//         >
//           {subGroupBy ? (
//             <VisitsGroup
//               groupBy={subGroupBy}
//               visitsList={visitsByGroup}
//               parentGroups={[...parentGroups, actualGroupBy]}
//               provision={provision}
//               paths={paths}
//             />
//           ) : null}
//         </VisitsGroupComponent>
//       ))}
//     </>
//   );
// }

VisitsGroup.defaultProps = {
  parentGroups: [],
};

function resolveActualGroup(groupBy) {
  switch (groupBy) {
    case GROUP_VISITS_BY.YEARS_COUNTRIES:
    case GROUP_VISITS_BY.YEARS:
      return GROUP_VISITS_BY.YEARS;
    case GROUP_VISITS_BY.COUNTRIES_YEARS:
    case GROUP_VISITS_BY.COUNTRIES:
      return GROUP_VISITS_BY.COUNTRIES;
    case GROUP_VISITS_BY.TRIPS_COUNTRIES:
    case GROUP_VISITS_BY.TRIPS:
      return GROUP_VISITS_BY.TRIPS;
    case GROUP_VISITS_BY.LOCATIONS:
    default:
      return GROUP_VISITS_BY.LOCATIONS;
  }
}

function resolveSubgroup(groupBy) {
  switch (groupBy) {
    case GROUP_VISITS_BY.YEARS_COUNTRIES:
    case GROUP_VISITS_BY.TRIPS_COUNTRIES:
      return GROUP_VISITS_BY.COUNTRIES;
    case GROUP_VISITS_BY.COUNTRIES_YEARS:
      return GROUP_VISITS_BY.YEARS;
    case GROUP_VISITS_BY.YEARS:
    case GROUP_VISITS_BY.COUNTRIES:
      return GROUP_VISITS_BY.LOCATIONS;
    case GROUP_VISITS_BY.TRIPS: // every visit in trip should be shown
    case GROUP_VISITS_BY.LOCATIONS:
    default:
      return null;
  }
}

function RowVirtualizerDynamic({ rows }) {
  const parentRef = React.useRef();

  const rowVirtualizer = useVirtual({
    size: rows.length,
    parentRef,
  });

  return (
    <>
      <div
        ref={parentRef}
        className="List"
        style={{
          height: `200px`,
          width: `400px`,
          overflow: 'auto',
        }}
      >
        <div
          style={{
            height: `${rowVirtualizer.totalSize}px`,
            width: '100%',
            position: 'relative',
          }}
        >
          {rowVirtualizer.virtualItems.map(virtualRow => (
            <div
              key={virtualRow.index}
              ref={virtualRow.measureRef}
              className={virtualRow.index % 2 ? 'ListItemOdd' : 'ListItemEven'}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: `${rows[virtualRow.index]}px`,
                transform: `translateY(${virtualRow.start}px)`,
              }}
            >
              Row {virtualRow.index}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

function lazyGroups(visitsList, groupBy) {
  const actualGroupBy = resolveActualGroup(groupBy);
  const subGroupBy = resolveSubgroup(groupBy);
  let cachedGroups;
  return {
    groupKey: actualGroupBy,
    get groups() {
      if (!cachedGroups) {
        const groups = groupByFn(visitsList, keyMapping[actualGroupBy]);
        console.log('calc', { actualGroupBy, groups });
        cachedGroups = Object.entries(groups).map(
          ([groupKey, groupVisitsList]) =>
            lazyGroups(groupVisitsList, subGroupBy),
        );
      } else {
        console.log('cache', { actualGroupBy, cachedGroups });
      }
      return cachedGroups;
    },
  };
}

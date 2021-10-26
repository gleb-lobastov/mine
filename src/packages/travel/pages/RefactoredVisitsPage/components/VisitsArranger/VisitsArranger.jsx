import React from 'react';
import groupByFn from 'lodash/groupBy';
import { makeStyles } from '@material-ui/core/styles';
import {
  PLAIN_GROUPS,
  PLAIN_GROUPS_CONFIG,
  resolveGroupsOrder,
} from './arrangement/groupping';
import calcStats from '../StatsPanel/utils/calcStats';

const useStyles = makeStyles(theme => ({
  header0: {
    ...theme.typography.h2,
  },
  header1: {
    ...theme.typography.h4,
  },
  header2: {
    ...theme.typography.body1,
  },
  container0: {
    display: 'flex',
    alignItems: 'self-start',
    marginTop: '64px',
  },
  container1: {
    display: 'flex',
    alignItems: 'self-start',
    marginTop: '18px',
    marginBottom: '6px',
    paddingLeft: '32px',
  },
  container2: {
    paddingLeft: '96px',
  },
}));

export default function VisitsArranger({
  visitsList,
  groupBy,
  sortBy,
  provision,
  ...forwardingProps
}) {
  const classes = useStyles();
  return renderRecursive({
    classes,
    provision,
    visitsList,
    groupsOrder: resolveGroupsOrder(groupBy),
    forwardingProps,
  });
}

function renderRecursive({
  classes,
  provision,
  visitsList,
  groupsOrder,
  forwardingProps,
}) {
  return renderRecursiveInternal(visitsList, groupsOrder, []);

  function renderRecursiveInternal(
    visitsListInternal,
    groupsOrderInternal,
    groupsFields,
  ) {
    const [plainGroup, ...restGroupsOrder] = groupsOrderInternal;
    if (!plainGroup) {
      return null;
    }
    const { component: VisitsGroupComponent } = PLAIN_GROUPS_CONFIG[plainGroup];

    const visitsGroups = groupVisitsBy(visitsListInternal, plainGroup).map(
      visitGroup => {
        const fieldsStack = [...groupsFields, visitGroup];
        return {
          ...visitGroup,
          plainGroup,
          fieldsStack,
          stats: calcStats(visitGroup.visitsList, provision, fieldsStack),
        };
      },
    );

    // const sortedGroupedFields = sortByFn(groupedFields);

    return visitsGroups.map(visitGroup => (
      <VisitsGroupComponent
        key={visitGroup.field.value}
        visitGroup={visitGroup}
        classes={resolveVisitsGroupClasses(classes, groupsFields.length)}
        provision={provision}
        {...forwardingProps}
      >
        {renderRecursiveInternal(
          visitGroup.visitsList,
          restGroupsOrder,
          visitGroup.fieldsStack,
        )}
      </VisitsGroupComponent>
    ));
  }
}

function groupVisitsBy(visitsList, plainGroup) {
  const { groupFieldName } = PLAIN_GROUPS_CONFIG[plainGroup];
  return plainGroup === PLAIN_GROUPS.JUST_VISITS
    ? {
        field: { name: groupFieldName, value: null },
        visitsList,
      }
    : groupVisitsByValue(visitsList, groupFieldName);
}

function groupVisitsByValue(visitsList, groupFieldName) {
  return Object.entries(groupByFn(visitsList, groupFieldName)).map(
    ([groupFieldValue, groupVisitsList]) => ({
      field: { name: groupFieldName, value: groupFieldValue },
      visitsList: groupVisitsList,
    }),
  );
}

function resolveVisitsGroupClasses(classes, groupLevel) {
  return {
    container: classes[`container${groupLevel}`],
    header: classes[`header${groupLevel}`],
  };
}

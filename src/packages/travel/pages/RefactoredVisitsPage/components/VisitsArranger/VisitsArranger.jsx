import React from 'react';
import groupByFn from 'lodash/groupBy';
import { makeStyles } from '@material-ui/core/styles';
import {
  PLAIN_GROUPS,
  PLAIN_GROUPS_CONFIG,
  resolveGroupingOrder,
} from './arrangement/groupping';
import calcStats from '../StatsPanel/utils/calcStats';

const HEADING_VARIANTS = ['h2', 'h4', 'body1'];
const HEADING_CLASSNAMES = ['level0', 'level1', 'level2'];

const useStyles = makeStyles({
  level0: {
    display: 'flex',
    alignItems: 'self-start',
    marginTop: '64px',
  },
  level1: {
    display: 'flex',
    alignItems: 'self-start',
    marginTop: '18px',
    marginBottom: '6px',
    paddingLeft: '32px',
  },
  level2: {
    paddingLeft: '96px',
  },
});

export default function VisitsArranger({
  visitsList,
  groupBy,
  sortBy,
  ...forwardingProps
}) {
  const classes = useStyles();
  return renderRecursive({
    classes,
    visitsList,
    groupingOrder: resolveGroupingOrder(groupBy),
    forwardingProps,
  });
}

function renderRecursive({
  classes,
  visitsList,
  groupingOrder,
  groupingLevel = 0,
  groupingFields = [],
  forwardingProps,
}) {
  const { provision } = forwardingProps;
  const plainGroup = groupingOrder[groupingLevel];
  if (!plainGroup) {
    return null;
  }
  const {
    groupingFieldName,
    component: VisitsGroupComponent,
  } = PLAIN_GROUPS_CONFIG[plainGroup];

  const groupedVisits =
    plainGroup === PLAIN_GROUPS.JUST_VISITS
      ? [[null, visitsList]]
      : Object.entries(groupByFn(visitsList, groupingFieldName));

  const groupedFields = groupedVisits.map(
    ([groupingFieldValue, visitsByGroup]) => {
      const groupingField = {
        visitsByGroup,
        plainGroup,
        fieldName: groupingFieldName,
        value: groupingFieldValue,
      };
      const nestedGroupingFields = [...groupingFields, groupingField];
      const stats = calcStats(visitsByGroup, provision, nestedGroupingFields);
      groupingField.nestedGroupingFields = nestedGroupingFields;
      groupingField.stats = stats; // ! affect nestedGroupingFields
      return groupingField;
    },
  );

  // const sortedGroupedFields = sortByFn(groupedFields);

  return groupedFields.map(groupingField => {
    const {
      value: groupingFieldValue,
      nestedGroupingFields,
      visitsByGroup,
    } = groupingField;
    return (
      <VisitsGroupComponent
        key={groupingFieldValue}
        groupingLevel={groupingLevel}
        groupingField={groupingField}
        groupingFields={nestedGroupingFields}
        headingVariant={HEADING_VARIANTS[groupingLevel]}
        className={classes[HEADING_CLASSNAMES[groupingLevel]]}
        {...forwardingProps}
      >
        {renderRecursive({
          classes,
          visitsList: visitsByGroup,
          groupingOrder,
          groupingLevel: groupingLevel + 1,
          groupingFields: nestedGroupingFields,
          forwardingProps,
        })}
      </VisitsGroupComponent>
    );
  });
}

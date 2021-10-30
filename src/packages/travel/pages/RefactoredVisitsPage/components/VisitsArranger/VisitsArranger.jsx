import React, { Fragment } from 'react';
import cls from 'classnames';
import { makeStyles } from '@material-ui/core/styles';
import clamp from 'lodash/clamp';
import calcStats from './statistics/utils/calcStats';
import StatsPanel from './statistics/components/StatsPanel';
import resolveGroupsOrder from './arrangement/groupping/utils/resolveGroupsOrder';
import groupVisitsBy from './arrangement/groupping/utils/groupVisitsBy';
import resolveSortingOrder from './arrangement/sorting/utils/resolveSortingOrder';
import sortVisitsBy from './arrangement/sorting/utils/sortVisitsBy';
import { PLAIN_GROUPS_CONFIG } from './arrangement/groupping/consts';

const useStyles = makeStyles(theme => ({
  header0: {
    ...theme.typography.h2,
  },
  container0: {
    display: 'flex',
    alignItems: 'self-start',
  },
  level0: {
    marginTop: '64px',
  },

  header1: {
    ...theme.typography.h4,
  },
  container1: {
    display: 'flex',
    alignItems: 'self-start',
  },
  level1: {
    marginTop: '18px',
    marginBottom: '6px',
    [theme.breakpoints.up('sm')]: {
      paddingLeft: '32px',
    },
  },

  header2: {
    ...theme.typography.body1,
  },
  container2: {
    display: 'flex',
    alignItems: 'center',
  },
  level2: {
    [theme.breakpoints.up('sm')]: {
      paddingLeft: '96px',
    },
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
    sortingOrder: resolveSortingOrder(sortBy),
    forwardingProps,
  });
}

function renderRecursive({
  classes,
  provision,
  visitsList,
  groupsOrder,
  sortingOrder,
  isObscure,
  forwardingProps,
}) {
  return renderRecursiveInternal(
    { visitsList, parent: null, field: null },
    groupsOrder,
  );

  function renderRecursiveInternal(parentVisitsGroup, groupsOrderInternal) {
    const [plainGroup, ...restGroupsOrder] = groupsOrderInternal;
    if (!plainGroup) {
      return null;
    }
    const { component: VisitsGroupComponent } = PLAIN_GROUPS_CONFIG[plainGroup];
    const { visitsList: visitsListInternal } = parentVisitsGroup;
    const nestingLevel = lookupLevel(parentVisitsGroup);

    const visitsGroups = groupVisitsBy(visitsListInternal, plainGroup).map(
      visitsGroup => {
        const enhancedVisitsGroup = {
          ...visitsGroup,
          plainGroup,
          parent: parentVisitsGroup,
        };
        enhancedVisitsGroup.stats = calcStats(enhancedVisitsGroup, provision);
        return enhancedVisitsGroup;
      },
    );

    const sortedVisitsGroups = sortVisitsBy(
      visitsGroups,
      sortingOrder,
      plainGroup,
      provision,
    );

    return sortedVisitsGroups.map(visitsGroup => (
      <Fragment key={visitsGroup.field.value}>
        <VisitsGroupComponent
          visitsGroup={visitsGroup}
          classes={resolveVisitsGroupClasses(classes, {
            level: nestingLevel,
            levelsTotal: nestingLevel + groupsOrderInternal.length,
          })}
          provision={provision}
          {...forwardingProps}
        >
          <StatsPanel
            visitsGroup={visitsGroup}
            provision={provision}
            isObscure={isObscure}
          />
        </VisitsGroupComponent>
        {renderRecursiveInternal(visitsGroup, restGroupsOrder)}
      </Fragment>
    ));
  }
}

const MAX_LEVEL = 3;
function resolveVisitsGroupClasses(classes, { level, levelsTotal }) {
  const actualLevel = clamp(MAX_LEVEL - levelsTotal + level, 0, MAX_LEVEL - 1);
  return {
    level: classes[`level${level}`],
    container: cls(
      classes[`level${level}`],
      classes[`container${actualLevel}`],
    ),
    header: classes[`header${actualLevel}`],
  };
}

function lookupLevel(visitsGroup) {
  let currentVisitsGroup = visitsGroup;
  let level = 0;
  while (currentVisitsGroup) {
    level += 1;
    currentVisitsGroup = currentVisitsGroup.parent;
  }
  return Math.max(0, level - 1);
}

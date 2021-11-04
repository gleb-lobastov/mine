import React, { Fragment } from 'react';
import cls from 'classnames';
import { makeStyles } from '@material-ui/core/styles';
import clamp from 'lodash/clamp';
import VisitsPhotosGallery from './components/VisitsPhotosGallery';
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
    marginTop: '64px',
  },
  level0: {},

  header1: {
    ...theme.typography.h4,
  },
  container1: {
    display: 'flex',
    alignItems: 'self-start',
    marginTop: '18px',
    marginBottom: '6px',
  },
  level1: {
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
    const expectedMaxLevel = nestingLevel + groupsOrderInternal.length;
    const sectionLevel = resolveSectionLevel(nestingLevel, expectedMaxLevel);

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
            nestingLevel,
            sectionLevel,
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
        {sectionLevel === 1 && (
          <VisitsPhotosGallery
            className={classes[`level${nestingLevel + 1}`]}
            visitsGroup={visitsGroup}
          />
        )}
        {renderRecursiveInternal(visitsGroup, restGroupsOrder)}
      </Fragment>
    ));
  }
}

function resolveVisitsGroupClasses(classes, { nestingLevel, sectionLevel }) {
  return {
    level: classes[`level${nestingLevel}`],
    container: cls(
      classes[`level${nestingLevel}`],
      classes[`container${sectionLevel}`],
    ),
    header: classes[`header${sectionLevel}`],
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

const MAX_LEVEL = 3;
function resolveSectionLevel(nestingLevel, expectedMaxLevel) {
  return clamp(MAX_LEVEL - expectedMaxLevel + nestingLevel, 0, MAX_LEVEL - 1);
}

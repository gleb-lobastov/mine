import React, { useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clamp from 'lodash/clamp';
import cls from 'classnames';
import { useCollapsible } from 'travel/components/VisitsArranger/arrangement/collapsing';
import {
  groupVisitsBy,
  PLAIN_GROUPS,
  PLAIN_GROUPS_CONFIG,
} from 'travel/components/VisitsArranger/arrangement/groupping';
import { calcStats } from 'travel/components/VisitsArranger/statistics';
import { sortVisitsBy } from 'travel/components/VisitsArranger/arrangement/sorting';
import Expandable from 'travel/components/VisitsArranger/components/Expandable';
import Virtualizer from 'travel/components/VisitsArranger/components/Virtualizer';
import VisitGroup from 'travel/components/VisitsArranger/components/VisitGroup';
import { switchFilteringFn } from './arrangement/filtering';

const useStyles = makeStyles(theme => ({
  noMarginTop: {},
  link: {
    cursor: 'pointer',
  },
  header0: {
    ...theme.typography.h2,
    wordBreak: 'break-word',
  },
  container0: {
    display: 'flex',
    alignItems: 'self-start',
    '&:not($noMarginTop)': {
      marginTop: '64px',
    },
  },
  level0: {},

  header1: {
    ...theme.typography.h4,
    wordBreak: 'break-word',
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
    wordBreak: 'break-word',
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
  groupsOrder,
  sortingOrder,
  filteringOption,
  provision,
  urls,
  isObscure,
  config: { collapsible: allowCollapsible = true, ...config },
  adaptHeadersSize,
  mapSectionLevel,
  photosSectionLevel,
  children,
  virtualize,
  ...forwardingProps
}) {
  const classes = useStyles();

  const actualVisitsList = visitsList.filter(
    switchFilteringFn(provision, filteringOption),
  );

  const virtualizerRef = useRef();
  const { collapsible, disableCollapsible } = useCollapsible({
    allowCollapsible,
    onToggleCollapsible: () => virtualizerRef.current?.measure(),
  });

  // if virtualize is true, then need to virtualize, so not yet virtualized
  let virtualized = !virtualize;

  return renderRecursive(
    { visitsList: actualVisitsList, parent: null, field: null },
    groupsOrder,
  );

  function renderRecursive(parentVisitsGroup, groupsOrderInternal) {
    const [plainGroup, ...restGroupsOrder] = groupsOrderInternal;
    if (!plainGroup) {
      return null;
    }
    const { component: VisitsGroupComponent } = PLAIN_GROUPS_CONFIG[plainGroup];
    const { visitsList: visitsListInternal } = parentVisitsGroup;

    const nestingLevel = lookupLevel(parentVisitsGroup);
    const expectedMaxLevel = nestingLevel + groupsOrderInternal.length;
    const actualAdaptHeadersSize = Array.isArray(adaptHeadersSize)
      ? adaptHeadersSize[nestingLevel]
      : adaptHeadersSize;
    const sectionLevel = actualAdaptHeadersSize
      ? resolveSectionLevel(nestingLevel, expectedMaxLevel)
      : nestingLevel;

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

    const bypassVirtualization = virtualized;
    if (!virtualized) {
      virtualized = true; // only apply for the top level list
    }
    return (
      <>
        <Expandable
          classes={{
            actions: cls(classes.link, classes[`level${nestingLevel}`]),
          }}
          collapsible={collapsible && plainGroup === PLAIN_GROUPS.LOCATIONS}
          items={sortedVisitsGroups}
          onExpand={virtualizerRef.current?.measure}
          onExpandAll={disableCollapsible}
        >
          {({ items: actualVisitsGroups }) => (
            <Virtualizer
              items={actualVisitsGroups}
              bypass={bypassVirtualization}
              ref={bypassVirtualization ? undefined : virtualizerRef}
              overscan={3}
            >
              {({ item: visitsGroup, index }) => (
                <VisitGroup
                  key={toFieldSignature(visitsGroup.field)}
                  classes={resolveVisitsGroupClasses(classes, {
                    nestingLevel,
                    sectionLevel,
                    isFirstChild: index === 0,
                  })}
                  visitsGroup={visitsGroup}
                  VisitsGroupComponent={VisitsGroupComponent}
                  config={config}
                  isObscure={isObscure}
                  provision={provision}
                  urls={urls}
                  forwardingProps={forwardingProps}
                  showMap={nestingLevel === mapSectionLevel}
                  showPhotos={nestingLevel === photosSectionLevel}
                  onHeightChange={virtualizerRef.current?.measure}
                >
                  {children?.({
                    level: nestingLevel,
                    className: classes[`level${nestingLevel + 1}`],
                    index,
                    visitsGroup,
                  })}
                  {renderRecursive(visitsGroup, restGroupsOrder)}
                </VisitGroup>
              )}
            </Virtualizer>
          )}
        </Expandable>
      </>
    );
  }
}

VisitsArranger.defaultProps = {
  mapSectionLevel: 0,
  photosSectionLevel: 0,
};

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

function toFieldSignature(field) {
  const { name, value } = field ?? {};
  return `${name}:${value}`;
}

function resolveVisitsGroupClasses(
  classes,
  { nestingLevel, sectionLevel, isFirstChild },
) {
  return {
    level: classes[`level${nestingLevel}`],
    nextLevel: classes[`level${nestingLevel + 1}`],
    container: cls(
      classes[`level${nestingLevel}`],
      classes[`container${sectionLevel}`],
      { [classes.noMarginTop]: isFirstChild && nestingLevel === 0 },
    ),
    header: classes[`header${sectionLevel}`],
  };
}

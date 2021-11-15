import React, { useRef, useState, useEffect, useCallback } from 'react';
import cls from 'classnames';
import clamp from 'lodash/clamp';
import {
  groupVisitsBy,
  PLAIN_GROUPS,
  PLAIN_GROUPS_CONFIG,
} from './arrangement/groupping';
import { calcStats } from './statistics';
import { sortVisitsBy } from './arrangement/sorting';
import VisitGroup from './components/VisitGroup';
import Virtualizer from './components/Virtualizer';
import Expandable from './components/Expandable';

export default function renderRecursive({
  classes,
  children,
  provision,
  urls,
  config,
  visitsList,
  groupsOrder,
  sortingOrder,
  isObscure,
  mapSectionLevel,
  photosSectionLevel,
  forwardingProps,
  virtualize,
}) {
  const virtualizerRef = useRef();
  const [collapsible, setCollapsible] = useState(true);
  const disableCollapsible = useCallback(() => setCollapsible(false), []);
  useEffect(() => virtualizerRef.current?.measure(), [collapsible]);

  // if virtualize is true, then need to virtualize, so not yet virtualized
  let virtualized = !virtualize;

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
                  showMap={sectionLevel === mapSectionLevel}
                  showPhotos={sectionLevel === photosSectionLevel}
                  onHeightChange={virtualizerRef.current?.measure}
                >
                  {children?.({
                    level: nestingLevel,
                    index,
                    visitsGroup,
                  })}
                  {renderRecursiveInternal(visitsGroup, restGroupsOrder)}
                </VisitGroup>
              )}
            </Virtualizer>
          )}
        </Expandable>
      </>
    );
  }
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

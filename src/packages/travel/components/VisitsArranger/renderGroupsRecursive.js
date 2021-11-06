import React, { Fragment } from 'react';
import cls from 'classnames';
import clamp from 'lodash/clamp';
import { groupVisitsBy, PLAIN_GROUPS_CONFIG } from './arrangement/groupping';
import { calcStats, StatsPanel } from './statistics';
import { sortVisitsBy } from './arrangement/sorting';
import VisitsPhotosGallery from './components/VisitsPhotosGallery';

export default function renderRecursive({
  classes,
  provision,
  urls,
  visitsList,
  groupsOrder,
  sortingOrder,
  isObscure,
  photosSectionLevel,
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
          urls={urls}
          {...forwardingProps}
        >
          <StatsPanel
            visitsGroup={visitsGroup}
            provision={provision}
            isObscure={isObscure}
          />
        </VisitsGroupComponent>
        {sectionLevel === photosSectionLevel && (
          <VisitsPhotosGallery
            className={classes[`level${nestingLevel + 1}`]}
            visitsGroup={visitsGroup}
            provision={provision}
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

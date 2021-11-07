import React, { Fragment } from 'react';
import cls from 'classnames';
import MUILink from '@material-ui/core/Link';
import clamp from 'lodash/clamp';
import {
  groupVisitsBy,
  PLAIN_GROUPS,
  PLAIN_GROUPS_CONFIG,
} from './arrangement/groupping';
import { calcStats, StatsPanel } from './statistics';
import { sortVisitsBy } from './arrangement/sorting';
import VisitsPhotosGallery from './components/VisitsPhotosGallery';
import VisitsLocationsMap from './components/VisitsLocationsMap';

const COLLAPSED_GROUP_ITEMS = 10;
const COLLAPSED_GROUP_THRESHOLD = 2;

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
  expandedGroups,
  toggleExpandedGroups,
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

    const collapsible =
      plainGroup === PLAIN_GROUPS.LOCATIONS &&
      sortedVisitsGroups.length >
        COLLAPSED_GROUP_ITEMS + COLLAPSED_GROUP_THRESHOLD;
    const expanded = collapsible
      ? expandedGroups[toFieldSignature(parentVisitsGroup.field)]
      : true;

    const actualVisitsGroups = expanded
      ? sortedVisitsGroups
      : sortedVisitsGroups.slice(0, COLLAPSED_GROUP_ITEMS);

    return (
      <>
        {actualVisitsGroups.map((visitsGroup, index) => (
          <Fragment key={visitsGroup.field.value}>
            <VisitsGroupComponent
              visitsGroup={visitsGroup}
              classes={resolveVisitsGroupClasses(classes, {
                nestingLevel,
                sectionLevel,
              })}
              provision={provision}
              urls={urls}
              config={config}
              {...forwardingProps}
            >
              <StatsPanel
                visitsGroup={visitsGroup}
                provision={provision}
                isObscure={isObscure}
                config={config}
              />
            </VisitsGroupComponent>
            {children?.({ level: nestingLevel, index, visitsGroup })}
            {renderRecursiveInternal(visitsGroup, restGroupsOrder)}
            {sectionLevel === photosSectionLevel && (
              <VisitsPhotosGallery
                className={classes[`level${nestingLevel + 1}`]}
                visitsGroup={visitsGroup}
                provision={provision}
              />
            )}
            {sectionLevel === mapSectionLevel && (
              <VisitsLocationsMap
                className={classes[`level${nestingLevel + 1}`]}
                visitsGroup={visitsGroup}
                provision={provision}
              />
            )}
          </Fragment>
        ))}
        {!expanded && (
          <MUILink
            className={cls(classes.link, classes[`level${nestingLevel}`])}
            variant="body2"
            onClick={() =>
              toggleExpandedGroups(toFieldSignature(parentVisitsGroup.field))
            }
          >
            {`показать еще ${sortedVisitsGroups.length -
              actualVisitsGroups.length}`}
          </MUILink>
        )}
      </>
    );
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

function toFieldSignature(field) {
  const { name, value } = field ?? {};
  return `${name}:${value}`;
}

import React, { useRef } from 'react';
import { useVirtual } from 'react-virtual';
import cls from 'classnames';
import MUILink from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import clamp from 'lodash/clamp';
import {
  groupVisitsBy,
  PLAIN_GROUPS,
  PLAIN_GROUPS_CONFIG,
} from './arrangement/groupping';
import { calcStats } from './statistics';
import { sortVisitsBy } from './arrangement/sorting';
import VisitGroup from './components/VisitGroup';

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
  const parentRef = useRef();
  let virtualized = false;

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
        COLLAPSED_GROUP_ITEMS + COLLAPSED_GROUP_THRESHOLD &&
      !expandedGroups['*'];
    const expanded = collapsible
      ? expandedGroups[toFieldSignature(parentVisitsGroup.field)]
      : true;

    const actualVisitsGroups = expanded
      ? sortedVisitsGroups
      : sortedVisitsGroups.slice(0, COLLAPSED_GROUP_ITEMS);

    let items;
    let virtualItemsV;
    let size;
    if (!virtualized) {
      virtualized = true;
      const windowRef = useRef(window);
      const { virtualItems, totalSize } = useVirtual({
        size: actualVisitsGroups.length,
        parentRef,
        estimateSize,
        overscan: 1,
        scrollToFn: defaultScrollToFn,
        onScrollElement: windowRef,
        scrollOffsetFn() {
          const bounds = parentRef.current.getBoundingClientRect();
          return bounds.top * -1;
        },
        useObserver: () => useWindowRect(),
      });
      items = virtualItems.map(({ index }) => actualVisitsGroups[index]);
      size = totalSize;
      virtualItemsV = virtualItems;
    } else {
      items = actualVisitsGroups;
    }

    const array = items.map((visitsGroup, index) => (
      <VisitGroup
        key={toFieldSignature(visitsGroup.field)}
        classes={classes}
        config={config}
        forwardingProps={forwardingProps}
        isObscure={isObscure}
        mapSectionLevel={mapSectionLevel}
        nestingLevel={nestingLevel}
        photosSectionLevel={photosSectionLevel}
        provision={provision}
        sectionLevel={sectionLevel}
        urls={urls}
        visitsGroup={visitsGroup}
        VisitsGroupComponent={VisitsGroupComponent}
      >
        {children?.({ level: nestingLevel, index, visitsGroup })}
        {renderRecursiveInternal(visitsGroup, restGroupsOrder)}
      </VisitGroup>
    ));

    return (
      <>
        {virtualItemsV ? (
          <div ref={parentRef}>
            <div style={{ height: size, position: 'relative' }}>
              {array.map((item, index) => (
                <div
                  key={virtualItemsV[index].index}
                  ref={virtualItemsV[index].measureRef}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    transform: `translateY(${virtualItemsV[index].start}px)`,
                  }}
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        ) : (
          array
        )}
        {!expanded && (
          <Typography
            className={cls(classes.link, classes[`level${nestingLevel}`])}
            variant="body2"
          >
            <MUILink
              onClick={() =>
                toggleExpandedGroups(toFieldSignature(parentVisitsGroup.field))
              }
            >
              {`показать еще ${sortedVisitsGroups.length -
                actualVisitsGroups.length}`}
            </MUILink>
            {', '}
            <MUILink onClick={() => toggleExpandedGroups('*')}>
              раскрыть все
            </MUILink>
          </Typography>
        )}
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

function defaultScrollToFn(offset) {
  window.scrollY = offset;
}

function estimateSize() {
  return 500;
}

const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? React.useLayoutEffect : React.useEffect;

function useWindowRect() {
  const [rect, dispatch] = React.useReducer(rectReducer, null);
  useIsomorphicLayoutEffect(() => {
    dispatch({
      rect: {
        height: window.innerHeight,
        width: window.innerWidth,
      },
    });
  }, []);

  React.useEffect(() => {
    const resizeHandler = () => {
      dispatch({
        rect: {
          height: window.innerHeight,
          width: window.innerWidth,
        },
      });
    };
    resizeHandler();
    window.addEventListener('resize', resizeHandler);
    return () => {
      window.removeEventListener('resize', resizeHandler);
    };
  }, []);

  return rect;
}

function rectReducer(state, action) {
  const rect = action.rect;
  if (!state || state.height !== rect.height || state.width !== rect.width) {
    return rect;
  }
  return state;
}

import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import isFunction from 'lodash/isFunction';

const useStyles = makeStyles({
  container: {
    position: 'sticky',
    height: '100vh',
    top: 120,
    right: 0,
    overflow: 'hidden',
    marginRight: '-24px',
    marginTop: '-24px',
    width: '480px',
  },
  content: {
    paddingRight: '24px',
    paddingTop: '24px',
  },
  buddy: {
    backgroundColor: 'yellow',
  },
});

export default function ScrollBuddy({
  nodesRef,
  list,
  renderItem,
  deps,
  renderBuddy,
  children: renderChildrenFn,
}) {
  const classes = useStyles();

  const heightsRef = useRef();
  const [{ elIndex: selectedIndex, percent }, setSelectedIndex] = useState({
    selectedIndex: null,
    percent: 0,
  });

  const children = mapWithActive(list, renderItem, selectedIndex);

  useLayoutEffect(() => {
    if (!nodesRef.current) {
      return;
    }
    const offset =
      nodesRef.current.getBoundingClientRect().top + window.scrollY;
    heightsRef.current = cumulativeTotal([
      offset,
      ...Array.from(nodesRef.current.children ?? []).map(getElementHeight),
    ]);
  }, deps);

  useEffect(() => {
    const handleScroll = function handleScroll() {
      if (!heightsRef.current || !nodesRef.current) {
        return;
      }
      const bottom = Math.max(
        window.innerHeight * 1.5 -
          nodesRef.current.getBoundingClientRect().bottom,
        0,
      );
      const centerPosition =
        window.scrollY +
        Math.min(window.scrollY, window.innerHeight / 2) +
        bottom;
      const elIndex = bisect(heightsRef.current, centerPosition);
      const elPercent =
        (centerPosition - heightsRef.current[elIndex]) /
        (heightsRef.current[elIndex + 1] - heightsRef.current[elIndex]);
      setSelectedIndex({ elIndex, percent: elPercent });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <div>
        {renderChildrenFn(
          <div
            ref={nodesRef}
            onClick={e => e.target?.scrollIntoView({ block: 'center' })}
          >
            {children}
          </div>,
        )}
      </div>
      {Boolean(nodesRef.current?.children) && (
        <div className={classes.container}>
          <div className={classes.content}>
            {percent < 0.1 &&
              selectedIndex > 0 && (
                <div
                  className={classes.buddy}
                  style={{ transform: `translateX(${-percent * 300}px)` }}
                >
                  {renderBuddy(list[selectedIndex - 1], selectedIndex - 1)}
                </div>
              )}
            <div className={classes.buddy}>
              {children[selectedIndex]}
              {renderBuddy(list[selectedIndex], selectedIndex)}
            </div>
            {percent < 0.1 &&
              selectedIndex >= nodesRef.current?.children.length - 1 && (
                <div className={classes.buddy}>
                  {renderBuddy(list[selectedIndex + 1], selectedIndex + 1)}
                </div>
              )}
          </div>
        </div>
      )}
    </div>
  );
}

const cssHeightRelatedAttributes = [
  'margin-top',
  'margin-bottom',
  'border-top',
  'border-bottom',
  'padding-top',
  'padding-bottom',
  'height',
];

function getElementHeight(node) {
  const style = window.getComputedStyle(node);
  return cssHeightRelatedAttributes
    .map(attr => parseInt(style.getPropertyValue(attr), 10))
    .reduce((total, current) => total + current);
}

function cumulativeTotal(array) {
  return array.reduce((acc, value, index) => {
    acc.push(index === 0 ? value : acc[index - 1] + value);
    return acc;
  }, []);
}

function bisect(arrayToSearch, valueToFind) {
  if (!arrayToSearch || !arrayToSearch.length) {
    return undefined;
  }
  let startLookupIdx = 0;
  let endLookupIdx = arrayToSearch.length - 1;
  while (endLookupIdx - startLookupIdx > 1) {
    const middleIdx = Math.floor(
      (endLookupIdx - startLookupIdx) / 2 + startLookupIdx,
    );
    if (arrayToSearch[middleIdx] === valueToFind) {
      return middleIdx;
    }
    if (arrayToSearch[middleIdx] > valueToFind) {
      endLookupIdx = middleIdx;
    } else {
      startLookupIdx = middleIdx;
    }
  }
  return startLookupIdx;
}

function mapWithActive(array, callback, activeIndex) {
  let currentIndex = 0;
  return array.reduce((accumulator, item) => {
    const node = callback(item, activeIndex === currentIndex);
    if (node) {
      accumulator.push(node);
      currentIndex += 1;
    }
    return accumulator;
  }, []);
}

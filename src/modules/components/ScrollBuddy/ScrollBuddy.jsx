import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  container: {
    position: 'sticky',
    height: '100vh',
    top: 0,
    right: 0,
    overflow: 'hidden',
    marginRight: '-24px',
    marginTop: '-24px',
  },
  contentWrapper: {
    marginRight: '-24px',
    paddingRight: '24px',
    paddingTop: '24px',
    overflow: 'auto',
    pointerEvents: 'none',
  },
  content: {
    height: '100vh',
    paddingRight: '24px',
  },
});

export default function ScrollBuddy({ nodesRef, children, deps }) {
  const classes = useStyles();
  const buddyRef = useRef();
  const heightsRef = useRef();
  const frameHandleRef = useRef(null);
  const [selectedIndex, setSelectedIndex] = useState(null);

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
      setSelectedIndex(elIndex);
      const percent =
        (centerPosition - heightsRef.current[elIndex]) /
        (heightsRef.current[elIndex + 1] - heightsRef.current[elIndex]);
      const el = buddyRef.current.children[elIndex];
      const elHeight = el.getBoundingClientRect().height;
      const targetTop =
        el.offsetTop - window.innerHeight / 2 + elHeight * percent;
      if (!frameHandleRef.current) {
        cancelAnimationFrame(frameHandleRef.current);
        frameHandleRef.current = null;
      }
      frameHandleRef.current = window.requestAnimationFrame(() => {
        frameHandleRef.current = null;
        buddyRef.current.parentElement.scrollTop = targetTop;
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  });

  const { right, left } = children(selectedIndex);
  return (
    <>
      {right}
      <div className={classes.container}>
        <div className={classes.contentWrapper}>
          <div className={classes.content} ref={buddyRef}>
            {left}
          </div>
        </div>
      </div>
    </>
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

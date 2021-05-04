import React, { useEffect, useRef, useMemo, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Fade from '@material-ui/core/Fade';

const FADE_TIMEOUT = 500;

const useStyles = makeStyles({
  container: {
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  precursor: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: '0',
    bottom: '0',
  },
  fadeWrapper: {
    width: '100%',
    height: '100%',
  },
  contentWrapper: {
    position: 'relative',
  },
});

export default function CrossFade({ children, uniqKey }) {
  const classes = useStyles();
  const [precursorAllowed, setPrecursorAllowed] = useState(false);

  const precursor = useDebouncedPrevious(children, { uniqKey });
  const key = useMemo(() => uniqKey || String(Math.random()), [
    children,
    uniqKey,
  ]);

  const precursorVisible =
    precursorAllowed &&
    Boolean(children && precursor) &&
    precursor !== children;

  return (
    <div className={classes.container}>
      {precursorVisible && <div className={classes.precursor}>{precursor}</div>}
      <Fade
        onEntering={() => setPrecursorAllowed(true)}
        onEntered={() => setPrecursorAllowed(false)}
        className={classes.fadeWrapper}
        key={key}
        in={Boolean(children)}
        timeout={FADE_TIMEOUT}
      >
        <div className={classes.contentWrapper}>{children}</div>
      </Fade>
    </div>
  );
}

function useDebouncedPrevious(value, { uniqKey, timeout = 100 } = {}) {
  const previousRef = useRef();
  useEffect(
    () => {
      const timeoutId = setTimeout(() => {
        previousRef.current = value;
      }, timeout);
      return () => clearTimeout(timeoutId);
    },
    [value, uniqKey],
  );
  return previousRef.current;
}

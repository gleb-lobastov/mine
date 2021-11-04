import React, { createContext, useContext, useEffect, useState } from 'react';
import throttle from 'lodash/throttle';

const LayoutContext = createContext(measure());

const LAYOUT_CONTEXT_UPDATE_DELAY = 125;

export default function LayoutContextProvider({ children }) {
  const [layoutContext, setLayoutContext] = useState(measure);

  useEffect(() => {
    const handler = throttle(handleResize, LAYOUT_CONTEXT_UPDATE_DELAY);
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('scroll', handler);

    function handleResize() {
      setLayoutContext(measure());
    }
  });

  return (
    <LayoutContext.Provider value={layoutContext}>
      {children}
    </LayoutContext.Provider>
  );
}

export function useLayoutContext() {
  return useContext(LayoutContext);
}

function measure() {
  return {
    vw:
      Math.max(
        document.documentElement.clientWidth || 0,
        window.innerWidth || 0,
      ) / 100,
    vh:
      Math.max(
        document.documentElement.clientHeight || 0,
        window.innerHeight || 0,
      ) / 100,
  };
}

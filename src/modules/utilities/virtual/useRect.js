import React, { useLayoutEffect, useEffect } from 'react';

export default function useWindowRect() {
  const [rect, dispatch] = React.useReducer(rectReducer, {});
  useLayoutEffect(() => {
    dispatch({
      rect: {
        height: window.innerHeight,
        width: window.innerWidth,
      },
    });
  }, []);

  useEffect(() => {
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
  const { rect } = action;
  if (!state || state.height !== rect.height || state.width !== rect.width) {
    return rect;
  }
  return state;
}

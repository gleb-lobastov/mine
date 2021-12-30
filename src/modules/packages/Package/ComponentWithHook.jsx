import React, { useEffect } from 'react';

function ComponentWithHook({
  Component,
  actualPath,
  routerProps,
  layoutProps,
  setLayoutProps,
}) {
  useEffect(
    () => {
      setLayoutProps({ ...layoutProps, routerProps, actualPath });
    },
    [actualPath],
  );
  return <Component {...routerProps} />;
}

ComponentWithHook.defaultProps = {};

export default ComponentWithHook;

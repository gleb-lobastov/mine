import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

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

ComponentWithHook.propTypes = {
  Component: PropTypes.func.isRequired,
  actualPath: PropTypes.string.isRequired,
  setLayoutProps: PropTypes.func.isRequired,
};

ComponentWithHook.defaultProps = {};

export default ComponentWithHook;

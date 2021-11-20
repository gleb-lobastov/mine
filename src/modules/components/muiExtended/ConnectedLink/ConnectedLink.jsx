import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import MUILink from '@material-ui/core/Link';
import { Typography } from '@material-ui/core';

export default function ConnectedLink({
  optional,
  children,
  ...forwardingProps
}) {
  const linkable = Boolean(
    !optional ||
      forwardingProps.href ||
      forwardingProps.to ||
      forwardingProps.onClick,
  );

  if (!linkable) {
    return <Typography {...forwardingProps}>{children}</Typography>;
  }

  return (
    <MUILink {...forwardingProps} component={RouterLink}>
      {children}
    </MUILink>
  );
}

ConnectedLink.defaultProps = {
  optional: false,
};

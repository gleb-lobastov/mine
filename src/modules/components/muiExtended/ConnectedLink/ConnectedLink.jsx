import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import MUILink from '@material-ui/core/Link';

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
    return children;
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

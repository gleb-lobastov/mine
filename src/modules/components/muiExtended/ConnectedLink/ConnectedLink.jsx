import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import MUILink from '@material-ui/core/Link';

export default function ConnectedLink(props) {
  return <MUILink {...props} component={RouterLink} />;
}

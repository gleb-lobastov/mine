import React from 'react';
import Typography from '@material-ui/core/Typography';

export default function Location({ location: { locationName } = {} }) {
  return <Typography>{locationName}</Typography>;
}

import React from 'react';
import Typography from '@material-ui/core/Typography';

export default function LocationInfo({
  children,
  location: { locationName } = {},
}) {
  return (
    <Typography>
      {locationName} {children}
    </Typography>
  );
}

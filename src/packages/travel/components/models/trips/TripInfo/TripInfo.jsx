import React from 'react';
import Typography from '@material-ui/core/Typography';

export default function TripInfo({
  trip: { tripName } = {},
  children,
  className,
}) {
  return (
    <Typography variant="h4" className={className} paragraph={true}>
      <span>{tripName}</span>
      {children}
    </Typography>
  );
}

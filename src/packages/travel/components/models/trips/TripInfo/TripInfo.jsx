import React from 'react';
import Typography from '@material-ui/core/Typography';
import { resolveTripCaption } from 'travel/models/trips/utils';

export default function TripInfo({
  trip,
  visitsDict,
  countriesDict,
  locationsDict,
  children,
  className,
}) {
  return (
    <Typography variant="h4" className={className} paragraph={true}>
      <span>
        {resolveTripCaption(trip, visitsDict, countriesDict, locationsDict)}
      </span>
      {children}
    </Typography>
  );
}

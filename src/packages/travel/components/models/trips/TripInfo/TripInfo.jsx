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
  variant,
}) {
  return (
    <Typography
      variant={variant ?? undefined}
      className={className}
      paragraph={true}
    >
      <span>
        {resolveTripCaption(trip, visitsDict, countriesDict, locationsDict)}
      </span>
      {children}
    </Typography>
  );
}

TripInfo.defaultProps = { variant: 'h4' };

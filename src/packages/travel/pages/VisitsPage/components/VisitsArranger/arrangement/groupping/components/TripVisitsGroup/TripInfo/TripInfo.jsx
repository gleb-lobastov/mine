import React from 'react';
import cls from 'classnames';
import Typography from '@material-ui/core/Typography';
import { resolveTripCaption } from 'travel/models/trips/utils';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import { useVisibleOnHoverStyles } from 'modules/utilities/hooks/makeVisibleOnlyOnHoverStyles';

export default function TripInfo({
  trip,
  visitsDict,
  countriesDict,
  locationsDict,
  children,
  className,
  variant,
  urls,
}) {
  const { hoverTrigger, visibleOnHover } = useVisibleOnHoverStyles();
  const tripEditUrl = urls?.resolveTripEditUrl({ tripId: trip.tripId });

  return (
    <Typography
      variant={variant ?? undefined}
      className={cls(className, hoverTrigger)}
      paragraph={true}
    >
      <span>
        {resolveTripCaption(trip, visitsDict, countriesDict, locationsDict)}
      </span>
      {children}
      {tripEditUrl && (
        <IconButton className={visibleOnHover} href={tripEditUrl}>
          <EditIcon />
        </IconButton>
      )}
    </Typography>
  );
}

TripInfo.defaultProps = { variant: 'h4' };

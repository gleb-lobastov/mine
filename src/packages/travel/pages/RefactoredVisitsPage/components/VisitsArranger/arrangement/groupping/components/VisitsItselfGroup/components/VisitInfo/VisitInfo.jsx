import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { visitDateTimePeriodToString } from 'modules/utilities/dateTime/dateTimePeriodToString';
import LocationWithRideInfo from '../LocationWithRideInfo';

const useStyles = makeStyles({
  detail: {
    color: 'gray',
    fontSize: 12,
  },
});

export default function VisitInfo({
  visit: { visitId, locationId, departureRideId },
  provision,
  provision: { visitsDict },
  isObscure,
  groupCountryId,
  className,
}) {
  const classes = useStyles();

  return (
    <LocationWithRideInfo
      className={className}
      locationId={locationId}
      rideId={departureRideId}
      provision={provision}
      groupCountryId={groupCountryId}
    >
      <Typography className={classes.detail}>
        {visitDateTimePeriodToString(visitsDict[visitId], isObscure)}
      </Typography>
    </LocationWithRideInfo>
  );
}

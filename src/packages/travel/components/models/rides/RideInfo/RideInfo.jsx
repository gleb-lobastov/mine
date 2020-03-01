import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import HichHikingIcon from '@material-ui/icons/ThumbUp';
import { rideDateTimePeriodToString } from 'modules/utilities/dateTime/dateTimePeriodToString';
import { RIDE_TYPES } from 'travel/models/rides/consts';
import RideIcon from 'travel/components/models/rides/RideIcon';

const useStyles = makeStyles({
  icon: { color: 'gray', fontSize: 16, height: 16 },
  absoluteIcon: {
    // todo fast decision, need refactor
    color: 'gray',
    fontSize: 16,
    height: 16,
    position: 'absolute',
  },
  detail: { color: 'gray', fontSize: 12 },
});

export default function RideInfo({
  ride,
  ride: { rideType } = {},
  className,
  isLong,
}) {
  const classes = useStyles();

  if (!ride) {
    return null;
  }

  return (
    <div className={className}>
      <RideIcon ride={ride} className={classes.icon} />
      {rideType === RIDE_TYPES.HITCH_HIKING && (
        <HichHikingIcon className={classes.absoluteIcon} />
      )}
      {isLong && rideDateTimePeriodToString(ride)}
    </div>
  );
}

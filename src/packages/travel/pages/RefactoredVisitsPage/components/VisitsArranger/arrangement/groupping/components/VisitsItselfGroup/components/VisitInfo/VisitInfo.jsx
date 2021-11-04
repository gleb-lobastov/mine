import React from 'react';
import cls from 'classnames';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { visitDateTimePeriodToString } from 'modules/utilities/dateTime/dateTimePeriodToString';
import LocationWithRideInfo from '../LocationWithRideInfo';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import { useVisibleOnHoverStyles } from 'modules/utilities/hooks/makeVisibleOnlyOnHoverStyles';

const useStyles = makeStyles({
  detail: {
    color: 'gray',
    fontSize: 12,
  },
  editButton: {
    position: 'absolute',
    marginTop: '-15px',
  },
});

export default function VisitInfo({
  visit: { visitId, locationId, departureRideId },
  provision,
  provision: { visitsDict },
  urls,
  isObscure,
  groupCountryId,
  className,
}) {
  const classes = useStyles();
  const { hoverTrigger, visibleOnHover } = useVisibleOnHoverStyles();

  const visitEditUrl = urls?.resolveVisitEditUrl({ visitId });
  return (
    <LocationWithRideInfo
      className={cls(className, hoverTrigger)}
      locationId={locationId}
      rideId={departureRideId}
      provision={provision}
      groupCountryId={groupCountryId}
      editButton={
        visitEditUrl && (
          <IconButton
            className={cls(classes.editButton, visibleOnHover)}
            href={visitEditUrl}
          >
            <EditIcon />
          </IconButton>
        )
      }
    >
      <Typography className={classes.detail}>
        {visitDateTimePeriodToString(visitsDict[visitId], isObscure)}
      </Typography>
    </LocationWithRideInfo>
  );
}

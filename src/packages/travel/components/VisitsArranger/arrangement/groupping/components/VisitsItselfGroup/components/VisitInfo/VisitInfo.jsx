import React from 'react';
import cls from 'classnames';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import EventIcon from '@material-ui/icons/Event';
import { visitDateTimePeriodToString } from 'modules/utilities/dateTime/dateTimePeriodToString';
import LocationWithRideInfo from '../LocationWithRideInfo';
import { useVisibleOnHoverStyles } from 'modules/utilities/hooks/makeVisibleOnlyOnHoverStyles';

const useStyles = makeStyles({
  locationContainer: {
    position: 'relative',
  },
  detail: {
    color: 'gray',
    fontSize: 12,
  },
  editButton: {
    position: 'absolute',
    top: '-50%',
    left: '100%',
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

  const visitUrl = urls?.resolveVisitUrl({ visitId });
  return (
    <LocationWithRideInfo
      className={cls(className, hoverTrigger)}
      classes={{ locationContainer: classes.locationContainer }}
      locationId={locationId}
      rideId={departureRideId}
      provision={provision}
      groupCountryId={groupCountryId}
      urls={urls}
      locationInfoChildren={
        visitUrl && (
          <IconButton
            className={cls(classes.editButton, visibleOnHover)}
            component={Link}
            to={visitUrl}
          >
            <EventIcon />
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

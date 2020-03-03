import React from 'react';
import PropTypes from 'prop-types';
import cls from 'classnames';
import { makeStyles } from '@material-ui/core/styles';
import { rideDateTimePeriodToString } from 'modules/utilities/dateTime/dateTimePeriodToString';
import ridePropTypes from 'travel/models/rides/propTypes';
import RideIcon from 'travel/components/models/rides/RideIcon';
import Actions from 'travel/components/common/Actions';
import { DIALOG_NAMES } from '../../../../../useTripEditPageDialogsState';

export const useStyles = makeStyles({
  container: {
    '&:hover $visibleOnHover': {
      visibility: 'visible',
    },
  },
  icon: {
    marginRight: '4px',
    display: 'inline-block',
    verticalAlign: 'text-bottom',
  },
  details: {
    marginRight: '4px',
  },
  visibleOnHover: {
    visibility: 'hidden',
  },
});

const Ride = ({ className, ride, showDialog }) => {
  const classes = useStyles();
  const { rideId, arrivalDateTime, departureDateTime } = ride || {};
  const isRideExists = Boolean(rideId);

  return (
    <div className={cls(className, classes.container)}>
      {isRideExists && (
        <>
          <RideIcon ride={ride} className={classes.icon} />
          <span className={classes.details}>
            {rideDateTimePeriodToString({ departureDateTime, arrivalDateTime })}
          </span>
        </>
      )}
      <Actions
        className={cls({
          [classes.visibleOnHover]: isRideExists,
        })}
        isEntityExist={isRideExists}
        onCreateClick={() => showDialog(DIALOG_NAMES.RIDE_CREATE)}
        onEditClick={() => showDialog(DIALOG_NAMES.RIDE_EDIT, rideId)}
      />
    </div>
  );
};

Ride.propTypes = {
  className: PropTypes.string,
  ride: PropTypes.shape(ridePropTypes),
};

Ride.defaultProps = {
  className: undefined,
  ride: {},
};

export default Ride;

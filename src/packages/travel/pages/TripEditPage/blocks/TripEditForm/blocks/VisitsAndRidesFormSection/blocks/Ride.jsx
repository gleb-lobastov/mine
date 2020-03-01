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

const Ride = ({ className, formRide, showDialog }) => {
  const classes = useStyles();
  const { rideId, arrivalDateTime, departureDateTime } = formRide || {};
  const isRideExists = Boolean(rideId);

  return (
    <div className={cls(className, classes.container)}>
      {isRideExists && (
        <>
          <RideIcon ride={formRide} className={classes.icon} />
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
        onDeleteClick={() => showDialog(DIALOG_NAMES.RIDE_DELETE, rideId)}
      />
    </div>
  );
};

Ride.propTypes = {
  className: PropTypes.string,
  formRide: PropTypes.shape(ridePropTypes),
};

Ride.defaultProps = {
  className: undefined,
  formRide: {},
};

export default Ride;

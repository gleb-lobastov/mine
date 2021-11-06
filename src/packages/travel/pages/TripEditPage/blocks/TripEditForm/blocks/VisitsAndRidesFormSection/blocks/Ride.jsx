import React from 'react';
import PropTypes from 'prop-types';
import cls from 'classnames';
import { makeStyles } from '@material-ui/core/styles';
import { rideDateTimePeriodToString } from 'modules/utilities/dateTime/dateTimePeriodToString';
import ridePropTypes from 'travel/models/rides/propTypes';
import RideIcon from 'travel/components/RideIcon';
import Actions from 'travel/components/Actions';
import { DIALOG_NAMES } from '../../../../../useTripEditPageDialogs';
import * as locators from '../../../../../locators';

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
    <div
      className={cls(className, classes.container)}
      data-locator={locators.RIDE_BLOCK}
    >
      {isRideExists && (
        <>
          <RideIcon ride={ride} className={classes.icon} />
          <span className={classes.details}>
            {rideDateTimePeriodToString({ departureDateTime, arrivalDateTime })}
          </span>
        </>
      )}
      <Actions
        data-locator={locators.RIDE_ACTIONS}
        className={cls({
          [classes.visibleOnHover]: isRideExists,
        })}
        isEntityExist={isRideExists}
        onCreateClick={() => showDialog(DIALOG_NAMES.RIDE_CREATE)}
        onEditClick={() => showDialog(DIALOG_NAMES.RIDE_EDIT, ride)}
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

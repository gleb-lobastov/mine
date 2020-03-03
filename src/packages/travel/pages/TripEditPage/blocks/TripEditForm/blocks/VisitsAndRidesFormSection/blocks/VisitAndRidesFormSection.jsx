import React from 'react';
import PropTypes from 'prop-types';
import cls from 'classnames';
import { makeStyles } from '@material-ui/core/styles';
import Visit from './Visit';
import Ride from './Ride';

const useStyles = makeStyles({
  alwaysVisible: {},
  container: {
    margin: '12px 0',
    cursor: 'grab',
    background: '#fff',
    padding: '12px',
    border: '1px solid #ccc',
    boxShadow: '0 2px 8px 0 rgba(0, 0, 0, 0.1), 0 0 1px 0 rgba(0, 0, 0, 0.2)',
    position: 'relative',
    '&:hover $editDialogTrigger': {
      visibility: 'visible',
    },
    '&:hover $visibleOnlyOnHover': {
      visibility: 'visible',
    },
  },
  editDialogTrigger: {
    marginLeft: '4px',
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    display: 'inline-block',
    visibility: 'hidden',
  },
  visibleOnlyOnHover: {
    visibility: 'hidden',
  },
  ride: {
    // display: 'none',
  },
  warning: {
    color: 'red',
  },
});

export default function VisitAndRidesFormSection({
  style,
  className,
  visit,
  showDialog,
  isArrivalRideMatch,
  isDepartureRideMatch,
  formikProps,
  provision,
}) {
  const classes = useStyles();

  const { ridesDict } = provision;

  const {
    visitId,
    arrivalRideId: formArrivalRideId,
    departureRideId: formDepartureVisitId,
  } = visit || {};

  return (
    <div
      className={cls(classes.container, className)}
      style={style}
      data-sort-handler="enabled"
    >
      <Ride
        showDialog={(dialogName, rideId) =>
          showDialog(dialogName, rideId, { arrivalVisitId: visitId })
        }
        className={cls(classes.ride, {
          [classes.warning]: !isArrivalRideMatch,
        })}
        ride={ridesDict[formArrivalRideId]}
        formikProps={formikProps}
        provision={provision}
      />
      <Visit
        showDialog={showDialog}
        classes={{ editIcon: classes.visibleOnlyOnHover }}
        visit={visit}
        formikProps={formikProps}
        provision={provision}
      />
      <Ride
        showDialog={(dialogName, rideId) =>
          showDialog(dialogName, rideId, { departureVisitId: visitId })
        }
        visitId={visitId}
        className={cls(classes.ride, {
          [classes.warning]: !isDepartureRideMatch,
        })}
        ride={ridesDict[formDepartureVisitId]}
        formikProps={formikProps}
        provision={provision}
      />
    </div>
  );
}

VisitAndRidesFormSection.propTypes = {};

VisitAndRidesFormSection.defaultProps = {};

import React from 'react';
import PropTypes from 'prop-types';
import cls from 'classnames';
import { makeStyles } from '@material-ui/core/styles';
import checkIsVisitsConnectedByRide from 'travel/utils/checkIsVisitsConnectedByRide';
import Visit from 'travel/components/models/visits/Visit';
import Ride from '../../Ride';

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

export default function VisiAndRidesFormSection({
  visitsFormValues,
  visitFormValues,
  prevVisitFormValues,
  nextVisitFormValues,
  formikProps,
  provision,
}) {
  const classes = useStyles();

  const { ridesDict } = provision;
  const { visitId, arrivalRideId, departureRideId } = visitFormValues || {};
  const { visitId: prevVisitId } = prevVisitFormValues || {};
  const { visitId: nextVisitId } = nextVisitFormValues || {};

  const isArrivalRideMatch = checkIsVisitsConnectedByRide(
    prevVisitFormValues,
    visitFormValues,
  );
  const isDepartureRideMatch = checkIsVisitsConnectedByRide(
    visitFormValues,
    nextVisitFormValues,
  );

  return (
    <div className={classes.container} data-sort-handler="enabled">
      <Ride
        formikProps={formikProps}
        provision={provision}
        defaultDepartureVisitId={prevVisitId}
        defaultArrivalVisitId={visitId}
        visitId={visitId}
        className={cls(classes.ride, {
          [classes.warning]: !isArrivalRideMatch,
        })}
        ride={ridesDict[arrivalRideId]}
      />
      <Visit
        formikProps={formikProps}
        provision={provision}
        classes={{ editIcon: classes.visibleOnlyOnHover }}
        visit={visitFormValues}
      />
      <Ride
        formikProps={formikProps}
        provision={provision}
        className={cls(classes.ride, {
          [classes.warning]: !isDepartureRideMatch,
        })}
        ride={ridesDict[departureRideId]}
        availableVisits={visitsFormValues}
        defaultDepartureVisitId={visitId}
        defaultArrivalVisitId={nextVisitId}
      />
    </div>
  );
}

VisiAndRidesFormSection.propTypes = {};

VisiAndRidesFormSection.defaultProps = {};

import React from 'react';
import PropTypes from 'prop-types';
import cls from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Path from 'modules/utilities/routing/Path';
import locationsPropTypes from 'travel/models/locations/propTypes';
import ridePropTypes from 'travel/models/rides/propTypes';
import visitPropTypes from 'travel/models/visits/propTypes';
import Visit from 'travel/components/models/visits/Visit';
import Ride from './Ride';
import DragHandler from './DragHandler';

const styles = {
  alwaysVisible: {},
  container: {
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
};

const VisitWithRides = ({
  visit,
  visit: { visitId, arrivalRideId, departureRideId } = {},
  ridesDict,
  classes,
  prevVisitId,
  nextVisitId,
  tripVisitsList,
  isArrivalRideMatch,
  isDepartureRideMatch,
  onRideUpdate: handleRideUpdate,
  onVisitUpdate: handleVisitUpdate,
  originLocation,
}) => {
  const shouldWarnForArrivalRide = !isArrivalRideMatch;
  const shouldWarnForDepartureRide = !isDepartureRideMatch;

  return (
    <div className={classes.container}>
      <Ride
        availableVisits={tripVisitsList}
        defaultDepartureVisitId={prevVisitId}
        defaultArrivalVisitId={visitId}
        visitId={visitId}
        className={cls(classes.ride, {
          [classes.alwaysVisible]: true,
          [classes.warning]: shouldWarnForArrivalRide,
        })}
        ride={ridesDict[arrivalRideId]}
        onRideUpdate={handleRideUpdate}
        originLocation={originLocation}
      />
      <Visit
        classes={{ editIcon: classes.visibleOnlyOnHover }}
        onVisitUpdate={handleVisitUpdate}
        visit={visit}
      />
      <Ride
        className={cls(classes.ride, {
          [classes.alwaysVisible]: true,
          [classes.warning]: shouldWarnForDepartureRide,
        })}
        ride={ridesDict[departureRideId]}
        availableVisits={tripVisitsList}
        defaultDepartureVisitId={visitId}
        defaultArrivalVisitId={nextVisitId}
        isEditable={!isDepartureRideMatch}
        onRideUpdate={handleRideUpdate}
        originLocation={originLocation}
      />
      <DragHandler className={classes.visibleOnlyOnHover} />
    </div>
  );
};

VisitWithRides.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  isArrivalRideMatch: PropTypes.bool,
  isDepartureRideMatch: PropTypes.bool,
  nextVisitId: PropTypes.number,
  onRideUpdate: PropTypes.func.isRequired,
  onVisitUpdate: PropTypes.func.isRequired,
  originLocation: PropTypes.shape(locationsPropTypes).isRequired,
  prevVisitId: PropTypes.number,
  ridesDict: PropTypes.objectOf(PropTypes.shape(ridePropTypes)).isRequired,
  tripVisitsList: PropTypes.arrayOf(PropTypes.shape(visitPropTypes)),
  visit: PropTypes.shape(visitPropTypes).isRequired,
};

VisitWithRides.defaultProps = {
  isArrivalRideMatch: true,
  isDepartureRideMatch: true,
  nextVisitId: null,
  prevVisitId: null,
  tripVisitsList: [],
};

export default withStyles(styles)(VisitWithRides);

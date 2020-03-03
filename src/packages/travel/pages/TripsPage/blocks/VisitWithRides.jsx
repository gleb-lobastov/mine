import React from 'react';
import PropTypes from 'prop-types';
import cls from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Path from 'modules/utilities/routing/Path';
import ridePropTypes from 'travel/models/rides/propTypes';
import visitPropTypes from 'travel/models/visits/propTypes';
import VisitInfo from 'travel/components/models/visits/VisitInfo';
import Ride from './Ride';

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
  isEditable,
  isArrivalRideMatch,
  isDepartureRideMatch,
  locationsPath,
}) => {
  const shouldWarnForArrivalRide = isEditable && !isArrivalRideMatch;
  const shouldWarnForDepartureRide = isEditable && !isDepartureRideMatch;

  return (
    <div className={classes.container}>
      <Ride
        visitId={visitId}
        className={cls(classes.ride, {
          [classes.alwaysVisible]: !isDepartureRideMatch,
          [classes.warning]: shouldWarnForArrivalRide,
        })}
        ride={ridesDict[arrivalRideId]}
        showDetails={shouldWarnForArrivalRide}
      />
      <VisitInfo
        classes={{ editIcon: classes.visibleOnlyOnHover }}
        visit={visit}
        locationsPath={locationsPath}
      />
      {!isDepartureRideMatch && (
        <Ride
          className={cls(classes.ride, {
            [classes.alwaysVisible]: !isDepartureRideMatch,
            [classes.warning]: shouldWarnForDepartureRide,
          })}
          ride={ridesDict[departureRideId]}
          showDetails={shouldWarnForDepartureRide}
        />
      )}
    </div>
  );
};

VisitWithRides.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  isArrivalRideMatch: PropTypes.bool,
  isDepartureRideMatch: PropTypes.bool,
  isEditable: PropTypes.bool,
  ridesDict: PropTypes.objectOf(PropTypes.shape(ridePropTypes)).isRequired,
  visit: PropTypes.shape(visitPropTypes).isRequired,
  locationsPath: PropTypes.instanceOf(Path).isRequired,
};

VisitWithRides.defaultProps = {
  isArrivalRideMatch: true,
  isDepartureRideMatch: true,
  isEditable: false,
  tripVisitsList: [],
};

export default withStyles(styles)(VisitWithRides);

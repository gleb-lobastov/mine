import React from 'react';
import PropTypes from 'prop-types';
import cls from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import LocationCityIcon from '@material-ui/icons/LocationCity';
import TransferWithinAStationIcon from '@material-ui/icons/TransferWithinAStation';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import DomainIcon from '@material-ui/icons/Domain';
import Location from './Location';
import Ride from './Ride';
import RideInputDialog from './RideInputDialog';

const styles = {
  editDialogTrigger: {
    marginLeft: '4px',
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    display: 'inline-block',
    visibility: 'hidden',
  },
  container: {
    position: 'relative',
    '&:hover $editDialogTrigger': {
      visibility: 'visible',
    },
  },
  warning: {
    color: 'red',
  },
};

const resolveVisitIconComponent = visitType => {
  switch (visitType) {
    case 'Transit':
      return TransferWithinAStationIcon;
    case 'BaseCamp':
      return DomainIcon;
    case 'Relocation':
      return LocalShippingIcon;
    case 'Regular':
    default:
      return LocationCityIcon;
  }
};

const Visit = ({
  visit,
  visit: {
    visitId,
    locationId,
    visitType,
    arrivalRideId,
    departureRideId,
  } = {},
  ridesDict,
  locationsDict,
  classes,
  isEditable,
  isSorting,
  isArrivalRideMatch,
  isDepartureRideMatch,
  onRideUpdate: handleRideUpdate,
}) => {
  const shouldWarnForArrivalRide = isEditable && !isArrivalRideMatch;
  const shouldWarnForDepartureRide = isEditable && !isDepartureRideMatch;
  return (
    <div className={classes.container}>
      <Ride
        className={cls({
          [classes.warning]: shouldWarnForArrivalRide,
        })}
        ride={ridesDict[arrivalRideId]}
        showDetails={isSorting || shouldWarnForArrivalRide}
      />
      <Location
        location={locationsDict[locationId]}
        Icon={resolveVisitIconComponent(visitType)}
      />
      {(isSorting || !isDepartureRideMatch) && (
        <Ride
          className={cls({
            [classes.warning]: shouldWarnForDepartureRide,
          })}
          ride={ridesDict[departureRideId]}
          showDetails={isSorting || shouldWarnForDepartureRide}
        />
      )}
      {isEditable && (
        <RideInputDialog
          visit={visit}
          ridesDict={ridesDict}
          className={classes.editDialogTrigger}
          onSubmit={({ arrivalRide, departureRide }) =>
            Promise.all([
              handleRideUpdate({
                ride: arrivalRide,
                visitId,
                isArrivalToVisit: true,
              }),
              handleRideUpdate({
                ride: departureRide,
                visitId,
                isArrivalToVisit: false,
              }),
            ])
          }
        />
      )}
    </div>
  );
};

Visit.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  isEditable: PropTypes.bool,
  isArrivalRideMatch: PropTypes.bool,
  isDepartureRideMatch: PropTypes.bool,
  isSorting: PropTypes.bool,
  onRideUpdate: PropTypes.func.isRequired,
  visit: PropTypes.shape({
    tripId: PropTypes.number,
    orderInTrip: PropTypes.number,
  }).isRequired,
  locationsDict: PropTypes.objectOf(
    PropTypes.shape({
      locationId: PropTypes.number,
      locationName: PropTypes.string,
    }),
  ).isRequired,
  ridesDict: PropTypes.objectOf(
    PropTypes.shape({
      rideId: PropTypes.number,
    }),
  ).isRequired,
};

Visit.defaultProps = {
  isEditable: false,
  isArrivalRideMatch: true,
  isDepartureRideMatch: true,
  isSorting: false,
};

export default withStyles(styles)(Visit);

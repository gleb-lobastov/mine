import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import LocationCityIcon from '@material-ui/icons/LocationCity';
import TransferWithinAStationIcon from '@material-ui/icons/TransferWithinAStation';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import DomainIcon from '@material-ui/icons/Domain';
import EditIcon from '@material-ui/icons/Edit';
import Location from './Location';
import Ride from './Ride';

const styles = {
  button: {
    marginLeft: '4px',
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    visibility: 'hidden',
  },
  container: {
    position: 'relative',
    '&:hover $button': {
      visibility: 'visible',
    },
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
  visit: { locationId, visitType, arrivalRideId, departureRideId } = {},
  ridesDict,
  locationsDict,
  classes,
  isEditable,
  isSorting,
}) => {
  const [isInEditMode, setEditMode] = useState(false);
  const toggleEditMode = useCallback(() => setEditMode(!isInEditMode), [
    setEditMode,
    isInEditMode,
  ]);
  return (
    <div className={classes.container}>
      <Ride ride={ridesDict[arrivalRideId]} />
      <Location
        location={locationsDict[locationId]}
        Icon={resolveVisitIconComponent(visitType)}
      />
      {isEditable &&
        !isInEditMode && (
          <IconButton
            onClick={toggleEditMode}
            data-sort-handler="disabled"
            size="small"
            color="primary"
            className={classes.button}
            aria-label="Edit visit details"
          >
            <EditIcon />
          </IconButton>
        )}
      {isSorting && <Ride ride={ridesDict[departureRideId]} />}
    </div>
  );
};

Visit.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  isEditable: PropTypes.bool,
  isSorting: PropTypes.bool,
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

Visit.defaultProps = { isEditable: false, isSorting: false };

export default withStyles(styles)(Visit);

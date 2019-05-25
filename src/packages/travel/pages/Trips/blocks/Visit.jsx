import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import LocationCityIcon from '@material-ui/icons/LocationCity';
import TransferWithinAStationIcon from '@material-ui/icons/TransferWithinAStation';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import DomainIcon from '@material-ui/icons/Domain';
import EditIcon from '@material-ui/icons/Edit';
import Location, { styles as locationStyles } from './Location';

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
  visit: { locationId, visitType } = {},
  locationsDict,
  classes,
  isEditable,
}) => {
  const [isInEditMode, setEditMode] = useState(false);
  const toggleEditMode = useCallback(() => setEditMode(!isInEditMode), [
    setEditMode,
    isInEditMode,
  ]);
  return (
    <div className={classes.container}>
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
      {isInEditMode && <div>Work in progress</div>}
    </div>
  );
};

Visit.propTypes = {
  isEditable: PropTypes.bool,
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
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
};

Visit.defaultProps = { isEditable: false };

export default withStyles(styles)(Visit);

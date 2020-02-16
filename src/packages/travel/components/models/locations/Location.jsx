import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Path from 'modules/utilities/routing/Path';
import reactComponentPropType from 'modules/customPropTypes/reactComponentPropType';
import locationPropTypes from 'travel/models/locations/propTypes';

export const styles = {
  container: {
    display: 'inline-block',
    marginRight: '4px',
  },
  icon: {
    marginRight: '4px',
    display: 'inline-block',
    verticalAlign: 'text-bottom',
  },
};

const Location = ({
  location: { locationId, locationName = 'unknown' },
  locationsPath,
  Icon,
  classes,
}) => {
  const locationNode = locationsPath ? (
    <Link to={locationsPath.toUrl({ strLocationId: String(locationId) })}>
      {locationName}
    </Link>
  ) : (
    locationName
  );
  return (
    <div className={classes.container}>
      {Icon && <Icon className={classes.icon} />}
      {locationNode}
    </div>
  );
};

Location.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  location: PropTypes.shape(locationPropTypes),
  Icon: reactComponentPropType,
  locationsPath: PropTypes.instanceOf(Path),
};

Location.defaultProps = {
  location: {},
  Icon: undefined,
  locationsPath: undefined,
};

export default withStyles(styles)(Location);

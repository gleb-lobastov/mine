import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
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
  location: { locationName = 'unknown' },
  Icon,
  classes,
}) => (
  <div className={classes.container}>
    {Icon && <Icon className={classes.icon} />}
    {locationName}
  </div>
);

Location.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  location: PropTypes.shape(locationPropTypes),
  Icon: reactComponentPropType,
};

Location.defaultProps = {
  location: {},
  Icon: undefined,
};

export default withStyles(styles)(Location);

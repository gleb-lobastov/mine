import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

export const styles = {
  container: {
    display: 'inline-block',
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
  location: PropTypes.shape({
    locationName: PropTypes.string,
  }),
  Icon: PropTypes.func,
};

Location.defaultProps = {
  location: {},
  Icon: undefined,
};

export default withStyles(styles)(Location);

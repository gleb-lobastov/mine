import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = {
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
  <div>
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

import React from 'react';
import PropTypes from 'prop-types';
import Hidden from '@material-ui/core/Hidden';
import useStyles from './useStyles';

export default function DesktopSidebarContainer({ children }) {
  const classes = useStyles();

  if (!children) {
    return null;
  }

  return (
    <nav className={classes.sidebar} aria-label="mailbox folders">
      <Hidden xsDown={true} implementation="css">
        {children}
      </Hidden>
    </nav>
  );
}

DesktopSidebarContainer.propTypes = {
  children: PropTypes.node,
};

DesktopSidebarContainer.defaultProps = {
  children: null,
};

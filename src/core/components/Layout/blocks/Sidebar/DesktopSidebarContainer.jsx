import React from 'react';
import Hidden from '@material-ui/core/Hidden';
import useStyles from './useStyles';

export default function DesktopSidebarContainer({ children }) {
  const classes = useStyles();

  if (!children) {
    return null;
  }

  return (
    <nav className={classes.sidebar} aria-label="mailbox folders">
      <Hidden xsDown={true} implementation="css" className={classes.sidebarContent}>
        {children}
      </Hidden>
    </nav>
  );
}

DesktopSidebarContainer.defaultProps = {
  children: null,
};

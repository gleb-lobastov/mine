import React from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import useStyles from './useStyles';

export default function MobileSidebarContainer({
  children,
  isSidebarOpen,
  onCloseSidebar,
}) {
  const theme = useTheme();
  const classes = useStyles();

  if (!children) {
    return null;
  }

  return (
    <nav className={classes.sidebar} aria-label="mailbox folders">
      <Hidden smUp={true} implementation="css">
        <Drawer
          variant="temporary"
          anchor={theme.direction === 'rtl' ? 'right' : 'left'}
          open={isSidebarOpen}
          onClose={onCloseSidebar}
          classes={{ paper: classes.drawerPaper }}
          ModalProps={{ keepMounted: true }}
        >
          {children}
        </Drawer>
      </Hidden>
    </nav>
  );
}

MobileSidebarContainer.propTypes = {
  children: PropTypes.node,
  isSidebarOpen: PropTypes.bool.isRequired,
  onCloseSidebar: PropTypes.func.isRequired,
};

MobileSidebarContainer.defaultProps = {
  children: null,
};

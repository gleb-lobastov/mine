import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import cls from 'classnames';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { useSidebarContent } from 'core/context/SidebarContext';
import { configureNavigation } from 'configuration';
import { usePackages } from 'modules/packages';
import Navigation from './blocks/Navigation';
import Footer from './blocks/Footer';
import {
  DesktopSidebarContainer,
  MobileSidebarContainer,
} from './blocks/Sidebar/index';
import PendingRequestsIndicator from './blocks/PendingRequestsIndicator';

const useStyles = makeStyles(theme => ({
  app: {
    fontFamily: "'Roboto', sans-serif",
    fontSize: '16px',
  },
  root: {},
  container: {
    display: 'flex',
  },
  content: {
    padding: theme.spacing(3),
    boxSizing: 'border-box',
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  statusBar: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
  },
  menuButton: {
    margin: '12px',
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
}));

export default function Layout({ children }) {
  const classes = useStyles();
  const packages = usePackages();
  const navigationConfig = useMemo(() => configureNavigation(packages), [
    packages,
  ]);
  const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const handleOpenMobileSidebar = () => setMobileSidebarOpen(true);
  const handleCloseMobileSidebar = () => setMobileSidebarOpen(false);

  const sidebarContentNode = useSidebarContent({
    closeSidebar: handleCloseMobileSidebar,
  });

  return (
    <div className={cls(classes.app, classes.root)}>
      <CssBaseline />
      <Helmet
        meta={[
          {
            name: 'viewport',
            content:
              'minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no',
          },
        ]}
        link={[
          {
            rel: 'stylesheet',
            href:
              'https://fonts.googleapis.com/css?family=Roboto:300,400,500&amp;subset=cyrillic',
          },
        ]}
      />
      <Navigation config={navigationConfig} className={classes.navigation}>
        <IconButton
          color="inherit"
          aria-label="open sidebar"
          edge="start"
          onClick={handleOpenMobileSidebar}
          className={classes.menuButton}
        >
          <MenuIcon />
        </IconButton>
      </Navigation>
      <div>
        <div className={classes.container}>
          <div className={classes.content}>{children}</div>
          <DesktopSidebarContainer>
            {sidebarContentNode}
          </DesktopSidebarContainer>
        </div>
        <Footer className={classes.footer} />
        <div className={classes.statusBar}>
          <PendingRequestsIndicator />
        </div>
      </div>
      <MobileSidebarContainer
        isSidebarOpen={isMobileSidebarOpen}
        onCloseSidebar={handleCloseMobileSidebar}
      >
        {sidebarContentNode}
      </MobileSidebarContainer>
    </div>
  );
}

Layout.propTypes = {
  children: PropTypes.node,
};

Layout.defaultProps = {
  children: null,
};

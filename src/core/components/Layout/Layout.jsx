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
import ProvisionStatusIndicator from './blocks/ProvisionStatusIndicator';

const useStyles = makeStyles(theme => ({
  root: {
    fontFamily: "'Roboto', sans-serif",
    fontSize: '16px',
  },
  pageContainer: {
    minHeight: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  pageContent: {
    flexGrow: 1,
  },
  container: {
    display: 'flex',
  },
  content: {
    padding: ({ isResponsive }) => (isResponsive ? 0 : theme.spacing(3)),
    boxSizing: 'border-box',
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    position: 'relative',
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

export default function Layout({
  children,
  isResponsive,
  breadcrumbs,
  actualPath,
}) {
  const classes = useStyles({ isResponsive });
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
    <>
      <CssBaseline />
      <Helmet
        meta={[
          {
            name: 'viewport',
            content:
              'minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no',
          },
        ]}
      />
      <div className={cls(classes.root, classes.pageContainer)}>
        <Navigation
          config={navigationConfig}
          className={classes.navigation}
          breadcrumbs={breadcrumbs}
          actualPath={actualPath}
        >
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
        <div className={cls(classes.container, classes.pageContent)}>
          <div className={classes.content}>{children}</div>
          <DesktopSidebarContainer>
            {sidebarContentNode}
          </DesktopSidebarContainer>
        </div>
        <Footer className={classes.footer} />
      </div>
      <div className={classes.statusBar}>
        <ProvisionStatusIndicator />
      </div>
      <MobileSidebarContainer
        isSidebarOpen={isMobileSidebarOpen}
        onCloseSidebar={handleCloseMobileSidebar}
      >
        {sidebarContentNode}
      </MobileSidebarContainer>
    </>
  );
}

Layout.propTypes = {
  children: PropTypes.node,

  // eslint-disable-next-line react/forbid-prop-types
  breadcrumbs: PropTypes.any, // just forwarding to Navigation component
  actualPath: PropTypes.string.isRequired,
};

Layout.defaultProps = {
  children: null,
  breadcrumbs: [],
};

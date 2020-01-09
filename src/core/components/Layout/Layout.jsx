import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import 'normalize.css';
import { Helmet } from 'react-helmet';
import { makeStyles } from '@material-ui/core/styles';
import Navigation from './blocks/Navigation';
import Footer from './blocks/Footer';
import PendingRequestsIndicator from './blocks/PendingRequestsIndicator';
import { configureNavigation } from 'configuration';
import { usePackages } from 'modules/packages';

const useStyles = makeStyles(theme => ({
  app: {
    fontFamily: "'Roboto', sans-serif",
    fontSize: '16px',
  },
  content: {
    padding: '16px',
    boxSizing: 'border-box',
    flexGrow: 1,
    width: '100%',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  statusBar: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
  },
}));

export default function Layout({ children }) {
  const classes = useStyles();
  const packages = usePackages();
  const navigationConfig = useMemo(() => configureNavigation(packages), [
    packages,
  ]);
  return (
    <div className={classes.app}>
      <Helmet>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500&amp;subset=cyrillic"
        />
      </Helmet>
      <Navigation config={navigationConfig} />
      <div className={classes.content}>{children}</div>
      <Footer className={classes.footer} />
      <div className={classes.statusBar}>
        <PendingRequestsIndicator />
      </div>
    </div>
  );
}

Layout.propTypes = {
  children: PropTypes.node,
};

Layout.defaultProps = {
  children: null,
};

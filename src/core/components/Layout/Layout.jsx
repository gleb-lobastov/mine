import React from 'react';
import PropTypes from 'prop-types';
import 'normalize.css';
import { Helmet } from 'react-helmet';
import { makeStyles } from '@material-ui/core/styles';
import { withPackages } from 'core/context/AppContext';
import Navigation from './blocks/Navigation';
import Footer from './blocks/Footer';
import PendingRequestsIndicator from './blocks/PendingRequestsIndicator';

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
    backgroundColor: theme.palette.background.paper,
  },
  statusBar: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
  },
}));

function Layout({ packages, children }) {
  const classes = useStyles();
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
      <Navigation packages={packages} />
      <div className={classes.content}>{children}</div>
      <Footer className={classes.footer} />
      <div className={classes.statusBar}>
        <PendingRequestsIndicator />
      </div>
    </div>
  );
}

export default withPackages(Layout);

Layout.propTypes = {
  children: PropTypes.node,
  // eslint-disable-next-line react/forbid-prop-types
  packages: PropTypes.array.isRequired, // here relevant only that it is array
};

Layout.defaultProps = {
  children: null,
};

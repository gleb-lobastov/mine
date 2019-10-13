/* global __ROUTES_BASENAME__ */
import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import DateFnsUtils from '@date-io/date-fns';
import PlainLoader from 'modules/components/loaders/PlainLoader';
import AppContext, { configPropTypes } from '../../context/AppContext';
import AuthContext from '../../context/AuthContext';
import Layout from '../Layout';
import Router from '../Router';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#a7c0cd',
      main: '#78909c',
      dark: '#4b636e',
    },
    secondary: {
      light: '#fff64f',
      main: '#ffc400',
      dark: '#c79400',
    },
  },
});

const Root = ({ store, config, appId }) => (
  <Provider store={store} key={appId}>
    <BrowserRouter basename={__ROUTES_BASENAME__}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <ThemeProvider theme={theme}>
          <AppContext.Provider value={config}>
            <AuthContext.Provider value={config}>
              <Layout>
                <React.Suspense fallback={<PlainLoader />}>
                  <Router />
                </React.Suspense>
              </Layout>
            </AuthContext.Provider>
          </AppContext.Provider>
        </ThemeProvider>
      </MuiPickersUtilsProvider>
    </BrowserRouter>
  </Provider>
);

Root.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  store: PropTypes.object.isRequired,
  config: PropTypes.shape(configPropTypes).isRequired,
  appId: PropTypes.number.isRequired,
};

export default Root;

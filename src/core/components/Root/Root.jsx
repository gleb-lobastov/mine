/* global __ROUTES_BASENAME__ */
import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import DateFnsUtils from '@date-io/date-fns';
import { Packages } from 'modules/packages';
import { Main } from 'main';
import { Code } from 'code';
import { Literature } from 'literature';
import { Travel } from 'travel';
import { Auth } from 'auth';
import AppContext, { configPropTypes } from '../../context/AppContext';
import AuthContext from '../../context/AuthContext';
import Layout from '../Layout';
import ErrorBoundary from '../ErrorBoundary';

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
  <ErrorBoundary>
    <Provider store={store} key={appId}>
      <BrowserRouter basename={__ROUTES_BASENAME__}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <ThemeProvider theme={theme}>
            <AppContext.Provider value={config}>
              <AuthContext.Provider value={config}>
                <Packages Wrapper={Layout}>
                  <Auth mountPath="/auth" />
                  <Travel mountPath="/travel" />
                  <Literature mountPath="/liter" />
                  <Code mountPath="/code" />
                  <Main mountPath="/" />
                </Packages>
              </AuthContext.Provider>
            </AppContext.Provider>
          </ThemeProvider>
        </MuiPickersUtilsProvider>
      </BrowserRouter>
    </Provider>
  </ErrorBoundary>
);

Root.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  store: PropTypes.object.isRequired,
  config: PropTypes.shape(configPropTypes).isRequired,
  appId: PropTypes.number.isRequired,
};

export default Root;

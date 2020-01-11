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
import Main from 'packages/main';
import Code from 'packages/code';
import Literature from 'packages/literature';
import Travel from 'packages/travel';
import Auth from 'packages/auth';
import AuthContext from '../../context/AuthContext';
import Layout from '../Layout';
import ErrorBoundary from '../ErrorBoundary';
import { configPropTypes } from './propTypes';

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

const Root = ({
  store,
  config: {
    packages: { auth, travel, literature, code, main },
  },
  appId,
}) => (
  <ErrorBoundary>
    <Provider store={store} key={appId}>
      <BrowserRouter basename={__ROUTES_BASENAME__}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <ThemeProvider theme={theme}>
            <AuthContext.Provider>
              <Packages Wrapper={Layout}>
                {auth && <Auth mountPath={auth.mountPath} alias="auth" />}
                {travel && (
                  <Travel mountPath={travel.mountPath} alias="travel" />
                )}
                {literature && (
                  <Literature
                    mountPath={literature.mountPath}
                    alias="literature"
                  />
                )}
                {code && <Code mountPath={code.mountPath} alias="code" />}
                {main && <Main mountPath={main.mountPath} alias="main" />}
              </Packages>
            </AuthContext.Provider>
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

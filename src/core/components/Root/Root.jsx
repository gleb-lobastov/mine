/* global __ROUTES_BASENAME__ */
import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import PlainLoader from 'modules/components/loaders/PlainLoader';
import AppContext, { configPropTypes } from '../../context/AppContext';
import AuthContext from '../../context/AuthContext';
import Layout from '../Layout';
import Router from '../Router';

const Root = ({ store, config }) => (
  <Provider store={store}>
    <BrowserRouter basename={__ROUTES_BASENAME__}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <AppContext.Provider value={config}>
          <AuthContext.Provider value={config}>
            <Layout>
              <React.Suspense fallback={<PlainLoader />}>
                <Router />
              </React.Suspense>
            </Layout>
          </AuthContext.Provider>
        </AppContext.Provider>
      </MuiPickersUtilsProvider>
    </BrowserRouter>
  </Provider>
);

Root.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  store: PropTypes.object.isRequired,
  config: PropTypes.shape(configPropTypes).isRequired,
};

export default Root;

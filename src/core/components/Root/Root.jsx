/* global __ROUTES_BASENAME__ */
// import 'react-responsive-carousel/lib/styles/carousel.min.css';
import 'react-image-gallery/styles/css/image-gallery.css';
import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';
import DateFnsUtils from '@date-io/date-fns';
import {
  FeatureToggleProvider,
  FeatureTogglesWidget,
  useConfiguration,
} from 'modules/components/FeatureToggles';
import { Packages } from 'modules/packages';
import Main from 'packages/main';
import Code from 'packages/code';
import Literature from 'packages/literature';
import Travel from 'packages/travel';
import Auth from 'packages/auth';
import featuresConfig from '../../../features.json';
import AuthContext from '../../context/AuthContext';
import FilterContextProvider from '../../context/QueryFilterContext';
import SidebarContextProvider from '../../context/SidebarContext';
import { PreviewContextProvider } from '../../context/PreviewContext';
import Layout from '../Layout';
import ErrorBoundary from '../ErrorBoundary';
import { configPropTypes } from './propTypes';
import LayoutContextProvider from 'modules/components/LayoutContext';

const theme = responsiveFontSizes(
  createMuiTheme({
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
      error: {
        main: '#ff9494',
        dark: '#ED4337',
      },
      disabled: {
        main: '#999999',
        dark: '#5e5e5e',
      },
    },
  }),
);

const Root = ({
  store,
  config: {
    packages: { auth, travel, literature, code, main },
  },
  appId,
}) => {
  const { features, showFeaturesWidget } = useConfiguration(featuresConfig);

  return (
    <ErrorBoundary>
      <FeatureToggleProvider config={features}>
        <Provider store={store} key={appId}>
          <BrowserRouter basename={__ROUTES_BASENAME__}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <ThemeProvider theme={theme}>
                <FilterContextProvider>
                  <LayoutContextProvider>
                    <SidebarContextProvider>
                      <PreviewContextProvider>
                        <AuthContext.Provider>
                          <Packages Layout={Layout}>
                            {auth && (
                              <Auth mountPath={auth.mountPath} alias="auth" />
                            )}
                            {travel && (
                              <Travel
                                mountPath={travel.mountPath}
                                alias="travel"
                              />
                            )}
                            {literature && (
                              <Literature
                                mountPath={literature.mountPath}
                                alias="literature"
                              />
                            )}
                            {code && (
                              <Code mountPath={code.mountPath} alias="code" />
                            )}
                            {main && (
                              <Main mountPath={main.mountPath} alias="main" />
                            )}
                          </Packages>
                        </AuthContext.Provider>
                      </PreviewContextProvider>
                    </SidebarContextProvider>
                  </LayoutContextProvider>
                </FilterContextProvider>
              </ThemeProvider>
            </MuiPickersUtilsProvider>
          </BrowserRouter>
        </Provider>
        {showFeaturesWidget && <FeatureTogglesWidget />}
      </FeatureToggleProvider>
    </ErrorBoundary>
  );
};

Root.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  store: PropTypes.object.isRequired,
  config: PropTypes.shape(configPropTypes).isRequired,
  appId: PropTypes.number.isRequired,
};

export default Root;

import React from 'react';
import PropTypes from 'prop-types';
import { memoizeByLastArgs } from 'modules/utilities/memo';
import { checkIsAuthenticated } from 'modules/auth';

const AuthContext = React.createContext({});

const memoizeAuthContext = memoizeByLastArgs(isAuthenticated => ({
  isAuthenticated,
}));

const AuthContextProvider = ({ children }) => (
  <AuthContext.Provider value={memoizeAuthContext(checkIsAuthenticated())}>
    {children}
  </AuthContext.Provider>
);
AuthContextProvider.propTypes = { children: PropTypes.node.isRequired };

export default {
  Provider: AuthContextProvider,
  Consumer: AuthContext.Consumer,
};

export const withAuth = Component => props => (
  <AuthContext.Consumer>
    {authContext => <Component {...props} {...authContext} />}
  </AuthContext.Consumer>
);

export const authContextPropTypes = {
  isAuthenticated: PropTypes.bool,
};

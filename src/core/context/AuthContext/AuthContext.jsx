import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { subscribe, unsubscribe, checkIsAuthenticated } from 'modules/auth';

const AuthContext = React.createContext({});

class AuthContextProvider extends React.Component {
  state = { context: { isAuthenticated: checkIsAuthenticated() } };

  componentDidMount() {
    subscribe(this.handleAuthenticationUpdate);
  }

  componentWillUnmount() {
    unsubscribe(this.handleAuthenticationUpdate);
  }

  handleAuthenticationUpdate = isAuthenticated => {
    this.setState({ context: { isAuthenticated } });
  };

  render() {
    const { children } = this.props;
    const { context } = this.state;
    return (
      <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
    );
  }
}

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

export const useAuthContext = () => useContext(AuthContext);

export const authContextPropTypes = {
  isAuthenticated: PropTypes.bool,
};

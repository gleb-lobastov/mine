import React, { useContext } from 'react';
import {
  subscribe,
  unsubscribe,
  checkIsAuthenticated,
  deriveTokenStatus,
} from 'modules/auth';

const AuthContext = React.createContext({});

class AuthContextProvider extends React.Component {
  constructor(props) {
    super(props);
    const tokenStatus = deriveTokenStatus();
    const { userAlias } = tokenStatus;
    this.state = {
      context: {
        isAuthenticated: checkIsAuthenticated(tokenStatus),
        userAlias,
      },
    };
  }

  componentDidMount() {
    subscribe(this.handleAuthenticationUpdate);
  }

  componentWillUnmount() {
    unsubscribe(this.handleAuthenticationUpdate);
  }

  handleAuthenticationUpdate = ({ isAuthenticated, userAlias }) => {
    this.setState({ context: { isAuthenticated, userAlias } });
  };

  render() {
    const { children } = this.props;
    const { context } = this.state;
    return (
      <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
    );
  }
}

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

import React from 'react';
import PropTypes from 'prop-types';
import { withRouter, Route, Redirect, Switch } from 'react-router-dom';
import compose from 'lodash/fp/compose';
import Path from 'modules/utilities/routing/Path';
import { withPaths } from 'core/context/AppContext';
import { useAuthContext } from 'core/context/AuthContext';

const WelcomeScreen = ({
  children,
  match: {
    params: { userAlias: visitedUserAlias },
  },
  namedPaths: { travel: { trips: tripsPath } = {} } = {},
}) => {
  const { userAlias: authenticatedUserAlias } = useAuthContext();
  if (visitedUserAlias !== authenticatedUserAlias) {
    return (
      <span>Пользователь пока еще не внес информацию о своих поездках</span>
    );
  }
  return (
    <Switch>
      <Route
        path={tripsPath.toUrl({ userAlias: authenticatedUserAlias })}
        component={() => (
          <div>
            <span>
              Нам пока ничего не известно о ваших путешествиях. Но очень
              интересно узнать. Создайте вашу первую поездку, а мы подготовим по
              ней отчет
            </span>
            {children}
          </div>
        )}
      />
      <Redirect to={tripsPath.toUrl({ userAlias: authenticatedUserAlias })} />
    </Switch>
  );
};

WelcomeScreen.propTypes = {
  children: PropTypes.node,
  match: PropTypes.shape({
    params: PropTypes.shape({ userAlias: PropTypes.string }),
  }).isRequired,
  namedPaths: PropTypes.shape({
    travel: PropTypes.shape({ trips: PropTypes.instanceOf(Path) }),
  }).isRequired,
};

WelcomeScreen.defaultProps = {
  children: null,
};

export default compose(
  withRouter,
  withPaths,
)(WelcomeScreen);

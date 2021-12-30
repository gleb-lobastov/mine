import React, { useCallback } from 'react';
import { withRouter, Route, Redirect, Switch } from 'react-router-dom';
import { usePaths } from 'modules/packages';
import { useAuthContext } from 'core/context/AuthContext';

const WelcomeScreen = ({
  children,
  match: {
    params: { userAlias: visitedUserAlias },
  },
}) => {
  const {
    travel: { trips: tripsPath },
  } = usePaths();

  const { userAlias: authenticatedUserAlias } = useAuthContext();
  if (visitedUserAlias !== authenticatedUserAlias) {
    return (
      <span>Пользователь пока еще не внес информацию о своих поездках</span>
    );
  }
  const Message = useCallback(
    () => (
      <div>
        <span>
          Нам пока ничего не известно о ваших путешествиях. Но очень интересно
          узнать. Создайте вашу первую поездку, а мы подготовим по ней отчет
        </span>
        {children}
      </div>
    ),
    [children],
  );
  return (
    <Switch>
      <Route
        path={tripsPath.toUrl({ userAlias: authenticatedUserAlias })}
        component={Message}
      />
      <Redirect to={tripsPath.toUrl({ userAlias: authenticatedUserAlias })} />
    </Switch>
  );
};

WelcomeScreen.defaultProps = {
  children: null,
};

export default withRouter(WelcomeScreen);

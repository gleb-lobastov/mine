import React from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import compose from 'lodash/fp/compose';
import Path from 'modules/utilities/routing/Path';
import { withPaths } from 'core/context/AppContext';

const WelcomeScreen = ({
  children,
  match: {
    params: { userAlias },
  },
  namedPaths: { travel: { trips: tripsPath } = {} } = {},
  shouldShowLinkToTrips,
}) => (
  <div>
    <span>
      Нам пока ничего не известно о ваших путешествиях. Но очень интересно
      узнать.
    </span>
    &nbsp;
    {shouldShowLinkToTrips ? (
      <Link to={tripsPath.toUrl({ userAlias })}>Создайте</Link>
    ) : (
      <span>Создайте</span>
    )}
    &nbsp;
    <span>вашу первую поездку, а мы подготовим по ней отчет</span>
    {children}
  </div>
);

WelcomeScreen.propTypes = {
  children: PropTypes.node,
  match: PropTypes.shape({
    params: PropTypes.shape({ userAlias: PropTypes.string }),
  }).isRequired,
  namedPaths: PropTypes.shape({
    travel: PropTypes.shape({ trips: PropTypes.instanceOf(Path) }),
  }).isRequired,
  shouldShowLinkToTrips: PropTypes.bool,
};

WelcomeScreen.defaultProps = {
  children: null,
  shouldShowLinkToTrips: true,
};

export default compose(
  withRouter,
  withPaths,
)(WelcomeScreen);

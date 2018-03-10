import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router';

const ContentProvider = ({ routesList }) => (
  <Switch>
    {routesList.map(props => (
      <Route key={props.to} {...props} />
    ))}
  </Switch>
);

ContentProvider.propTypes = {
  routesList: PropTypes.arrayOf(
    PropTypes.shape(Route.propTypes),
  ).isRequired,
};

export default ContentProvider;

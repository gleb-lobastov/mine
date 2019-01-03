import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router';
import Path from 'modules/utilities/routing/Path';
import { withPaths } from 'core/context/AppContext';

class Router extends React.Component {
  static propTypes = {
    orderedPaths: PropTypes.arrayOf(PropTypes.instanceOf(Path)),
  };

  static defaultProps = {
    orderedPaths: [],
  };

  renderRoute = path => {
    const { Component, ...forwardedProps } = path.getMeta();
    const pathStr = path.toString();
    return (
      <Route
        key={pathStr}
        {...forwardedProps}
        exact={true}
        path={pathStr}
        component={Component}
      />
    );
  };

  render() {
    const { orderedPaths } = this.props;
    return <Switch>{orderedPaths.map(this.renderRoute)}</Switch>;
  }
}

export default withPaths(Router);

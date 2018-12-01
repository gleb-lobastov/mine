import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router';

class ContentProvider extends React.Component {
  render() {
    const { routesList } = this.props;

    return (
      <Switch>
        {routesList.map(props => (
          <Route key={props.path} {...props} />
        ))}
      </Switch>
    );
  }
}

export const contentProviderPropTypes = {
  routesList: PropTypes.arrayOf(
    PropTypes.shape({
      path: PropTypes.string,
    }),
  ).isRequired,
};

ContentProvider.propTypes = contentProviderPropTypes;

export default ContentProvider;

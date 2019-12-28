import React from 'react';
import PropTypes from 'prop-types';
import { withRouter, matchPath } from 'react-router';
import compose from 'lodash/fp/compose';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { memoizeByLastArgs } from 'modules/utilities/memo';
import {
  pathsPropTypes,
  packagePropTypes,
  withPaths,
  withNavigation,
} from 'core/context/AppContext';
import { authContextPropTypes, withAuth } from 'core/context/AuthContext';
import { findTabIndex } from './utils';
import MainTabs from './blocks/MainTabs';
import SubTabs from './blocks/SubTabs';

const styles = {
  root: {
    flexGrow: 1,
    flexDirection: 'row',
  },
  grow: {
    flexGrow: 1,
    textAlign: 'right',
    margin: '0 12px',
  },
};

class Navigation extends React.PureComponent {
  static propTypes = {
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }).isRequired,
    match: PropTypes.shape({
      params: PropTypes.objectOf(PropTypes.string),
    }).isRequired,
    packages: PropTypes.arrayOf(PropTypes.shape(packagePropTypes)).isRequired,
    namedPaths: pathsPropTypes.namedPaths.isRequired,
    isAuthenticated: authContextPropTypes.isAuthenticated.isRequired,
    userAlias: authContextPropTypes.userAlias.isRequired,
    classes: PropTypes.objectOf(PropTypes.string).isRequired,
  };

  findMainTabIndex = memoizeByLastArgs((pathname, navigation) =>
    findTabIndex(pathname, navigation),
  );

  findSubTabIndex = memoizeByLastArgs((pathname, navigation) =>
    findTabIndex(pathname, navigation),
  );

  handleChangeUrl = (nextPath, currentPath) => {
    const {
      history,
      location: { pathname },
      match: { params },
    } = this.props;
    const match = matchPath(pathname, { path: currentPath.toString() });
    const { params: pathParams } = match || {};
    history.push(nextPath.toUrl({ ...params, ...pathParams }));
  };

  render() {
    const {
      location: { pathname },
      namedPaths,
      navigation,
      packages,
      isAuthenticated,
      userAlias: authorizedUserAlias,
      classes,
    } = this.props;

    const mainTabIndex = this.findMainTabIndex(pathname, navigation?.menu);
    const subTabIndex = this.findSubTabIndex(
      pathname,
      navigation.menu[mainTabIndex]?.menu,
    );

    const hasMainItemsToSelect =
      packages.filter(({ title }) => title).length > 1;

    return (
      <div>
        <AppBar position="static" classes={{ root: classes.root }}>
          {hasMainItemsToSelect && (
            <MainTabs
              namedPaths={namedPaths}
              onChangeUrl={this.handleChangeUrl}
              packages={packages}
              navigation={navigation}
              mainTabIndex={mainTabIndex}
            />
          )}
          {isAuthenticated && (
            <Typography variant="h6" color="inherit" className={classes.grow}>
              {authorizedUserAlias}
            </Typography>
          )}
        </AppBar>
        <SubTabs
          namedPaths={namedPaths}
          onChangeUrl={this.handleChangeUrl}
          packages={packages}
          mainTabIndex={mainTabIndex}
          subTabIndex={subTabIndex}
        />
      </div>
    );
  }
}

export default compose(
  withRouter,
  withPaths,
  withNavigation,
  withAuth,
  withStyles(styles),
)(Navigation);

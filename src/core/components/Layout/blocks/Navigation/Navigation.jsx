import React from 'react';
import PropTypes from 'prop-types';
import { withRouter, matchPath } from 'react-router';
import compose from 'lodash/fp/compose';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { memoizeByLastArgs } from 'modules/utilities/memo';
import { navigationPropTypes, withNavigation } from 'core/context/AppContext';
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
    navigation: PropTypes.shape(navigationPropTypes).isRequired,
    isAuthenticated: authContextPropTypes.isAuthenticated.isRequired,
    userAlias: authContextPropTypes.userAlias.isRequired,
    classes: PropTypes.objectOf(PropTypes.string).isRequired,
  };

  findMainTabIndex = memoizeByLastArgs(findTabIndex);

  // different function for different cache
  findSubTabIndex = memoizeByLastArgs(findTabIndex);

  handleChangeUrl = (event, currentPath, nextPath) => {
    const {
      history,
      location: { pathname },
      match: { params },
    } = this.props;
    const match = matchPath(pathname, { path: currentPath.toString() });
    const { params: pathParams } = match || {};
    history.push(nextPath.toUrl({ ...params, ...pathParams }));
  };

  renderAuthInfo() {
    const {
      isAuthenticated,
      userAlias: authorizedUserAlias,
      classes,
    } = this.props;

    if (!isAuthenticated) {
      return null;
    }

    return (
      <Typography variant="h6" color="inherit" className={classes.grow}>
        {authorizedUserAlias}
      </Typography>
    );
  }

  render() {
    const {
      location: { pathname },
      navigation: { menu: mainMenu },
      classes,
    } = this.props;

    const mainTabIndex = this.findMainTabIndex(pathname, mainMenu);
    const subMenu = mainMenu[mainTabIndex]?.menu;
    const subTabIndex = this.findSubTabIndex(pathname, subMenu);

    return (
      <div>
        <AppBar position="static" classes={{ root: classes.root }}>
          {mainMenu.length >= 1 && (
            <MainTabs
              menu={mainMenu}
              onChangeUrl={this.handleChangeUrl}
              tabIndex={mainTabIndex}
            />
          )}
          {this.renderAuthInfo()}
        </AppBar>
        {subMenu && (
          <SubTabs
            menu={subMenu}
            onChangeUrl={this.handleChangeUrl}
            tabIndex={subTabIndex}
          />
        )}
      </div>
    );
  }
}

export default compose(
  withRouter,
  withNavigation,
  withAuth,
  withStyles(styles),
)(Navigation);

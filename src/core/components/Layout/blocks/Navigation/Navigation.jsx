import React from 'react';
import PropTypes from 'prop-types';
import { withRouter, matchPath } from 'react-router';
import compose from 'lodash/fp/compose';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { memoizeByLastArgs } from 'modules/utilities/memo';
import { authContextPropTypes, withAuth } from 'core/context/AuthContext';
import { withFilterContext } from 'core/context/QueryFilterContext';
import navigationShape from './navigationShape';
import { findTabIndex } from './utils';
import MainTabs from './blocks/MainTabs';
import SubTabs from './blocks/SubTabs';

const styles = () => ({
  root: {
    flexGrow: 1,
    flexDirection: 'row',
  },
  grow: {
    flexGrow: 1,
    textAlign: 'right',
    margin: '0 12px',
  },
});

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
    children: PropTypes.node,
    config: PropTypes.shape(navigationShape).isRequired,
    isAuthenticated: authContextPropTypes.isAuthenticated.isRequired,
    userAlias: authContextPropTypes.userAlias.isRequired,
    classes: PropTypes.objectOf(PropTypes.string).isRequired,
  };

  static defaultProps = {
    children: PropTypes.node,
  };

  findMainTabIndex = memoizeByLastArgs(findTabIndex);

  // different function for different cache
  findSubTabIndex = memoizeByLastArgs(findTabIndex);

  handleChangeUrl = (event, currentPath, nextPath, nextPathParams) => {
    const {
      history,
      location: { pathname },
      match: { params },
    } = this.props;
    const match = matchPath(pathname, { path: currentPath.toString() });
    const { params: pathParams } = match || {};
    history.push(
      nextPath.toUrl({ ...params, ...pathParams, ...nextPathParams }),
    );
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
      config: { menu: mainMenu },
      classes,
      children,
    } = this.props;

    const mainTabIndex = this.findMainTabIndex(pathname, mainMenu);
    const subMenu = mainMenu[mainTabIndex]?.menu;
    const subTabIndex = this.findSubTabIndex(pathname, subMenu);

    const mainMenuNode = mainMenu.length > 1 && (
      <MainTabs
        menu={mainMenu}
        onChangeUrl={this.handleChangeUrl}
        tabIndex={mainTabIndex}
      />
    );

    const subMenuNode = subMenu && (
      <SubTabs
        menu={subMenu}
        onChangeUrl={this.handleChangeUrl}
        tabIndex={subTabIndex}
      />
    );

    return (
      <div>
        <AppBar position="static" classes={{ root: classes.root }}>
          {children}
          {mainMenuNode || subMenuNode}
          {this.renderAuthInfo()}
        </AppBar>
        {mainMenuNode && subMenuNode}
      </div>
    );
  }
}

export default compose(
  withRouter,
  withAuth,
  withFilterContext,
  withStyles(styles),
)(Navigation);

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
import Breadcrumbs from './blocks/Breadcrumbs';

const styles = theme => ({
  root: {
    flexGrow: 1,
    flexDirection: 'row',
  },
  grow: {
    flexGrow: 1,
    textAlign: 'right',
    margin: '0 12px',
  },
  breadcrumbs: {
    backgroundColor: theme.palette.background.paper,
    padding: '12px 0 12px 40px',
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
    actualPath: PropTypes.string.isRequired,
    children: PropTypes.node,
    breadcrumbs: PropTypes.arrayOf(
      PropTypes.shape({
        caption: PropTypes.string,
        path: PropTypes.string,
      }),
    ),
    config: PropTypes.shape(navigationShape).isRequired,
    isAuthenticated: authContextPropTypes.isAuthenticated.isRequired,
    userAlias: authContextPropTypes.userAlias.isRequired,
    classes: PropTypes.objectOf(PropTypes.string).isRequired,
  };

  static defaultProps = {
    children: PropTypes.node,
    breadcrumbs: [],
  };

  findMainTabIndex = memoizeByLastArgs(findTabIndex);

  // different function for different cache
  findSubTabIndex = memoizeByLastArgs(findTabIndex);

  matchPath(patchToCompare, options) {
    const {
      location: { pathname },
    } = this.props;
    return matchPath(pathname, { ...options, path: patchToCompare.toString() });
  }

  resolveBreadcrumbs({ selectedMainMenuItem, selectedSubMenuItem }) {
    const { breadcrumbs = [] } = this.props;
    const isSubMenuPathExact =
      selectedSubMenuItem &&
      this.matchPath(selectedSubMenuItem.path, { exact: true });

    if (!breadcrumbs.length) {
      return [];
    }

    return [
      selectedMainMenuItem,
      !isSubMenuPathExact && selectedSubMenuItem,
      ...breadcrumbs,
    ].filter(Boolean);
  }

  handleChangeUrl = (event, currentPath, nextPath, nextPathParams) => {
    const {
      history,
      match: { params },
    } = this.props;
    const { params: pathParams } = this.matchPath(currentPath) || {};
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
      actualPath,
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
        <Breadcrumbs
          actualPath={actualPath}
          onChangeUrl={this.handleChangeUrl}
          breadcrumbs={this.resolveBreadcrumbs({
            selectedMainMenuItem: mainMenu?.[mainTabIndex],
            selectedSubMenuItem: subMenu?.[subTabIndex],
          })}
        />
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

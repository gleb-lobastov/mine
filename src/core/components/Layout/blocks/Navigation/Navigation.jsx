import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import compose from 'lodash/fp/compose';
import AppBar from '@material-ui/core/AppBar';
import { memoizeByLastArgs } from 'modules/utilities/memo';
import {
  pathsPropTypes,
  packagePropTypes,
  withPaths,
} from 'core/context/AppContext/AppContext';
import { findTabIndex } from './utils';
import MainTabs from './blocks/MainTabs';
import SubTabs from './blocks/SubTabs';

class Navigation extends React.PureComponent {
  static propTypes = {
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }).isRequired,
    packages: PropTypes.arrayOf(PropTypes.shape(packagePropTypes)).isRequired,
    namedPaths: pathsPropTypes.namedPaths.isRequired,
  };

  findMainTabIndex = memoizeByLastArgs((pathname, packages, namedPaths) =>
    findTabIndex(
      pathname,
      packages,
      ({ packageName }) => namedPaths[packageName]?.entry,
    ),
  );

  findSubTabIndex = memoizeByLastArgs(
    (pathname, subMenuConfig, packageRoutes) =>
      findTabIndex(
        pathname,
        subMenuConfig,
        ({ routeName }) => packageRoutes?.[routeName],
      ),
  );

  handleChangeUrl = url => {
    const { history } = this.props;
    history.push(url);
  };

  render() {
    const {
      location: { pathname },
      namedPaths,
      packages,
    } = this.props;

    const mainTabIndex = this.findMainTabIndex(pathname, packages, namedPaths);
    const { routing: { menu: subMenuConfig } = {}, packageName } = packages[
      mainTabIndex
    ];
    const packageRoutes = namedPaths[packageName];
    const subTabIndex = this.findSubTabIndex(
      pathname,
      subMenuConfig,
      packageRoutes,
    );

    return (
      <div>
        <AppBar position="static">
          <MainTabs
            namedPaths={namedPaths}
            onChangeUrl={this.handleChangeUrl}
            packages={packages}
            mainTabIndex={mainTabIndex}
          />
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
)(Navigation);

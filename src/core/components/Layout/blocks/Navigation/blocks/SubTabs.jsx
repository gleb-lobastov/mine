import React from 'react';
import PropTypes from 'prop-types';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import {
  pathsPropTypes,
  packagePropTypes,
} from 'core/context/AppContext/AppContext';

class SubTabs extends React.PureComponent {
  static propTypes = {
    namedPaths: pathsPropTypes.namedPaths.isRequired,
    onChangeUrl: PropTypes.func.isRequired,
    packages: PropTypes.arrayOf(PropTypes.shape(packagePropTypes)).isRequired,
    mainTabIndex: PropTypes.number.isRequired,
    subTabIndex: PropTypes.number.isRequired,
  };

  resolveRoute(selectedSubTabIndex) {
    const { namedPaths, packages, mainTabIndex } = this.props;
    const currentRoutes = this.resolveRoutes();
    const { routeName } = currentRoutes[selectedSubTabIndex];
    const {packageName: selectedPackageName} = packages[mainTabIndex];
    return namedPaths[selectedPackageName][routeName];
  }

  resolveRoutes() {
    const { packages, mainTabIndex } = this.props;
    return packages[mainTabIndex].routing.menu || [];
  }

  handleChangeSubTab = (event, selectedSubTabIndex) => {
    const { onChangeUrl: handleChangeUrl } = this.props;
    handleChangeUrl(this.resolveRoute(selectedSubTabIndex).toUrl());
  };

  render() {
    const { subTabIndex } = this.props;
    const currentRoutes = this.resolveRoutes();
    if (!currentRoutes.length) {
      return null;
    }
    return (
      <Tabs value={subTabIndex} onChange={this.handleChangeSubTab}>
        {currentRoutes.map(({ routeName, caption }) => (
          <Tab key={routeName} label={caption} />
        ))}
      </Tabs>
    );
  }
}

export default SubTabs;

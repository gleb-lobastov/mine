import React from 'react';
import PropTypes from 'prop-types';
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import {
  pathsPropTypes,
  packagePropTypes,
} from 'core/context/AppContext/AppContext';

class MainTabs extends React.PureComponent {
  static propTypes = {
    namedPaths: pathsPropTypes.namedPaths.isRequired,
    onChangeUrl: PropTypes.func.isRequired,
    packages: PropTypes.arrayOf(PropTypes.shape(packagePropTypes)).isRequired,
    mainTabIndex: PropTypes.number.isRequired,
    width: PropTypes.string.isRequired,
  };

  resolveMainTabsPath(nextMainTabIndex) {
    const { namedPaths, packages } = this.props;
    const { packageName: selectedPackageName } = packages[nextMainTabIndex];
    return namedPaths[selectedPackageName].entry;
  }

  handleChangeMainTab = (event, nextMainTabIndex) => {
    const { mainTabIndex, onChangeUrl: handleChangeUrl } = this.props;
    handleChangeUrl(
      this.resolveMainTabsPath(nextMainTabIndex),
      this.resolveMainTabsPath(mainTabIndex),
    );
  };

  renderLabel(label) {
    const { width } = this.props;
    if (!isWidthUp('sm', width)) {
      return undefined;
    }
    return label;
  }

  renderTab = ({ id, title: { caption, icon: IconComponent } = {} }) => {
    if (!caption && !IconComponent) {
      return null;
    }
    return (
      <Tab
        key={id}
        label={this.renderLabel(caption)}
        icon={<IconComponent />}
      />
    );
  };

  render() {
    const { mainTabIndex, packages } = this.props;

    return (
      <Tabs value={mainTabIndex} onChange={this.handleChangeMainTab}>
        {packages.map(this.renderTab)}
      </Tabs>
    );
  }
}

export default withWidth()(MainTabs);

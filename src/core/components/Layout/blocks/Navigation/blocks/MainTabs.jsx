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
    const { onChangeUrl: handleChangeUrl } = this.props;
    handleChangeUrl(this.resolveMainTabsPath(nextMainTabIndex).toUrl());
  };

  renderLabel(label) {
    const { width } = this.props;
    if (!isWidthUp('sm', width)) {
      return undefined;
    }
    return label;
  }

  render() {
    const { mainTabIndex, packages } = this.props;

    return (
      <Tabs value={mainTabIndex} onChange={this.handleChangeMainTab}>
        {packages.map(({ id, title: { caption, icon: IconComponent } }) => (
          <Tab
            key={id}
            label={this.renderLabel(caption)}
            icon={<IconComponent />}
          />
        ))}
      </Tabs>
    );
  }
}

export default withWidth()(MainTabs);

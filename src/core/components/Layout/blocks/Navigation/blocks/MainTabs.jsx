import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
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
    classes: PropTypes.objectOf(PropTypes.string).isRequired,
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
    const { classes } = this.props;
    return <span className={classes.label}>{label}</span>;
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
      <Tabs
        value={mainTabIndex}
        onChange={this.handleChangeMainTab}
      >
        {packages.map(this.renderTab)}
      </Tabs>
    );
  }
}

const styles = theme => ({
  [theme.breakpoints.down('xs')]: {
    label: {
      display: 'none',
    },
  },
});

export default withStyles(styles)(MainTabs);

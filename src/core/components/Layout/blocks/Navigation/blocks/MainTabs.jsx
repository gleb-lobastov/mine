import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';

class MainTabs extends React.PureComponent {
  calcTabIndexShift() {
    const { sidebarToggleButton } = this.props;
    return sidebarToggleButton ? 1 : 0;
  }

  handleChangeMainTab = (event, nextTabIndex) => {
    const { menu, tabIndex, onChangeUrl } = this.props;
    const nextMenuItem = menu[nextTabIndex - this.calcTabIndexShift()];
    const { path } = menu[tabIndex];
    const { path: nextPath } = nextMenuItem;
    onChangeUrl(event, path, nextPath, nextMenuItem);
  };

  renderLabel(label) {
    const { classes } = this.props;
    return <span className={classes.label}>{label}</span>;
  }

  renderTab = ({ path, caption, icon: IconComponent }) => {
    if (!caption && !IconComponent) {
      return null;
    }
    return (
      <Tab
        key={path.toString()}
        label={this.renderLabel(caption)}
        icon={<IconComponent />}
      />
    );
  };

  render() {
    const { tabIndex, menu, sidebarToggleButton } = this.props;

    return (
      <Tabs
        value={tabIndex + this.calcTabIndexShift()}
        onChange={this.handleChangeMainTab}
        variant="scrollable"
      >
        {sidebarToggleButton}
        {menu.map(this.renderTab)}
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

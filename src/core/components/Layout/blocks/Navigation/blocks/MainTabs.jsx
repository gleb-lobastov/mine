import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';

class MainTabs extends React.PureComponent {
  static propTypes = {
    onChangeUrl: PropTypes.func.isRequired,
    tabIndex: PropTypes.number.isRequired,
    classes: PropTypes.objectOf(PropTypes.string).isRequired,
  };

  handleChangeMainTab = (event, nextTabIndex) => {
    const { menu, tabIndex, onChangeUrl } = this.props;
    const { path } = menu[tabIndex];
    const { path: nextPath } = menu[nextTabIndex];
    onChangeUrl(event, path, nextPath);
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
    const { tabIndex, menu } = this.props;

    return (
      <Tabs value={tabIndex} onChange={this.handleChangeMainTab}>
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

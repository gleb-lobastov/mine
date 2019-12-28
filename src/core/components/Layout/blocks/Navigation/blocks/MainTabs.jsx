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
    onChangeUrl: PropTypes.func.isRequired,
    tabIndex: PropTypes.number.isRequired,
    classes: PropTypes.objectOf(PropTypes.string).isRequired,
  };

  handleChangeMainTab = (event, nextTabIndex) => {
    const { menu, tabIndex, onChangeUrl } = this.props;
    const { route } = menu[tabIndex];
    const { route: nextRoute } = menu[nextTabIndex];
    onChangeUrl(event, route, nextRoute);
  };

  renderLabel(label) {
    const { classes } = this.props;
    return <span className={classes.label}>{label}</span>;
  }

  renderTab = ({ id, caption, icon: IconComponent }) => {
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

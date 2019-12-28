import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import {
  pathsPropTypes,
  packagePropTypes,
} from 'core/context/AppContext/AppContext';

class SubTabs extends React.PureComponent {
  static propTypes = {
    onChangeUrl: PropTypes.func.isRequired,
    tabIndex: PropTypes.number.isRequired,
    classes: PropTypes.objectOf(PropTypes.string).isRequired,
  };

  handleChangeSubTab = (event, nextTabIndex) => {
    const { menu, tabIndex, onChangeUrl } = this.props;
    const { route } = menu[tabIndex];
    const { route: nextRoute } = menu[nextTabIndex];
    onChangeUrl(event, route, nextRoute);
  };

  render() {
    const { tabIndex, classes, menu } = this.props;
    if (!menu.length) {
      return null;
    }
    return (
      <div className={classes.root}>
        <Tabs
          value={tabIndex}
          onChange={this.handleChangeSubTab}
          variant="scrollable"
          scrollButtons="auto"
        >
          {menu.map(({ routeName, caption }) => (
            <Tab key={routeName} label={caption} />
          ))}
        </Tabs>
      </div>
    );
  }
}

const styles = {
  root: {
    flexGrow: 1,
    width: '100%',
  },
};

export default withStyles(styles)(SubTabs);

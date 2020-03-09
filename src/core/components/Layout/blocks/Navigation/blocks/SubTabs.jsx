import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';

class SubTabs extends React.PureComponent {
  static propTypes = {
    onChangeUrl: PropTypes.func.isRequired,
    tabIndex: PropTypes.number.isRequired,
    classes: PropTypes.objectOf(PropTypes.string).isRequired,
  };

  handleChangeSubTab = (event, nextTabIndex) => {
    const { menu, tabIndex, onChangeUrl } = this.props;
    const { path } = menu[tabIndex];
    const { path: nextPath, params } = menu[nextTabIndex];
    onChangeUrl(event, path, nextPath, params);
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
          {menu.map(({ path, caption }) => (
            <Tab key={path.toString()} label={caption} />
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

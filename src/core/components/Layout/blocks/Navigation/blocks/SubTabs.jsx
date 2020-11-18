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
    const nextMenuItem = menu[nextTabIndex];
    const { path } = menu[tabIndex];
    const { path: nextPath } = nextMenuItem;
    onChangeUrl(event, path, nextPath, nextMenuItem);
  };

  render() {
    const { tabIndex, classes, menu, allowIcons } = this.props;
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
          {menu.map(({ caption, icon: IconComponent }) => (
            <Tab
              key={caption}
              label={caption}
              icon={allowIcons && IconComponent ? <IconComponent /> : null}
            />
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

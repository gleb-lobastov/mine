import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import compose from 'lodash/fp/compose';
import * as routes from 'core/routing/routes';
import memo from 'modules/memo';
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import IconHome from '@material-ui/icons/Home';
import IconPublic from '@material-ui/icons/Public';
import IconCode from '@material-ui/icons/Code';
import IconCreate from '@material-ui/icons/Create';

const PAGES_INDICES = {
  MAIN: 0,
  TRAVEL: 1,
  LITERATURE: 2,
  CODE: 3,
};

class NavigationTabs extends React.PureComponent {
  static propTypes = {
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }).isRequired,
    width: PropTypes.number.isRequired,
  };

  findPageIndex = memo(pathname => {
    if (routes.root.checkIsActive(pathname)) {
      return PAGES_INDICES.MAIN;
    }
    if (routes.travelsRoute.checkIsActive(pathname)) {
      return PAGES_INDICES.TRAVEL;
    }
    if (routes.literatureRoute.checkIsActive(pathname)) {
      return PAGES_INDICES.LITERATURE;
    }
    if (routes.codeRoute.checkIsActive(pathname)) {
      return PAGES_INDICES.CODE;
    }
    return -1;
  });

  resolveUrl = selectedMainTabIndex => {
    switch (selectedMainTabIndex) {
      case PAGES_INDICES.MAIN:
        return routes.root.toUrl();
      case PAGES_INDICES.TRAVEL:
        return routes.travelsRoute.toUrl({ reportType: 'countries' });
      case PAGES_INDICES.LITERATURE:
        return routes.literatureRoute.toUrl();
      case PAGES_INDICES.CODE:
        return routes.codeRoute.toUrl();
      default:
        return routes.error404.toUrl();
    }
  };

  handleChangeMainTab = (event, selectedMainTabIndex) => {
    const { history } = this.props;
    history.push(this.resolveUrl(selectedMainTabIndex));
  };

  renderLabel(label) {
    const { width } = this.props;
    if (!isWidthUp('sm', width)) {
      return undefined;
    }
    return label;
  }

  render() {
    const {
      location: { pathname },
    } = this.props;

    const selectedMainTabIndex = this.findPageIndex(pathname);
    return (
      <div>
        <Tabs value={selectedMainTabIndex} onChange={this.handleChangeMainTab}>
          <Tab label={this.renderLabel('Главная')} icon={<IconHome />} />
          <Tab label={this.renderLabel('Путешествия')} icon={<IconPublic />} />
          <Tab label={this.renderLabel('Литература')} icon={<IconCreate />} />
          <Tab label={this.renderLabel('Код')} icon={<IconCode />} />
        </Tabs>
      </div>
    );
  }
}

export default compose(
  withWidth(),
  withRouter,
)(NavigationTabs);

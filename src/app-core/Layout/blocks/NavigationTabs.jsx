import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import * as routes from 'core/routing/routes';
import memo from 'modules/memo';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import IconHome from '@material-ui/icons/Home';
import IconPublic from '@material-ui/icons/Public';
import IconLibraryBooks from '@material-ui/icons/LibraryBooks';
import IconCreate from '@material-ui/icons/Create';

const PAGES_INDICES = {
  MAIN: 0,
  TRAVEL: 1,
  BOOKS: 2,
  BLOG: 3,
};

class NavigationTabs extends React.PureComponent {
  static propTypes = {
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }).isRequired,
  };

  findPageIndex = memo(pathname => {
    if (routes.root.checkIsActive(pathname)) {
      return PAGES_INDICES.MAIN;
    }
    if (routes.travelsRoute.checkIsActive(pathname)) {
      return PAGES_INDICES.TRAVEL;
    }
    if (routes.booksRoute.checkIsActive(pathname)) {
      return PAGES_INDICES.BOOKS;
    }
    if (routes.blogRoute.checkIsActive(pathname)) {
      return PAGES_INDICES.BLOG;
    }
    return -1;
  });

  resolveUrl = selectedMainTabIndex => {
    switch (selectedMainTabIndex) {
      case PAGES_INDICES.MAIN:
        return routes.root.toUrl();
      case PAGES_INDICES.TRAVEL:
        return routes.travelsRoute.toUrl({ reportType: 'countries' });
      case PAGES_INDICES.BOOKS:
        return routes.booksRoute.toUrl();
      case PAGES_INDICES.BLOG:
        return routes.blogRoute.toUrl();
      default:
        return routes.error404.toUrl();
    }
  };

  handleChangeMainTab = (event, selectedMainTabIndex) => {
    const { history } = this.props;
    history.push(this.resolveUrl(selectedMainTabIndex));
  };

  render() {
    const {
      location: { pathname },
    } = this.props;

    const selectedMainTabIndex = this.findPageIndex(pathname);
    return (
      <div>
        <Tabs value={selectedMainTabIndex} onChange={this.handleChangeMainTab}>
          <Tab label="Главная" icon={<IconHome />} />
          <Tab label="Путешествия" icon={<IconPublic />} />
          <Tab label="Книги" icon={<IconLibraryBooks />} />
          <Tab label="Блог" icon={<IconCreate />} />
        </Tabs>
      </div>
    );
  }
}

export default withRouter(NavigationTabs);

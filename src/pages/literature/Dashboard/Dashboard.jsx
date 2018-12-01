import React from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import ArticlesController from '../ArticlesController';
import Books from '../Books';
import Chaldini from '../longreads/Chaldini';

class Dashboard extends React.PureComponent {
  state = {
    selectedMainTabIndex: 0,
  };

  handleChangeMainTab = (event, selectedMainTabIndex) => {
    this.setState({ selectedMainTabIndex });
  };

  render() {
    const { selectedMainTabIndex } = this.state;

    return (
      <div>
        <Tabs value={selectedMainTabIndex} onChange={this.handleChangeMainTab}>
          <Tab label="Книги" />
          <Tab label="Конспекты" />
          <Tab label="Блог" />
        </Tabs>
        {selectedMainTabIndex === 0 && <Books />}
        {selectedMainTabIndex === 1 && <Chaldini />}
        {selectedMainTabIndex === 2 && <ArticlesController domain="articles" />}
      </div>
    );
  }
}

export default Dashboard;

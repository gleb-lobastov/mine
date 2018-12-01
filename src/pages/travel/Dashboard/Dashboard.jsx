import React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import withContents from 'state/withContentsHOC';
import Cities from './blocks/Cities';
import Trips from './blocks/Trips';
import Countries from './blocks/Countries';

const TabContainer = ({ children }) => (
  <Typography component="div" style={{ padding: 8 * 3 }}>
    {children}
  </Typography>
);
TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

class TravelDashboard extends React.PureComponent {
  static propTypes = {
    contents: PropTypes.shape({
      location: PropTypes.arrayOf(PropTypes.string),
    }).isRequired,
  };

  state = {
    selectedMainTabIndex: 0,
  };

  handleChangeMainTab = (event, selectedMainTabIndex) => {
    this.setState({ selectedMainTabIndex });
  };

  render() {
    const { contents } = this.props;
    const { selectedMainTabIndex } = this.state;

    return (
      <div>
        <Tabs value={selectedMainTabIndex} onChange={this.handleChangeMainTab}>
          <Tab label="По странам" />
          <Tab label="По городам" />
          <Tab label="По поездкам" />
        </Tabs>
        {selectedMainTabIndex === 0 && (
          <TabContainer>
            <Countries contents={contents} />
          </TabContainer>
        )}
        {selectedMainTabIndex === 1 && (
          <TabContainer>
            <Cities contents={contents} />
          </TabContainer>
        )}
        {selectedMainTabIndex === 2 && (
          <TabContainer>
            <Trips domain="trips" />
          </TabContainer>
        )}
      </div>
    );
  }
}

export default withContents(TravelDashboard);

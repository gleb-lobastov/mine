import React from "react";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import withContents from "state/withContentsHOC";
import Cities from "./blocks/Cities";
import Countries from "./blocks/Countries";

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

class TravelDashboard extends React.PureComponent {
  state = {
    selectedMainTabIndex: 0
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
      </div>
    );
  }
}

export default withContents(TravelDashboard);

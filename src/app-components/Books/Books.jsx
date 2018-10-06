import React from "react";
import styled from "styled-components";
import getTwitterWidgets from "./getTwitterWidgets";

const StyledSection = styled.article`
  max-width: 540px;
`;

const StyledH1 = styled.h1`
  margin-top: 0;
  padding-top: 0;
`;

class Books extends React.PureComponent {
  static propTypes = {};

  static defaultProps = {};

  constructor(...args) {
    super(...args);
    this.containerRef = React.createRef();
    this.state = { isReady: false };
  }

  componentDidMount() {
    const twitterWidgets = getTwitterWidgets();
    twitterWidgets.ready(() => {
      this.setState({ isReady: true });
      twitterWidgets.widgets.createTimeline(
        {
          sourceType: "url",
          url: "https://twitter.com/lobastov"
        },
        this.containerRef.current
      );
    });
  }

  render() {
    const { isReady } = this.state;
    return (
      <StyledSection>
        {!isReady ? (
          <div>Загрузка...</div>
        ) : (
          <StyledH1>Емкость для рецензий</StyledH1>
        )}
        <div ref={this.containerRef} />
      </StyledSection>
    );
  }
}

export default Books;

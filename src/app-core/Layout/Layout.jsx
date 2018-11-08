import React from "react";
import PropTypes from "prop-types";
import "normalize.css";
import styled from "styled-components";
import { Helmet } from "react-helmet";
import Footer from "./blocks/Footer";
import Navigation from "./blocks/Navigation";

const StyledGrid = styled.div`
  font-family: "Roboto", sans-serif;
  font-size: 16px;
  display: grid;
  grid-template-rows: auto min-content;
  grid-template-columns: 1fr min-content;
  height: 100vh;
`;
const StyledMain = styled.main`
  margin: 16px;
`;

const StyledFooter = styled(Footer)`
  grid-column-start: 1;
  grid-column-end: 3;
`;

class Layout extends React.Component {
  static propTypes = {
    children: PropTypes.node
  };

  static defaultProps = {
    children: null
  };

  render() {
    const { children } = this.props;

    return (
      <React.Fragment>
        <Helmet>
          <link
            href="https://fonts.googleapis.com/css?family=Roboto:400,400i,700&amp;subset=cyrillic"
            rel="stylesheet"
          />
        </Helmet>
        <StyledGrid>
          <StyledMain>{children}</StyledMain>
          <Navigation />
          <StyledFooter />
        </StyledGrid>
      </React.Fragment>
    );
  }
}

export default Layout;

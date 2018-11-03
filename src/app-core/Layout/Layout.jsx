import React from "react";
import PropTypes from "prop-types";
import "normalize.css";
import styled from "styled-components";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { routes } from "core/routing";
import Footer from "./Footer";

const StyledGrid = styled.div`
  font-family: "Roboto", sans-serif;
  font-size: 16px;
  display: grid;
  grid-template-rows: auto min-content;
  grid-template-columns: 1fr 200px;
  height: 100vh;
`;
const StyledMain = styled.main`
  margin: 16px;
`;

const StyledFooter = styled(Footer)`
  grid-column-start: 1;
  grid-column-end: 3;
`;

const StyledAside = styled.aside`
  margin-top: 16px;
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
          <StyledAside>
            <Link to={routes.root.toUrl()}> Главная страница </Link>
            <br />
            <Link to={routes.blogRoute.toUrl()}> Читать, что я написал </Link>
            <br />
            <Link to={routes.travelsRoute.toUrl()}>
              Смотреть, где я побывал
            </Link>
            <br />
            <Link to={routes.booksRoute.toUrl()}> Узнать, что я прочитал </Link>
          </StyledAside>
          <StyledFooter />
        </StyledGrid>
      </React.Fragment>
    );
  }
}

export default Layout;

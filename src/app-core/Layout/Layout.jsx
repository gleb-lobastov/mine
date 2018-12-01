import React from 'react';
import PropTypes from 'prop-types';
import 'normalize.css';
import styled from 'styled-components';
import { Helmet } from 'react-helmet';
import AppBar from '@material-ui/core/AppBar';
import Footer from './blocks/Footer';
import NavigationTabs from './blocks/NavigationTabs';

const StyledGrid = styled.div`
  font-family: 'Roboto', sans-serif;
  font-size: 16px;
  display: grid;
  grid-template-rows: min-content auto min-content;
  grid-template-columns: 1fr;
  height: 100vh;
`;
const StyledMain = styled.main`
  margin: 16px;
`;

class Layout extends React.Component {
  static propTypes = {
    children: PropTypes.node,
  };

  static defaultProps = {
    children: null,
  };

  render() {
    const { children } = this.props;

    return (
      <React.Fragment>
        <Helmet>
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
          />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500&amp;subset=cyrillic"
          />
        </Helmet>
        <StyledGrid>
          <AppBar position="static">
            <NavigationTabs />
          </AppBar>
          <StyledMain>{children}</StyledMain>
          <Footer />
        </StyledGrid>
      </React.Fragment>
    );
  }
}

export default Layout;

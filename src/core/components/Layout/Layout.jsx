import React from 'react';
import PropTypes from 'prop-types';
import 'normalize.css';
import styled from 'styled-components';
import { Helmet } from 'react-helmet';
import { withPackages } from 'core/context/AppContext';
import Navigation from './blocks/Navigation/Navigation';

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
    // eslint-disable-next-line react/forbid-prop-types
    packages: PropTypes.array.isRequired, // here relevant only that it is array
  };

  static defaultProps = {
    children: null,
  };

  renderNavigation() {
    const { packages } = this.props;
    if (packages.length <= 1) {
      return null;
    }
    return <Navigation packages={packages} />;
  }

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
          {this.renderNavigation()}
          <StyledMain>{children}</StyledMain>
        </StyledGrid>
      </React.Fragment>
    );
  }
}

export default withPackages(Layout);

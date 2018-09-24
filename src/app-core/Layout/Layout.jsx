import React from 'react';
import PropTypes from 'prop-types';
import 'normalize.css';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { routes } from 'core/routing';
import Footer from './Footer';

const StyledGrid = styled.div`
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
    children: PropTypes.node,
  };

  static defaultProps = {
    children: null,
  };

  render() {
    const {
      children,
    } = this.props;

    return (
      <StyledGrid>
        <StyledMain>
          {children}
        </StyledMain>
        <StyledAside>
          <Link to={routes.root.toUrl()}> Главная страница </Link>
          <br />
          <Link to={routes.blogRoute.toUrl()}> Читать, что я написал </Link>
          <br />
          <Link to={routes.travelsRoute.toUrl()}> Смотреть, где я побывал </Link>
        </StyledAside>
        <StyledFooter />
      </StyledGrid>
    );
  }
}

export default Layout;

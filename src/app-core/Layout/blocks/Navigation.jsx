import React from "react";
import PropTypes from "prop-types";
import * as routes from "core/routing/routes";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

const StyledNav = styled.nav`
  font-size: 48px;
  margin: 16px;
`;

const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  display: block;

  &:hover {
    animation: wiggle 1s ease;
  }

  &.active {
    letter-spacing: 0.1em;
    text-shadow: 4px 4px white, 6px 6px #d7cc88;
  }

  @keyframes wiggle {
    20% {
      transform: translateX(4px);
    }
    40% {
      transform: translateX(-4px);
    }
    60% {
      transform: translateX(2px);
    }
    80% {
      transform: translateX(-1px);
    }
    100% {
      transform: translateX(0);
    }
  }
`;

class Navigation extends React.Component {
  static propTypes = {
    className: PropTypes.string
  };

  static defaultProps = {
    className: undefined
  };

  render() {
    const volatile = Math.random(); // cause StyledNavLink to re-render even if other props are same
    return (
      <StyledNav>
        <StyledNavLink
          to={routes.root.toUrl()}
          exact={true}
          volatile={volatile}
        >
          🏠
        </StyledNavLink>
        <StyledNavLink
          to={routes.blogRoute.toUrl()}
          exact={true}
          volatile={volatile}
        >
          📝
        </StyledNavLink>
        <StyledNavLink
          to={routes.travelsRoute.toUrl()}
          exact={true}
          volatile={volatile}
        >
          🗺
        </StyledNavLink>
        <StyledNavLink
          to={routes.booksRoute.toUrl()}
          exact={true}
          volatile={volatile}
        >
          📚
        </StyledNavLink>
      </StyledNav>
    );
  }
}

export default Navigation;

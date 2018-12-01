import React from "react";
import styled from "styled-components";

const StyledArticle = styled.article`
  margin-bottom: 16px;
`;

const StyledH1 = styled.h1`
  margin-top: 0;
  padding-top: 0;
`;

class Dashboard extends React.PureComponent {
  static propTypes = {};

  static defaultProps = {};

  render() {
    return (
      <section>
        <StyledArticle>
          <StyledH1>Мое, персональное, в интернете</StyledH1>
          <span>Я, Глеб. </span>
          <a href="https://www.linkedin.com/in/glebin">Работаю</a>
          &nbsp;
          <a href="https://github.com/gleb-lobastov">программистом</a>
          <span>. </span>
          <a href="https://tripster.ru/lobastov/">Люблю</a>
          &nbsp;
          <a href="https://my.flightradar24.com/lobastov">быть</a>
          &nbsp;
          <span>в </span>
          <a href="https://lobastov.livejournal.com/tag/%D0%9F%D1%83%D1%82%D0%B5%D1%88%D0%B5%D1%81%D1%82%D0%B2%D0%B8%D0%B5">
            дороге
          </a>
          <span>. Это не все.</span>
        </StyledArticle>
        <StyledArticle>
          Мудрость, которую можно усмотреть на этой странице в том, что большие
          дела начинаются с малого.
        </StyledArticle>
      </section>
    );
  }
}

export default Dashboard;

import React from 'react';
import styled from 'styled-components';

const StyledArticle = styled.article`
  margin-bottom: 16px;
`;

class Dashboard extends React.PureComponent {
  static propTypes = {};

  static defaultProps = {};

  render() {
    return (
      <section>
        <StyledArticle>
          <a href="https://github.com/gleb-lobastov">
            Ссылка на гитхаб, пока больше нечего предложить
          </a>
        </StyledArticle>
      </section>
    );
  }
}

export default Dashboard;

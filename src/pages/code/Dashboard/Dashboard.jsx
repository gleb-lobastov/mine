import React from 'react';
import styled from 'styled-components';

const StyledArticle = styled.article`
  margin-bottom: 16px;
`;

class Dashboard extends React.PureComponent {
  static propTypes = {};

  static defaultProps = {};

  componentDidMount() {
    window.location.replace('https://github.com/gleb-lobastov');
  }

  render() {
    return (
      <section>
        <StyledArticle>
          <a href="https://github.com/gleb-lobastov">
            Пока что ссылка и редирект на гитхаб
          </a>
        </StyledArticle>
      </section>
    );
  }
}

export default Dashboard;

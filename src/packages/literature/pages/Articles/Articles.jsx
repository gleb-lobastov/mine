import React from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import { withPaths } from 'core/context/AppContext';
import { Link } from 'react-router-dom';

const ArticlesList = styled.div`
  margin: 24px 0;
`;

export default withPaths(({ namedPaths: routes }) => (
  <ArticlesList>
    <div>
      <Button
        component={Link}
        to={routes.literature.article.toUrl({ slug: 'chaldini' })}
      >
        &laquo;Психология убеждения&raquo; Чалдини
      </Button>
    </div>
    <div>
      <Button
        component={Link}
        to={routes.literature.article.toUrl({ slug: 'blackSwan' })}
      >
        &laquo;Черный лебедь&raquo; Талеба
      </Button>
    </div>
  </ArticlesList>
));

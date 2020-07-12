import React from 'react';
import { withRouter } from 'react-router';
import DBArticle from '../../../Article';

const selectArticle = slug => {
  switch (slug) {
    case 'chaldini':
      return React.lazy(() =>
        import(/* webpackChunkName: 'literature-Chaldini' */ './designed/Chaldini'),
      );
    case 'blackSwan':
      return React.lazy(() =>
        import(/* webpackChunkName: 'literature-BlackSwan' */ './designed/BlackSwan'),
      );
    case 'importThis':
      return React.lazy(() =>
        import(/* webpackChunkName: 'literature-ImportThis' */ './designed/ImportThis'),
      );
    default:
      return DBArticle;
  }
};

const Article = ({ slug }) => {
  const ArticleComponent = selectArticle(slug);
  if (!ArticleComponent) {
    return <div>Статья не найдена</div>;
  }
  return <ArticleComponent slug={slug} />;
};

export default withRouter(Article);

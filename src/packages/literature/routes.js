import React from 'react';

export default mountPath => {
  const entry = {
    routeName: 'entry',
    path: mountPath,
    Component: React.lazy(() =>
      import(/* webpackChunkName: 'literature-Dashboard' */ './pages/Dashboard'),
    ),
  };

  const articles = {
    routeName: 'articles',
    path: `${mountPath}/articles`,
    Component: React.lazy(() =>
      import(/* webpackChunkName: 'literature-Articles' */ './pages/Articles'),
    ),
  };

  const article = {
    routeName: 'article',
    path: `${articles.path}/:slug`,
    Component: React.lazy(() =>
      import(/* webpackChunkName: 'literature-Article' */ './pages/Article'),
    ),
  };

  const books = {
    routeName: 'books',
    path: `${mountPath}/volume`,
    Component: React.lazy(() =>
      import(/* webpackChunkName: 'literature-Books' */ './pages/Books'),
    ),
  };
  // articles.preload = article;

  const blog = {
    routeName: 'blog',
    path: `${mountPath}/bolg`,
    Component: React.lazy(() =>
      import(/* webpackChunkName: 'literature-Blog' */ './pages/Blog'),
    ),
  };

  return {
    routes: [entry, books, articles, article, blog],
    menu: [
      { routeName: 'entry', caption: 'Об' },
      { routeName: 'articles', caption: 'Статьи' },
      { routeName: 'books', caption: 'Рецензии' },
      { routeName: 'blog', caption: 'Болг' },
    ],
  };
};

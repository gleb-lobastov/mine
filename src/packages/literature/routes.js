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
    path: `${mountPath}/articles/:tag(summary|code)?/:slug?`,
    Component: React.lazy(() =>
      import(/* webpackChunkName: 'literature-Articles' */ './pages/Articles'),
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
    routes: [entry, books, articles, blog],
    menu: [
      { routeName: 'entry', caption: 'Об' },
      { routeName: 'articles', caption: 'Статьи' },
      { routeName: 'books', caption: 'Рецензии' },
      { routeName: 'blog', caption: 'Болг' },
    ],
  };
};

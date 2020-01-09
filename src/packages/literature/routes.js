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

  const quotes = {
    routeName: 'quotes',
    path: `${mountPath}/quotes`,
    Component: React.lazy(() =>
      import(/* webpackChunkName: 'literature-Blog' */ './pages/Quotes'),
    ),
  };

  const blog = {
    routeName: 'blog',
    path: `${mountPath}/bolg`,
    Component: React.lazy(() =>
      import(/* webpackChunkName: 'literature-Blog' */ './pages/Blog'),
    ),
  };

  return {
    routesDict: { entry, books, articles, quotes, blog },
    routes: [entry, books, articles, quotes, blog],
  };
};

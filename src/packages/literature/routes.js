import React from 'react';

export default mountPath => {
  const entry = {
    path: mountPath,
    Component: React.lazy(() =>
      import(/* webpackChunkName: 'literature-Dashboard' */ './pages/Dashboard'),
    ),
  };

  const articles = {
    path: `${mountPath}/articles/:tag(summary|code)?/:slug?`,
    Component: React.lazy(() =>
      import(/* webpackChunkName: 'literature-Articles' */ './pages/Articles'),
    ),
  };

  const books = {
    path: `${mountPath}/volume`,
    Component: React.lazy(() =>
      import(/* webpackChunkName: 'literature-Books' */ './pages/Books'),
    ),
  };
  // articles.preload = article;

  const quotes = {
    path: `${mountPath}/quotes`,
    Component: React.lazy(() =>
      import(/* webpackChunkName: 'literature-Blog' */ './pages/Quotes'),
    ),
  };

  const blog = {
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

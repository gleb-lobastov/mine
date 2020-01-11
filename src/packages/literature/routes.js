import React from 'react';

export const entry = {
  path: '/',
  Component: React.lazy(() =>
    import(/* webpackChunkName: 'literature-Dashboard' */ './pages/Dashboard'),
  ),
};

export const articles = {
  path: '/articles/:tag(summary|code)?/:slug?',
  Component: React.lazy(() =>
    import(/* webpackChunkName: 'literature-Articles' */ './pages/Articles'),
  ),
};

export const books = {
  path: '/volume',
  Component: React.lazy(() =>
    import(/* webpackChunkName: 'literature-Books' */ './pages/Books'),
  ),
};

export const quotes = {
  path: '/quotes',
  Component: React.lazy(() =>
    import(/* webpackChunkName: 'literature-Blog' */ './pages/Quotes'),
  ),
};

export const blog = {
  path: '/bolg',
  Component: React.lazy(() =>
    import(/* webpackChunkName: 'literature-Blog' */ './pages/Blog'),
  ),
};

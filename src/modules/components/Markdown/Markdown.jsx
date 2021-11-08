import React from 'react';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

const components = {
  a: ({ href, children }) =>
    href.startsWith && href.startsWith('/') ? (
      <Link to={href}>{children}</Link>
    ) : (
      <a href={href}>{children}</a>
    ),
};

export default ({ children, forwardedProps }) => (
  <ReactMarkdown {...forwardedProps} components={components}>
    {children}
  </ReactMarkdown>
);

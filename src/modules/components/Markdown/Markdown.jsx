import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

const renderers = {
  link: ({ href, children }) =>
    href.startsWith && href.startsWith('/') ? (
      <Link to={href}>{children}</Link>
    ) : (
      <a href={href}>{children}</a>
    ),
};
renderers.link.propTypes = {
  href: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.string]).isRequired,
};

export default forwardedProps => (
  <ReactMarkdown {...forwardedProps} renderers={renderers} />
);

import React from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';
import { articlePropTypes } from 'content/contents.types';

class Article extends React.PureComponent {
  static propTypes = {
    source: PropTypes.shape(articlePropTypes).isRequired,
  };

  assembleContent() {
    const {
      source: {
        content,
        date,
        header,
      },
    } = this.props;

    return `### ${header} (*${date}*)\n\n${content}`;
  }

  render() {
    return (
      <article>
        <ReactMarkdown source={this.assembleContent()} />
      </article>
    );
  }
}

export default Article;

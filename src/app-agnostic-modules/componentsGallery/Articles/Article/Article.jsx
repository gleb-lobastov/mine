import React from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';
import format from 'date-fns/format';
import ru from 'date-fns/locale/ru';
import { articlePropTypes } from 'content/contents.types';

class Article extends React.PureComponent {
  static propTypes = {
    source: PropTypes.shape(articlePropTypes).isRequired,
  };

  assembleContent() {
    const {
      source: { content, date, header },
    } = this.props;

    return `### ${header} (*${format(date, 'D MMMM YYYY', {
      locale: ru,
    })}*)\n\n${content}`;
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

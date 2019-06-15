import React from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';
import format from 'date-fns/format';
import ru from 'date-fns/locale/ru';

class Post extends React.PureComponent {
  static propTypes = {
    source: PropTypes.shape({
      date: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
    }).isRequired,
  };

  assembleContent() {
    const {
      source: { content, date, header },
    } = this.props;

    return `### ${header} (*${format(date, 'eeeeee, d MMMM yyyy', {
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

export default Post;

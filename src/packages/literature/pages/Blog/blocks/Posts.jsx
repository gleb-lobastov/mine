import React from 'react';
import PropTypes from 'prop-types';
import Post from './Post';

const sortByDateDesc = ({ date: dateA }, { date: dateB }) => {
  if (dateA > dateB) {
    return -1;
  }
  if (dateA < dateB) {
    return 1;
  }
  return 0;
};

class Posts extends React.PureComponent {
  static propTypes = {
    source: PropTypes.arrayOf(
      PropTypes.shape({
        date: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired,
        id: PropTypes.number.isRequired,
      }),
    ).isRequired,
  };

  render() {
    const { source } = this.props;

    return (
      <section>
        {source.sort(sortByDateDesc).map(article => (
          <Post key={`article${article.id}`} source={article} />
        ))}
      </section>
    );
  }
}

export default Posts;

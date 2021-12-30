import React from 'react';
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
  render() {
    const { source } = this.props;

    return (
      <section>
        {source.sort(sortByDateDesc).map(post => (
          <Post key={`post${post.id}`} source={post} />
        ))}
      </section>
    );
  }
}

export default Posts;

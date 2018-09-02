import React from 'react';
import PropTypes from 'prop-types';
import { articlePropTypes } from 'content/contents.types';
import Article from './Article';

const sortByDateDesc = ({ date: dateA }, { date: dateB }) => {
  if (dateA > dateB) {
    return -1;
  }
  if (dateA < dateB) {
    return 1;
  }
  return 0;
};

class Articles extends React.PureComponent {
  static propTypes = {
    source: PropTypes.arrayOf(
      PropTypes.shape(articlePropTypes),
    ).isRequired,
  };

  static defaultProps = {
    source: [],
  };

  render() {
    const {
      source,
    } = this.props;

    return (
      <section>
        {source.sort(sortByDateDesc).map(article => (
          <Article key={`article${article.id}`} source={article} />
        ))}
      </section>
    );
  }
}

export default Articles;

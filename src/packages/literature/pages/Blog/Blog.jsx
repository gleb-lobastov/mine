import React from 'react';
import PropTypes from 'prop-types';
import withProvision from 'core/connection/withProvision';
import Posts from './blocks/Posts';

const articlePropTypes = {
  date: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
};

const contentsPropTypes = {
  articles: PropTypes.arrayOf(PropTypes.shape(articlePropTypes)),
};

class Blog extends React.PureComponent {
  static propTypes = {
    provision: PropTypes.shape(contentsPropTypes).isRequired,
  };

  render() {
    const { articles: { data: articlesList = [] } = {} } = this.props;

    return <Posts source={articlesList} />;
  }
}

const mapStateToRequirements = () => ({
  require: { articles: { modelName: 'articles' } },
  meta: {
    domain: 'blog',
  },
});

export default withProvision(mapStateToRequirements)(Blog);

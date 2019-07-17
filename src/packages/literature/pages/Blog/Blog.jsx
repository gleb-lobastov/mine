import React from 'react';
import PropTypes from 'prop-types';
import withProvision from 'core/connection/withProvision';
import articlePropTypes from 'literature/models/articles/propTypes';
import Posts from './blocks/Posts';

class Blog extends React.PureComponent {
  static propTypes = {
    articles: PropTypes.shape({
      data: PropTypes.arrayOf(PropTypes.shape(articlePropTypes)),
    }).isRequired,
  };

  render() {
    const { articles: { data: articlesList = [] } = {} } = this.props;

    return <Posts source={articlesList} />;
  }
}

const mapStateToRequirements = () => ({
  domain: 'blogPage',
  require: {
    articles: {
      modelName: 'articles',
      query: { navigation: { isDisabled: true } },
    },
  },
});

export default withProvision(mapStateToRequirements)(Blog);

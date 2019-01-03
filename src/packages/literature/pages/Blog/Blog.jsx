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
    const {
      provision: { articles },
    } = this.props;

    return <Posts source={articles} />;
  }
}

const mapStateToRequirements = () => ({
  require: 'articles',
  meta: {
    domain: 'blog',
  },
});

export default withProvision(mapStateToRequirements)(Blog);

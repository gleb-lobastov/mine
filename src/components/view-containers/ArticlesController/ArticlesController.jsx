import React from 'react';
import PropTypes from 'prop-types';
import { contentsPropTypes } from 'Content/contents.types';
import withContents from 'Components/app-state/withContentsHOC';
import Articles from 'Components/app-agnostic/Articles/Articles';

class ArticlesController extends React.PureComponent {
  static propTypes = {
    contents: PropTypes.shape(contentsPropTypes).isRequired,
  };

  render() {
    const {
      contents,
    } = this.props;

    return (
      <Articles source={contents.articles} />
    );
  }
}

export default withContents(ArticlesController);

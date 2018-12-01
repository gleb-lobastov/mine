import React from 'react';
import PropTypes from 'prop-types';
import { contentsPropTypes } from 'content/contents.types';
import withContents from 'state/withContentsHOC';
import Articles from 'modules/componentsGallery/Articles/index';

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

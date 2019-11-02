import React from 'react';
import PropTypes from 'prop-types';
import withProvision from 'core/connection/withProvision';
import articlePropTypes from 'literature/models/articles/propTypes';
import Posts from 'literature/pages/Blog/blocks/Posts';

class Quotes extends React.PureComponent {
  static propTypes = {
    quotes: PropTypes.shape({
      data: PropTypes.arrayOf(PropTypes.shape(articlePropTypes)),
    }).isRequired,
  };

  render() {
    const { quotes: { data: quotesList = [] } = {} } = this.props;

    return <Posts source={quotesList} />;
  }
}

const mapStateToRequirements = () => ({
  domain: 'quotesPage',
  request: {
    quotes: {
      modelName: 'quotes',
      query: { navigation: { isDisabled: true } },
    },
  },
});

export default withProvision(mapStateToRequirements)(Quotes);

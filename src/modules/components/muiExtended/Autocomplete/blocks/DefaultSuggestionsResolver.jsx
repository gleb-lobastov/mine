import React from 'react';
import PropTypes from 'prop-types';

const DefaultSuggestionRender = ({ suggestions, children: renderProp }) => (
  <React.Fragment>{renderProp(suggestions)}</React.Fragment>
);

DefaultSuggestionRender.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  suggestions: PropTypes.array,
  children: PropTypes.func.isRequired,
};

DefaultSuggestionRender.defaultProps = { suggestions: [] };

export default DefaultSuggestionRender;

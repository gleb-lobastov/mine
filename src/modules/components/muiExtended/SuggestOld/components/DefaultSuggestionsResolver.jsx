import React from 'react';
import PropTypes from 'prop-types';

const DefaultSuggestionResolver = ({
  inputValue,
  sourceProps: { suggestions = [] } = {},
  children: renderProp,
}) => {
  const lowerCaseInputValue = inputValue.toLowerCase();
  return (
    <React.Fragment>
      {renderProp(
        suggestions.filter(({ label }) =>
          label.toLowerCase().includes(lowerCaseInputValue),
        ),
      )}
    </React.Fragment>
  );
};

DefaultSuggestionResolver.propTypes = {
  inputValue: PropTypes.string.isRequired,
  sourceProps: PropTypes.shape({
    // eslint-disable-next-line react/forbid-prop-types
    suggestions: PropTypes.array,
  }).isRequired,
  children: PropTypes.func.isRequired,
};

export default DefaultSuggestionResolver;

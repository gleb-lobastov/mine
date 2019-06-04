import React from 'react';
import PropTypes from 'prop-types';
import MenuItem from '@material-ui/core/MenuItem';

const DefaultSuggestionRender = suggestionProps => {
  const {
    suggestion,
    index,
    itemProps,
    highlightedIndex,
    selectedItem,
  } = suggestionProps;
  const isHighlighted = highlightedIndex === index;
  const isSelected = (selectedItem || '').indexOf(suggestion.label) > -1;

  return (
    <MenuItem
      {...itemProps}
      key={suggestion.label}
      selected={isHighlighted}
      component="div"
      style={{
        fontWeight: isSelected ? 500 : 400,
      }}
    >
      {suggestion.label}
    </MenuItem>
  );
};

DefaultSuggestionRender.propTypes = {
  highlightedIndex: PropTypes.number,
  index: PropTypes.number,
  // eslint-disable-next-line
  itemProps: PropTypes.object,
  selectedItem: PropTypes.string,
  suggestion: PropTypes.shape({ label: PropTypes.string }).isRequired,
};

DefaultSuggestionRender.defaultProps = {
  highlightedIndex: undefined,
  index: undefined,
  itemProps: undefined,
  selectedItem: undefined,
};

export default DefaultSuggestionRender;

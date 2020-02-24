import React from 'react';
import PropTypes from 'prop-types';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';

const DefaultSuggestionRender = ({
  itemProps,
  isHighlighted,
  isSelected,
  children: { label, details },
}) => (
  <MenuItem
    {...itemProps}
    selected={isHighlighted}
    component="div"
    style={{
      fontWeight: isSelected ? 500 : 400,
    }}
  >
    <ListItemText primary={label} secondary={details} />
  </MenuItem>
);

DefaultSuggestionRender.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  itemProps: PropTypes.object,
  isHighlighted: PropTypes.bool,
  isSelected: PropTypes.bool,
  children: PropTypes.func.isRequired,
};

DefaultSuggestionRender.defaultProps = {
  itemProps: undefined,
  isHighlighted: false,
  isSelected: false,
};

export default DefaultSuggestionRender;

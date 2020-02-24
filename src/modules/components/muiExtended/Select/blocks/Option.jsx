import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';

export default function Option({
  isHighlighted,
  isSelected,
  option,
  ...forwardedProps
}) {
  return (
    <MenuItem
      component="div"
      selected={isHighlighted}
      style={{ fontWeight: isSelected ? 500 : 400 }}
      {...forwardedProps}
    >
      <ListItemText primary={option.label} secondary={option.details} />
    </MenuItem>
  );
}

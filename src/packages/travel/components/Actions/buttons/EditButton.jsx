import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import * as locators from '../locators';

export default function EditButton({ onClick, ...forwardingProps }) {
  return (
    <IconButton
      data-locator={locators.EDIT_BUTTON}
      size="small"
      variant="outlined"
      color="primary"
      component="button"
      onClick={onClick}
      {...forwardingProps}
    >
      <EditIcon />
    </IconButton>
  );
}

EditButton.defaultProps = {};

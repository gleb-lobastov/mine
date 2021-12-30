import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import * as locators from '../locators';

export default function CreateButton({ onClick, ...forwardingProps }) {
  return (
    <IconButton
      data-locator={locators.CREATE_BUTTON}
      size="small"
      variant="outlined"
      color="primary"
      component="button"
      onClick={onClick}
      {...forwardingProps}
    >
      <AddCircleIcon />
    </IconButton>
  );
}

CreateButton.defaultProps = {};

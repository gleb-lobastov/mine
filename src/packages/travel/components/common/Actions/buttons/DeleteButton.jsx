import React from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import * as locators from '../locators';

export default function DeleteButton({ onClick, ...forwardingProps }) {
  return (
    <IconButton
      data-locator={locators.DELETE_BUTTON}
      size="small"
      variant="outlined"
      color="primary"
      component="button"
      onClick={onClick}
      {...forwardingProps}
    >
      <DeleteIcon />
    </IconButton>
  );
}

DeleteButton.propTypes = {};

DeleteButton.defaultProps = {};

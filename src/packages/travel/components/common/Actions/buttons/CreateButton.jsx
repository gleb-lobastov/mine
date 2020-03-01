import React from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import AddCircleIcon from '@material-ui/icons/AddCircle';

export default function CreateButton({ onClick, ...forwardingProps }) {
  return (
    <IconButton
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

CreateButton.propTypes = {};

CreateButton.defaultProps = {};

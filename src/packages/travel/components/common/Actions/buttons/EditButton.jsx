import React from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';

export default function EditButton({ onClick, ...forwardingProps }) {
  return (
    <IconButton
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

EditButton.propTypes = {};

EditButton.defaultProps = {};

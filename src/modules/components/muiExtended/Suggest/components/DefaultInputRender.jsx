import React from 'react';
import TextField from '@material-ui/core/TextField';

export default ({ inputProps, classes, ref, ...other }) => (
  <TextField
    InputProps={{
      inputRef: ref,
      classes: {
        root: classes.inputRoot,
        input: classes.inputInput,
      },
      ...inputProps,
    }}
    {...other}
  />
);

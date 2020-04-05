import React from 'react';
import omit from 'lodash/omit';
import TextField from '@material-ui/core/TextField';

export default function Trigger({ classes, triggerProps, triggerInputProps }) {
  return (
    <TextField
      InputProps={{
        classes: {
          root: classes.inputRoot,
          input: classes.inputInput,
        },
        ...triggerInputProps,
      }}
      fullWidth={true}
      classes={omit(classes, 'inputRoot', 'inputInput')}
      {...triggerProps}
    />
  );
}

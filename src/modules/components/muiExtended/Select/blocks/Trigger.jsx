import React, { useEffect, useRef } from 'react';
import TextField from '@material-ui/core/TextField';

export default function Trigger({
  classes,
  triggerProps,
  triggerInputProps,
  // inputValue,
  // onChange,
}) {
  // const inputValueRef = useRef(inputValue);
  // useEffect(
  //   () => {
  //     const prevInputValue = inputValueRef.current;
  //     inputValueRef.current = inputValue;
  //     if (prevInputValue !== inputValue) {
  //       onChange(inputValue);
  //     }
  //   },
  //   [inputValue, onChange],
  // );
  return (
    <TextField
      InputProps={{
        // inputRef: ref,
        classes: {
          root: classes.inputRoot,
          input: classes.inputInput,
        },
        ...triggerInputProps,
      }}
      fullWidth={true}
      classes={classes}
      {...triggerProps}
    />
  );
}

import React, { useState, useCallback, useMemo } from 'react';
import Select from '../Select';
import useSuggest, { QUERY_FORMATS } from './useSuggest';

export { QUERY_FORMATS };
export default function Suggest({
  classes: customClasses,
  inputProps,
  triggerProps,
  sourceProps,
  transformSuggestionToOption = suggestion => suggestion,
  ...forwardingProps
}) {
  const [inputValue, setInputValue] = useState('');
  const { suggestions } = useSuggest({ ...sourceProps, inputValue });
  const handleInputChange = useCallback(event => {
    setInputValue(event.target?.value);
  });
  const actualInputProps = useMemo(
    () => ({
      ...inputProps,
      onChange: handleInputChange,
    }),
    [inputProps, handleInputChange],
  );

  const options = useMemo(() => suggestions.map(transformSuggestionToOption), [
    suggestions,
  ]);

  return (
    <Select
      classes={customClasses}
      inputProps={actualInputProps}
      triggerProps={triggerProps}
      options={options}
      {...forwardingProps}
    />
  );
}

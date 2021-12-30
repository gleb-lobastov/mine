import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

const styles = {
  container: {
    display: 'block',
  },
  selectRoot: {
    display: 'block',
  },
};

const OptionsSelect = ({
  'data-locator': dataLocator,
  caption,
  classes,
  hasNullOption,
  inputId,
  name,
  onChange: handleChange,
  optionRender,
  options,
  value,
}) => (
  <div data-locator={dataLocator} className={classes.container}>
    <InputLabel component="label" shrink={true} htmlFor={inputId}>
      {caption}
    </InputLabel>
    <Select
      name={name}
      value={value}
      displayEmpty={true}
      onChange={handleChange}
      input={<Input id={inputId} />}
      className={classes.selectRoot}
      MenuProps={{ 'data-locator': `options-${inputId}` }}
    >
      {hasNullOption && (
        <MenuItem data-locator="option-null" key={null} value={null}>
          {optionRender({ option: null, index: -1, options })}
        </MenuItem>
      )}
      {options.map((option, index) => (
        <MenuItem data-locator={`option-${option}`} key={option} value={option}>
          {optionRender({ option, index, options })}
        </MenuItem>
      ))}
    </Select>
  </div>
);

OptionsSelect.defaultProps = {
  name: undefined,
  hasNullOption: true,
  optionRender: ({ option }) => option || '',
  options: [],
  value: undefined,
};

export default withStyles(styles)(OptionsSelect);

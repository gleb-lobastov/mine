import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

const styles = {
  container: {
    display: 'inline-block',
    flexGrow: '1',
    flexBasis: '0',
  },
  selectRoot: {
    display: 'block',
  },
};

const OptionsSelect = ({
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
  <div className={classes.container}>
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
    >
      {hasNullOption && (
        <MenuItem key={null} value={null}>
          {optionRender({ option: null, index: -1, options })}
        </MenuItem>
      )}
      {options.map((option, index) => (
        <MenuItem key={option} value={option}>
          {optionRender({ option, index, options })}
        </MenuItem>
      ))}
    </Select>
  </div>
);

const valuePropTypes = PropTypes.oneOfType([
  PropTypes.number,
  PropTypes.string,
]);
OptionsSelect.propTypes = {
  name: PropTypes.string,
  caption: PropTypes.string.isRequired,
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  hasNullOption: PropTypes.bool,
  inputId: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  optionRender: PropTypes.func,
  options: PropTypes.arrayOf(valuePropTypes),
  value: valuePropTypes,
};

OptionsSelect.defaultProps = {
  name: undefined,
  hasNullOption: true,
  optionRender: ({ option }) => option || '',
  options: [],
  value: undefined,
};

export default withStyles(styles)(OptionsSelect);

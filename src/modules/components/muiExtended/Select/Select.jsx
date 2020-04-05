import React from 'react';
import Downshift from 'downshift';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Overlay from './blocks/Overlay';
import Trigger from './blocks/Trigger';

const useStyles = makeStyles(theme => ({
  root: {},
  container: {},
  paper: {
    position: 'absolute',
    zIndex: 1,
    marginTop: theme.spacing(1),
    left: 0,
    right: 0,
  },
  inputRoot: {},
  inputInput: {},
}));

const defaultItemToString = item => {
  const { label } = item || {};
  return label;
};

// export default ({ inputProps, classes, ref, ...other }) => {};
export default function Select({
  'data-locator': dataLocator,
  classes: customClasses,
  options,
  inputProps,
  triggerProps,
  ...downshiftProps
}) {
  const classes = { ...useStyles(), ...customClasses };
  return (
    <div data-locator={dataLocator} className={classes.root}>
      <Downshift itemToString={defaultItemToString} {...downshiftProps}>
        {({
          getInputProps,
          getItemProps,
          getMenuProps,
          highlightedIndex,
          inputValue,
          isOpen,
          selectedItem,
        }) => (
          <div className={classes.container}>
            <Trigger
              classes={classes}
              inputValue={inputValue}
              triggerProps={triggerProps}
              triggerInputProps={getInputProps(inputProps)}
            />
            <Overlay
              isOpen={isOpen}
              options={options}
              classes={classes}
              getMenuProps={getMenuProps}
              getItemProps={getItemProps}
              selectedItem={selectedItem}
              highlightedIndex={highlightedIndex}
            />
          </div>
        )}
      </Downshift>
    </div>
  );
}

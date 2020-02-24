import React from 'react';
import Paper from '@material-ui/core/Paper';
import Option from './Option';

export default function Overlay({
  isOpen,
  options,
  classes,
  getMenuProps,
  getItemProps,
  selectedItem,
  highlightedIndex,
}) {
  return (
    <div {...getMenuProps()}>
      {isOpen && (
        <Paper className={classes.paper} square={true}>
          {options.map((option, index) => (
            <Option
              key={option.label}
              {...getItemProps({ item: option })}
              isHighlighted={highlightedIndex === index}
              isSelected={
                Boolean(selectedItem) && selectedItem.label === option.label
              }
              option={option}
            />
          ))}
        </Paper>
      )}
    </div>
  );
}

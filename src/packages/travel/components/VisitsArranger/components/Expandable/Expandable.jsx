import React, { useState } from 'react';
import ExpandableActions from './components/ExpandableActions';

const DEFAULT_ALWAYS_EXPANDED_ITEMS_COUNT = 10;
const DEFAULT_COLLAPSIBLE_THRESHOLD = 2;

export default function Expandable({
  classes,
  collapsible,
  children,
  items: originalItems,
  onExpand,
  onExpandAll,
  alwaysExpandedItemsCount,
  collapsibleThreshold,
}) {
  const [collapsed, setCollapsed] = useState(true);

  const actualCollapsible =
    collapsible &&
    originalItems.length > alwaysExpandedItemsCount + collapsibleThreshold;

  const actualCollapsed = actualCollapsible && collapsed;

  const actualItems = actualCollapsed
    ? originalItems.slice(0, alwaysExpandedItemsCount)
    : originalItems;

  return (
    <>
      {children({ items: actualItems })}
      {actualCollapsed && (
        <ExpandableActions
          className={classes.actions}
          diffCount={originalItems.length - actualItems.length}
          onExpand={event => {
            if (onExpand) {
              onExpand(event);
            }
            setCollapsed(false);
          }}
          onExpandAll={onExpandAll}
        />
      )}
    </>
  );
}

Expandable.defaultProps = {
  alwaysExpandedItemsCount: DEFAULT_ALWAYS_EXPANDED_ITEMS_COUNT,
  collapsibleThreshold: DEFAULT_COLLAPSIBLE_THRESHOLD,
};

import React, { forwardRef } from 'react';
import Virtualized from './components/Virtualized';
import BypassVirtualized from './components/BypassVirtualized';

export default forwardRef(function Virtualizer(
  { children, items, bypass, ...forwardingProps },
  ref,
) {
  const Component = bypass ? BypassVirtualized : Virtualized;
  return (
    <Component ref={ref} items={items} {...forwardingProps}>
      {children}
    </Component>
  );
});

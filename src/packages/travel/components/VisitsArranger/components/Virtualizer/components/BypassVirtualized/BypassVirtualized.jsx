import React, { forwardRef, useImperativeHandle } from 'react';

export default forwardRef(function BypassVirtualized({ children, items }, ref) {
  useImperativeHandle(ref, () => ({
    measure: noop,
  }));

  return (
    <>
      {items.map((item, index) =>
        children({
          item,
          virtualItem: null,
          index,
          measure: noop,
        }),
      )}
    </>
  );
});

function noop() {
  return null;
}

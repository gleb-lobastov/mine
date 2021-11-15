import React, { useRef, forwardRef, useImperativeHandle } from 'react';
import { useVirtual } from 'modules/utilities/virtual';

export default forwardRef(function Virtualized(
  { children, items: originalItems, overscan },
  ref,
) {
  const parentRef = useRef();

  const { virtualItems, totalSize, measure } = useVirtual({
    parentRef,
    size: originalItems.length,
    estimateSize,
    overscan,
  });

  useImperativeHandle(ref, () => ({
    measure,
  }));

  return (
    <div ref={parentRef} style={{ height: totalSize }}>
      <div style={{ height: totalSize, position: 'relative' }}>
        {virtualItems.map(virtualItem => (
          <div
            key={virtualItem.index}
            ref={virtualItem.measureRef}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              transform: `translateY(${virtualItem.start}px)`,
            }}
          >
            {children({
              item: originalItems[virtualItem.index],
              virtualItem,
              index: virtualItem.index,
              measure,
            })}
          </div>
        ))}
      </div>
    </div>
  );
});

function estimateSize() {
  return 500;
}

import React, { useCallback } from 'react';
import {
  SortableContainer as SortableContainerHOC,
  SortableElement as SortableElementHOC,
} from 'react-sortable-hoc';
import checkIsNodeNotSortable from 'modules/utilities/dom/checkIsNodeNotSortable';

const SortableContainer = SortableContainerHOC(({ children }) => (
  <div>{children}</div>
));
const SortableElement = SortableElementHOC(({ node }) => node);

export default function Sortable({ children, onSortEnd }) {
  return (
    <SortableContainer
      onSortEnd={onSortEnd}
      shouldCancelStart={checkIsNodeNotSortable}
      lockAxis="y"
      lockToContainerEdges={true}
    >
      {React.Children.map(children, (node, index) => (
        <SortableElement node={node} index={index} />
      ))}
    </SortableContainer>
  );
}

import React from 'react';
import {
  SortableContainer as SortableContainerHOC,
  SortableElement as SortableElementHOC,
} from 'react-sortable-hoc';
import checkIsNodeNotSortable from 'modules/utilities/dom/checkIsNodeNotSortable';

const SortableContainer = SortableContainerHOC(({ children, className }) => (
  <div className={className}>{children}</div>
));
const SortableElement = SortableElementHOC(({ node }) => node);

export default function Sortable({ children, ...forwardingProps }) {
  return (
    <SortableContainer
      shouldCancelStart={checkIsNodeNotSortable}
      lockAxis="y"
      lockToContainerEdges={true}
      {...forwardingProps}
    >
      {React.Children.map(children, (node, index) => (
        <SortableElement node={node} index={index} />
      ))}
    </SortableContainer>
  );
}

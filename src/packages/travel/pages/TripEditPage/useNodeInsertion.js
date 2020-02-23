import React, { useState } from 'react';
import { withItem } from 'modules/utilities/types/array';

export default function useNodeInsertion(nodes, nodeToInsert) {
  const [indexToInsert, setIndexToInsert] = useState(0);
  const nodesWithInsertedNode = withItem(nodes, nodeToInsert, indexToInsert);
  return [nodesWithInsertedNode, indexToInsert, setIndexToInsert];
}

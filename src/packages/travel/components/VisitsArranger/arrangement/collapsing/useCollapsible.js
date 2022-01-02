import { useCallback, useEffect, useState } from 'react';

export default function useCollapsible({
  allowCollapsible,
  onToggleCollapsible,
}) {
  const [collapsible, setCollapsible] = useState(true);
  const disableCollapsible = useCallback(() => setCollapsible(false), []);
  useEffect(onToggleCollapsible, [collapsible]);
  const actualCollapsible = collapsible && allowCollapsible;

  return { collapsible: actualCollapsible, setCollapsible, disableCollapsible };
}

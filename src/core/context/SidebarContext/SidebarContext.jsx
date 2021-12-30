import React, { useContext, useMemo, useEffect, useState } from 'react';

const SidebarContext = React.createContext({
  sidebarContentNode: null,
  setSidebarContent: () => {},
});

export default function SidebarContextProvider({ children }) {
  const [sidebarContentNode, setSidebarContent] = useState(null);

  const sidebarContextValue = useMemo(
    () => ({ sidebarContentNode, setSidebarContent }),
    [sidebarContentNode],
  );

  return (
    <SidebarContext.Provider value={sidebarContextValue}>
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebarContent({ closeSidebar }) {
  const { sidebarContentNode } = useContext(SidebarContext);
  if (!sidebarContentNode) {
    return null;
  }
  return React.cloneElement(sidebarContentNode, { closeSidebar });
}

export function useSidebar(SidebarContentComponent, inputs = []) {
  const { setSidebarContent } = useContext(SidebarContext);

  useEffect(() => {
    setSidebarContent(<SidebarContentComponent />);
    return () => {
      setSidebarContent(null);
    };
  }, inputs);
}

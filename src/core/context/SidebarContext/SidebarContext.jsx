import React, { useContext, useMemo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const SidebarContext = React.createContext({});

export default function SidebarContextProvider({ children }) {
  const [sidebarContentNode, setSidebarContent] = useState([]);

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

SidebarContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export function useSidebarContent() {
  const { sidebarContentNode } = useContext(SidebarContext);
  return sidebarContentNode;
}

export function useSidebar(sidebarContentRenderer, inputs = []) {
  const { setSidebarContent } = useContext(SidebarContext);

  useEffect(() => {
    setSidebarContent(<div>{sidebarContentRenderer()}</div>);
    return () => {
      setSidebarContent(null);
    };
  }, inputs);
}

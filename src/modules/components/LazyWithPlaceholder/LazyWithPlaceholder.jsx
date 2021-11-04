import React, { useState, useCallback } from 'react';
import LazyLoad from 'react-lazy-load';

export default function LazyWithPlaceholder({
  placeholder,
  children,
  ...forwardingProps
}) {
  const [loaded, setLoaded] = useState(false);
  const handleVisible = useCallback(() => setLoaded(true), []);

  return (
    <>
      {!loaded && placeholder}
      <LazyLoad {...forwardingProps} onContentVisible={handleVisible}>
        {children}
      </LazyLoad>
    </>
  );
}

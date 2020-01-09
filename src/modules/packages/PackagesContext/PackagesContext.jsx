import React, { useContext, useMemo } from 'react';
import packagesToPaths from './packagesToPaths';

const PackagesContext = React.createContext({});

export default PackagesContext;

export const usePackages = () => {
  const { packages } = useContext(PackagesContext);
  return packages;
};

export const usePaths = () => {
  const packages = usePackages();
  const paths = useMemo(() => packagesToPaths(packages), [packages]);
  return paths;
};

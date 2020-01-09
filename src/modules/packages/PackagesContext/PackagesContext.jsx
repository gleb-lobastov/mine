import React, { useContext } from 'react';

const PackagesContext = React.createContext({});

export default PackagesContext;

export const usePackages = () => {
  const { packages } = useContext(PackagesContext);
  return packages;
};

export const withPackages = Component => props => {
  const { packages } = useContext(PackagesContext);
  return <Component {...props} packages={packages} />;
};

import { useState, useCallback, useMemo } from 'react';
import warning from 'warning';

export default () => {
  const [packages, setPackages] = useState({});

  const registerPackage = useCallback((packageKey, packageData) => {
    setPackages(prevPackages => {
      console.log('register package', packageKey);
      warning(
        !prevPackages[packageKey],
        `Package with key ${packageKey} is already registered`,
      );
      return {
        ...prevPackages,
        [packageKey]: packageData,
      };
    });
  }, []);

  const unregisterPackage = useCallback(packageKey => {
    console.log('unregister package', packageKey);
    setPackages(({ [packageKey]: packageToUnregister, ...restPackages }) => {
      warning(
        packageToUnregister,
        `Can't unregister package: package with key ${packageKey} is not registered`,
      );
      return restPackages;
    });
  }, []);

  const packagesContext = useMemo(
    () => ({
      packages,
      registerPackage,
      unregisterPackage,
    }),
    [packages],
  );

  return packagesContext;
};

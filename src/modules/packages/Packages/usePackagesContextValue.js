import { useState, useCallback, useMemo } from 'react';
import warning from 'warning';

export default () => {
  const [packages, setPackages] = useState({});

  const registerPackage = useCallback(({ routes, mountPath }) => {
    setPackages(prevPackages => {
      console.log('register package', mountPath);
      warning(
        !prevPackages[mountPath],
        `Package with mountPath ${mountPath} is already registered`,
      );
      return {
        ...prevPackages,
        [mountPath]: { routes, mountPath },
      };
    });
  }, []);

  const unregisterPackage = useCallback(({ mountPath }) => {
    console.log('unregister package', mountPath);
    setPackages(({ [mountPath]: packageToUnregister, ...restPackages }) => {
      warning(
        packageToUnregister,
        `Can't unregister package: package with mountPath ${mountPath} is not registered`,
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

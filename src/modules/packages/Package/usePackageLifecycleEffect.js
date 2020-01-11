import { useEffect, useContext, useMemo, useRef } from 'react';
import warning from 'warning';
import isString from 'lodash/isString';
import mapValues from 'lodash/mapValues';
import Path from 'modules/utilities/routing/Path';
import PackageContext from '../PackagesContext';

const createPath = ({ path, defaultRouteParams, ...meta }, mountPath = '/') =>
  Path.create(`${mountPath}${path}`, meta, defaultRouteParams);

export default function usePackageLifecycleEffect({
  packageKey,
  routes,
  mountPath,
}) {
  const { registerPackage, unregisterPackage } = useContext(PackageContext);
  const routesRef = useRoutesWithPathsRef(routes, mountPath);
  useEffect(
    () => {
      if (!isString(mountPath) || !packageKey) {
        const routesStr = JSON.stringify(Object.keys(routesRef.current || {}));
        warning(mountPath, `Package with routes ${routesStr} has no mountPath`);
        warning(
          packageKey,
          `Package with routes ${routesStr} has no packageKey`,
        );
        return undefined;
      }
      registerPackage(packageKey, {
        routes: routesRef.current,
        mountPath,
      });
      return () => unregisterPackage(packageKey);
    },
    [packageKey, mountPath],
  );
}

function useRoutesWithPathsRef(routes, mountPath) {
  const routesWithPaths = useMemo(
    () =>
      mapValues(routes, route => ({
        ...route,
        path: createPath(route, mountPath),
      })),
    [routes, mountPath],
  );
  const routesRef = useRef(routesWithPaths);
  return routesRef;
}

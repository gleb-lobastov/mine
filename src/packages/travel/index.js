import React from 'react';
import { Package } from 'modules/packages';
import resolveRoutingConfig from 'travel/routes';
import * as models from 'travel/models';

export const travelModels = models;
export default function createPackage({ mountPath }) {
  return {
    id: "81f77ac4-17ca-42bd-b1bf-0c40bc92f415'",
    packageName: 'travel',
    routing: resolveRoutingConfig(mountPath),
    models,
  };
}

const {
  routing: { routesDict: routes },
} = createPackage({ mountPath: '' });

export function Travel({ mountPath, ...forwardingProps }) {
  return (
    <Package
      name="travel"
      mountPath={mountPath}
      routes={routes}
      {...forwardingProps}
    />
  );
}

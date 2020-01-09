import React from 'react';
import { Package } from 'modules/packages';
import resolveRoutingConfig from './routes';
import * as models from './models';

export const literatureModels = models;
export default function createPackage({ mountPath }) {
  return {
    id: '9a682978-1ab8-4449-91ff-68216473c11e',
    packageName: 'literature',
    routing: resolveRoutingConfig(mountPath),
    models,
  };
}

const {
  routing: { routesDict: routes },
} = createPackage({ mountPath: '' });

export function Literature({ mountPath, ...forwardingProps }) {
  return (
    <Package
      name="literature"
      mountPath={mountPath}
      routes={routes}
      {...forwardingProps}
    />
  );
}

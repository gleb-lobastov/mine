import React from 'react';
import { Package } from 'modules/packages';
import * as routes from './routes';
import * as models from './models';

export const travelModels = models;

export default function Travel(forwardingProps) {
  return <Package name="travel" routes={routes} {...forwardingProps} />;
}

import React from 'react';
import { Package } from 'modules/packages';
import * as routes from './routes';
import * as models from './models';

export const literatureModels = models;

export default function Literature(forwardingProps) {
  return <Package name="literature" routes={routes} {...forwardingProps} />;
}

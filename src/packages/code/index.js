import React from 'react';
import { Package } from 'modules/packages';
import * as routes from './routes';

export default function Code(forwardingProps) {
  return <Package name="code" routes={routes} {...forwardingProps} />;
}

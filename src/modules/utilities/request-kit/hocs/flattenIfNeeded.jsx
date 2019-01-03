import React from 'react';
import { memoizeByLastArgs } from 'modules/utilities/memo';

const mergeIfNeeded = (provision, requirements) => {
  const { require } = requirements;
  if (!Array.isArray(require) || !Array.isArray(provision)) {
    return provision;
  }
  return Object.assign(...provision);
};

const mergeProvisionIfNeeded = memoizeByLastArgs(mergeIfNeeded);
const mergeFallbackIfNeeded = memoizeByLastArgs(mergeIfNeeded);

export default WrappedComponent => ({
  provision,
  fallback,
  requirements,
  ...forwarderProps
}) => (
  <WrappedComponent
    provision={mergeProvisionIfNeeded(provision, requirements)}
    fallback={mergeFallbackIfNeeded(fallback, requirements)}
    requirements={requirements}
    {...forwarderProps}
  />
);

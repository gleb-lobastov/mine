/* eslint-disable import/prefer-default-export */
import React from 'react';
import PlainLoader from 'modules/components/loaders/PlainLoader';

// todo implement logic, which loader to show for each request, etc.
export const withLoader = Component => props => {
  const { provision: { isComplete = false, isPending = true } = {} } = props;
  if (!isComplete || isPending) {
    return <PlainLoader />;
  }
  return <Component {...props} />;
};

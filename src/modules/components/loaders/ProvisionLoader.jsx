/* eslint-disable import/prefer-default-export */
import React from 'react';
import PlainLoader from 'modules/components/loaders/PlainLoader';

// todo implement logic, which loader to show for each request, etc.
export const withLoader = Component => ({
  isComplete = false,
  isPending = true,
  ...forwardedProps
}) =>
  (!isComplete || isPending) ? (
    <PlainLoader />
  ) : (
    <Component {...forwardedProps} />
  );

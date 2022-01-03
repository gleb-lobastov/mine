import { useState, useCallback, useEffect, useRef, useMemo } from 'react';
import merge from 'lodash/merge';
import { createControlledPromise } from '../utils';

const REFETCH_POLICY = {
  REJECT: 'REJECT',
  PARALLEL: 'PARALLEL',
  SEQUENTIAL: 'SEQUENTIAL',
};

export default function makeRequestHook({ requestHandler }) {
  return function useRequest({ preRequirements, ...forwardingRequestParams }) {
    const [requirements, setRequirements] = useState();
    const controlledPromiseRef = useRef(null);

    const mergedRequirements = useMemo(
      () => merge({}, requirements, preRequirements || {}),
      [requirements],
    );

    useEffect(
      () => {
        if (!requirements) {
          return;
        }
        const promise = requestHandler({
          requirements: mergedRequirements,
          ...forwardingRequestParams,
        });
        if (controlledPromiseRef.current) {
          promise.then(
            controlledPromiseRef.current.resolver,
            controlledPromiseRef.current.rejector,
          );
        }
      },
      [requirements],
    );

    const request = useCallback(async (nextRequirements, { refetchPolicy }) => {
      switch (refetchPolicy) {
        case REFETCH_POLICY.PARALLEL:
          // todo: currently will not work because only one instance of controlledPromiseRef is in action
          throw new Error('Not implemented');
        case REFETCH_POLICY.SEQUENTIAL:
          if (controlledPromiseRef.current) {
            await controlledPromiseRef.current.promise.catch(() => {});
          }
          break;
        case REFETCH_POLICY.REJECT:
        default: {
          if (controlledPromiseRef.current) {
            controlledPromiseRef.current.rejector();
          }
          break;
        }
      }
      // requirements update should be after controlledPromiseRef manipulations, otherwise request could be invoked with prev controlled promise
      setRequirements(nextRequirements);
      controlledPromiseRef.current = createControlledPromise();
      return controlledPromiseRef.current.promise;
    }, []);

    request.REFETCH_POLICY = REFETCH_POLICY;

    return [request, mergedRequirements];
  };
}

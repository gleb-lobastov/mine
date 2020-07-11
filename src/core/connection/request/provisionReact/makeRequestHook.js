import { useState, useCallback, useEffect, useRef, useMemo } from 'react';
import merge from 'lodash/merge';
import { createControlledPromise } from '../utils';

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

    const request = useCallback(nextRequirements => {
      setRequirements(nextRequirements);
      if (controlledPromiseRef.current) {
        controlledPromiseRef.current.rejector();
      }
      controlledPromiseRef.current = createControlledPromise();
      return controlledPromiseRef.current.promise;
    }, []);

    return [request, mergedRequirements];
  };
}

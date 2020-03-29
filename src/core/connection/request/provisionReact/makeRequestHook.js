import { useState, useCallback, useEffect, useRef } from 'react';
import merge from 'lodash/merge';
import { createControlledPromise } from '../utils';

export default function makeRequestHook({ requestHandler }) {
  return function useRequest({ preRequirements, ...forwardingRequestParams }) {
    const [requirements, setRequirements] = useState();
    const controlledPromiseRef = useRef(null);

    useEffect(
      () => {
        if (!requirements) {
          return;
        }
        const promise = requestHandler({
          requirements: merge({}, requirements, preRequirements || {}),
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

    return request;
  };
}

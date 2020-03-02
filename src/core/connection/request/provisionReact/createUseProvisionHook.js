import { useEffect, useMemo, useRef } from 'react';
import debounce from 'lodash/debounce';

export default function createUseProvisionHook({
  requirementsComparator: compareRequirements,
  requestHandler,
  invalidateRequestHandler,
}) {
  return function useProvision({ requirements, provision, requestParams }) {
    const { debounceRequest } = requirements;

    const handleRequest = useMemo(
      () => {
        if (!debounceRequest) {
          return requestHandler;
        }
        return debounce(requestHandler, debounceRequest);
      },
      [debounceRequest],
    );

    const previousRef = useRef({});
    useEffect(
      () => {
        const {
          requirements: prevRequirements,
          provision: prevProvision,
        } = previousRef.current;

        const comparisonResult = compareRequirements(
          { requirements: prevRequirements, provision: prevProvision },
          { requirements, provision },
        );

        if (comparisonResult) {
          handleRequest({
            ...requestParams,
            requirements: { ...requirements, comparisonResult },
          });
        }

        previousRef.current = { requirements, provision };
      },
      [requirements, provision],
    );

    const actualProvision = useMemo(
      () => ({
        ...provision,
        invalidate: () =>
          invalidateRequestHandler({ ...requestParams, requirements }),
      }),
      [provision, requirements.domain],
    );
    return actualProvision;
  };
}

import { useEffect, useMemo, useRef } from 'react';
import debounce from 'lodash/debounce';
import { checkIsRequirementsChanged } from '../utils';

export default function makeProvisionHook({
  requestHandler,
  invalidateRequestHandler,
}) {
  return function useProvision({
    requirements,
    provision,
    ...forwardingRequestParams
  }) {
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

        const comparisonResult = checkIsRequirementsChanged(
          { requirements: prevRequirements, provision: prevProvision },
          { requirements, provision },
        );

        if (comparisonResult) {
          handleRequest({
            ...forwardingRequestParams,
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
          invalidateRequestHandler({
            ...forwardingRequestParams,
            requirements,
          }),
      }),
      [provision, requirements.domain],
    );
    return actualProvision;
  };
}

import { useEffect, useMemo } from 'react';
import invariant from 'invariant';
import debounce from 'lodash/debounce';
import { checkIsRequirementsChanged } from '../utils';

function resolveStateKey(requirements) {
  const stateKey = requirements?.domain;
  invariant(stateKey, 'Unable to determine state key');
  return stateKey; // should never be empty
}
// Global storage is used to preserve requirements from previous render even
// between unmount/mount cycle or component. Moreover even different components
// could reference same domain and keep provision state in sync.
// Previous values is only used to detect changes that could trigger provision
// refetch (if observed is change, or provision is marked as invalid).
// Old values not used and should not be used for any other reasons.
const memoryState = (() => {
  const state = {};
  return {
    get: requirements => {
      const stateKey = resolveStateKey(requirements);
      return state[stateKey] || {};
    },
    set: nextState => {
      const stateKey = resolveStateKey(nextState?.requirements);
      state[stateKey] = nextState;
    },
  };
})();

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

    useEffect(
      () => {
        const {
          requirements: prevRequirements,
          provision: prevProvision,
        } = memoryState.get(requirements);

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

        memoryState.set({ requirements, provision });
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

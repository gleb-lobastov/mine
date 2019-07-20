import observeIsChanged from '../observeIsChanged';
import { requestSelectors } from '../controllerRedux';

const DEFAULT_DOMAIN = '__unassigned';

const checkIsNoop = requirements => {
  const { isChanged, isNoop } = requirements;
  return Boolean(isNoop || !isChanged);
};

const mapValues = (object, iteratee) =>
  Object.entries(object).reduce((memo, [key, value]) => {
    memo[key] = iteratee(value, key, object);
    return memo;
  }, {});

export const multiRequestMap = (requirements, callback) => {
  const { request } = requirements;

  const mapping = Object.keys(request || {}).reduce((memo, key) => {
    const value = callback(request[key], key, requirements);
    if (value !== undefined) {
      memo[key] = value;
    }
    return memo;
  }, {});

  return { ...requirements, request: mapping };
};

const resolveSpecificRequirements = (
  {
    domain = DEFAULT_DOMAIN,
    request,
    comparisonResult = {},
    ...sharedRequirements
  },
  key,
) => {
  const specificRequirements = request[key];
  return {
    ...sharedRequirements,
    isChanged: comparisonResult[key],
    modelName: key,
    key,
    ...specificRequirements,
    domain: `${domain}.${key}`,
  };
};

export const multiRequestEnhancer = strategy => (
  requirements,
  ...forwardedArgs
) => {
  const { isProvision, request } = requirements; // todo consider split for submits
  if (!isProvision || !request) {
    strategy(requirements, ...forwardedArgs);
  }

  // multiRequestMap(requirements, (_, key) => {
  //   const specificRequirements = resolveSpecificRequirements(requirements, key);
  //   if (checkIsNoop(specificRequirements)) {
  //     return undefined;
  //   }
  //   return strategy(specificRequirements, ...forwardedArgs);
  // });

  const requests = mapValues(
    Object.keys(request || {}).reduce((memo, key) => {
      const specificRequirements = resolveSpecificRequirements(
        requirements,
        key,
      );
      if (!checkIsNoop(specificRequirements)) {
        memo[key] = specificRequirements;
      }
      return memo;
    }, {}),
    specificRequirements => strategy(specificRequirements, ...forwardedArgs),
  );

  const requestsEntries = Object.entries(requests);
  return Promise.all(requestsEntries).then(responses =>
    responses.reduce((memo, response, index) => {
      const [key] = requestsEntries[index];
      memo[key] = response;
      return memo;
    }, {}),
  );
};

export const mergeProvisionState = (provisionStateMapping = {}) => {
  const values = Object.values(provisionStateMapping);
  return {
    isComplete: values.every(requestSelectors.selectIsReady),
    isPending: values.some(requestSelectors.selectIsPending),
    error: values.find(requestSelectors.selectError),
    errors: values.map(requestSelectors.selectError).filter(Boolean),
    fallback: mapValues(
      provisionStateMapping,
      requestSelectors.selectAvailableResult,
    ),
    value: mapValues(
      provisionStateMapping,
      requestSelectors.selectRelevantResult,
    ),
  };
};

export const multiProvisionSelector = (
  provisionState,
  requirements,
  particularSelector,
) => {
  const { domain = DEFAULT_DOMAIN, request = {} } = requirements || {};

  return mergeProvisionState(
    Object.keys(request).reduce((memo, key) => {
      const particularProvision = particularSelector(
        provisionState,
        `${domain}.${key}`,
      );

      // Ignore particular requirements, which was never requested and not missing.
      // Difference is in isComplete flag. If some data is required, but never
      // requested, then provision can not be marked as complete. As not all
      // required data is provided. But if some requirement is flagged as
      // not missing (not required), then lack of this data should not mark
      // provision as incomplete. Because, this request could even never be called.
      if (
        particularProvision ||
        !checkIsNoop(resolveSpecificRequirements(requirements, key))
      ) {
        memo[key] = particularProvision;
      }
      return memo;
    }, {}),
  );
};

export const multiProvisionAdapter = ({
  originalAdapter,
  provisionValues,
  requirements,
  state, // todo use ...forwardingProps
}) =>
  mapValues(provisionValues || {}, (result, key) =>
    originalAdapter(
      state,
      resolveSpecificRequirements(requirements, key),
      result,
    ),
  );

export const multiRequirementsComparator = (
  prevRequirements,
  nextRequirements,
) => {
  const hasPrevRequirements = Boolean(prevRequirements);
  const { request: prevRequest = {} } = prevRequirements || {};
  const { request: nextRequest = {} } = nextRequirements || {};
  return mapValues(nextRequest, (nextSpecificRequirements, key) => {
    const prevSpecificRequirements = hasPrevRequirements
      ? prevRequest[key] || {}
      : undefined;
    return observeIsChanged(prevSpecificRequirements, nextSpecificRequirements);
  });
};

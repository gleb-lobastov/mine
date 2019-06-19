import { requestSelectors } from '../controllerRedux';

export const multiRequestEnhancer = strategy => (params, ...forwardedArgs) => {
  const {
    meta,
    meta: { domain = 'common' } = {},
    require, // todo require for fetch, parallel for submit?
    ...sharedRequirements
  } = params;

  const { isProvision } = sharedRequirements; // todo consider split for submits
  if (!isProvision || !require) {
    strategy(params, ...forwardedArgs);
  }
  const entries = Object.entries(require || {}).filter(
    // ignore falsy values, to allow quick requests disabling by condition
    ([, specificRequirements]) => specificRequirements,
  );
  return Promise.all(
    entries.map(([key, specificRequirements]) =>
      strategy(
        {
          ...sharedRequirements,
          key,
          ...specificRequirements,
          meta: {
            ...meta,
            domain: `${domain}.${key}`,
          },
        },
        ...forwardedArgs,
      ),
    ),
  ).then(responses =>
    responses.reduce((memo, response, index) => {
      const [key] = entries[index];
      // eslint-disable-next-line
      memo[key] = response;
      return memo;
    }, {}),
  );
};

const mapValues = (object, iteratee) =>
  Object.entries(object).reduce((memo, [key, value]) => {
    memo[key] = iteratee(value, key, object);
    return memo;
  }, {});

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
  const { meta: { domain = 'common' } = {}, require = {} } = requirements || {};

  return mergeProvisionState(
    Object.entries(require).reduce((memo, [key, value]) => {
      // ignore falsy values, to allow quick requests disabling by condition
      if (value) {
        memo[key] = particularSelector(provisionState, `${domain}.${key}`);
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
    originalAdapter(state, requirements.require[key], result),
  );

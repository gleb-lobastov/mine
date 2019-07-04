import { requestSelectors } from '../controllerRedux';

const checkIsMissing = requirements => {
  if (!Object.prototype.hasOwnProperty.call(requirements, 'isMissingIf')) {
    return true;
  }
  const { isMissingIf } = requirements;
  return Boolean(isMissingIf);
};

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
    ([, specificRequirements]) => checkIsMissing(specificRequirements),
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
    Object.keys(require).reduce((memo, key) => {
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
      if (particularProvision || checkIsMissing(require[key])) {
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
    originalAdapter(state, requirements.require[key], result),
  );

import { requestSelectors } from '../controllerRedux';

export const mapValues = (object, iteratee) =>
  Object.entries(object).reduce((memo, [key, value]) => {
    memo[key] = iteratee(value, key, object);
    return memo;
  }, {});

export default (
  provisionStateMapping = {},
  checkShouldMergeDomain = () => true,
) => {
  const values = Object.entries(provisionStateMapping).reduce(
    (memo, [domain, value]) => {
      if (checkShouldMergeDomain(domain)) {
        memo.push(value);
      }
      return memo;
    },
    [],
  );
  const fallback = mapValues(
    provisionStateMapping,
    requestSelectors.selectAvailableResult,
  );
  return {
    isComplete: values.every(requestSelectors.selectIsReady),
    isPending: values.some(requestSelectors.selectIsPending),
    isValid: values.every(requestSelectors.selectIsValid),
    validStateMapping: mapValues(
      provisionStateMapping,
      requestSelectors.selectIsValid,
    ),
    error: values.find(requestSelectors.selectError),
    errors: values.map(requestSelectors.selectError).filter(Boolean),
    hasFallback: Object.values(fallback).every(Boolean),
    fallback,
    value: mapValues(
      provisionStateMapping,
      requestSelectors.selectRelevantResult,
    ),
  };
};

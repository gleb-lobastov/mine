const merge = (
  { query, modelName, ...forwardingParams },
  sharedRequestParams,
  modelsSet,
) => {
  const model = modelsSet.resolveByName(modelName);
  if (!model) {
    throw new Error(`Model "${modelName} not defined`);
  }
  return {
    ...sharedRequestParams,
    ...forwardingParams,
    query,
    modelName,
    endpoint: model.resolveEndpoint,
  };
};

const objectPromiseAll = (object = {}, callback) => {
  const keys = [];
  const promises = [];
  Object.entries(object).forEach(([key, value]) => {
    promises.push(callback(value, key, object));
    keys.push(key);
  });
  return Promise.all(promises).then(results =>
    results.reduce((memo, result, index) => {
      memo[keys[index]] = result;
      return memo;
    }, {}),
  );
};

const multiRequestStrategyEnhancer = (strategy, resolver, modelsSet) => (
  requirements,
  ...forwardedArgs
) => {
  const { require: request, ...forwardedParams } = requirements;
  return objectPromiseAll(request, currentRequest =>
    strategy(
      merge(currentRequest, forwardedParams, modelsSet),
      ...forwardedArgs,
    ).then(response => resolver(request, response)),
  );
};

export default multiRequestStrategyEnhancer;

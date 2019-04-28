import ModelsSet from './ModelsSet';

export default modelsConfig => {
  const modelsSet = new ModelsSet(modelsConfig);
  return {
    // this method is responsible for normalization against models config
    modelsNormalizedPlugin: next => (requestRequirements, ...args) => {
      const { modelName, key } = requestRequirements;
      return next(
        {
          ...requestRequirements,
          endpoint: modelsSet
            .resolveByName(modelName || key)
            .resolveEndpoint(requestRequirements),
        },
        ...args,
      ).then(
        response =>
          response != null
            ? modelsSet.normalize(requestRequirements, response)
            : null,
      );
    },
    // this method is responsible for querying multiple models at once
    // in request is enough to specify which entities we need (through their modelNames and ids)
    denormalize: (requirements, result, entities) => {
      const { modelName, key } = requirements;
      return modelsSet
        .resolveByName(modelName || key)
        .denormalize(requirements, result, entities);
    },
  };
};

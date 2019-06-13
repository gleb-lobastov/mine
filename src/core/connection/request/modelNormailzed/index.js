import ModelsSet from './ModelsSet';

export default modelsConfig => {
  const { modelsDefinitions } = modelsConfig;
  const modelsSet = new ModelsSet(modelsDefinitions);
  return {
    // this method is responsible for normalization against models config
    modelsNormalizedPlugin: next => (requestRequirements, ...args) => {
      const { modelName, key } = requestRequirements;
      const model = modelsSet.resolveByName(modelName || key);
      return next(
        {
          ...requestRequirements,
          // todo this makes requirements unserializable, reconsider
          toServerAdapter: model.resolveToServerAdapter(),
          endpoint: model.resolveEndpoint,
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

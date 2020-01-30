import Model from '../Model';

export default class ModelsSet {
  constructor(modelsDefinitions) {
    // step-by-step definitions of model is required to provide references for existing schemas
    this.models = {};
    modelsDefinitions
      .filter(({ modelName }) => modelName)
      .forEach(definition => {
        this.models[definition.modelName] = new Model(
          definition,
          this.createReferenceResolver,
        );
      });
  }

  createReferenceResolver = ({
    defaultModel,
    itemSchema,
    derivedSchemas,
    isNoop = false, // to obtain non-nested schemas for denormalize
  } = {}) => ({ modelName = defaultModel, schemaName } = {}) => {
    if (!modelName || isNoop) {
      return undefined;
    }
    if (modelName === defaultModel) {
      if (!itemSchema || !derivedSchemas) {
        return undefined;
      }
      return schemaName ? derivedSchemas[schemaName] : itemSchema;
    }
    const model = this.resolveByName(modelName);
    if (!model) {
      throw new Error(
        `Model ${modelName} is not defined. This is possible when trying to access model that defined after current in model config. Check models definitions order`,
      );
    }
    return schemaName
      ? model.resolveSchemaByName(schemaName)
      : model.resolveEntitySchema();
  };

  resolveByName(modelName) {
    return this.models[modelName];
  }

  requireByName(modelName) {
    const model = this.resolveByName(modelName);
    if (!model) {
      throw new Error(`Missing model for "${modelName}"`);
    }
    return model;
  }

  normalize(request, response) {
    const { modelName } = request;
    return this.requireByName(modelName).normalize(request, response);
  }
}

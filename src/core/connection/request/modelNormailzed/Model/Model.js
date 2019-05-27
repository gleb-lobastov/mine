import { normalize, denormalize, schema } from 'normalizr';
import mapValues from '../utils/mapValues';

const createDerivedSchemas = (
  modelName,
  itemSchema,
  derivedSchemasConfig,
  createReferenceResolver,
) =>
  derivedSchemasConfig.reduce(
    (derivedSchemasInterim, { schemaName, schemaCreator }) => {
      // eslint-disable-next-line
      derivedSchemasInterim[schemaName] = schemaCreator(
        createReferenceResolver({
          defaultModel: modelName,
          itemSchema,
          derivedSchemas: derivedSchemasInterim,
        }),
        modelName,
      );
      return derivedSchemasInterim;
    },
    {},
  );

export default class Model {
  constructor(definition, referenceResolverCreator) {
    const {
      modelName,
      derivedSchemas: derivedSchemasConfig = [],
      schema: {
        definition: itemSchemaDefinition = {},
        options: itemSchemaOptions = {},
      } = {},
      toClientAdapter,
      toServerAdapter,
      endpointResolver,
    } = definition;

    this.modelName = modelName;
    this.endpointResolver = endpointResolver;
    this.adaptToServer = toServerAdapter;

    const reference = referenceResolverCreator(/* nothing to pass */);
    const schemaDefinition = mapValues(itemSchemaDefinition, schemaCreator =>
      schemaCreator(reference, modelName),
    );

    this.itemSchema = new schema.Entity(modelName, schemaDefinition, {
      ...itemSchemaOptions,
      processStrategy: toClientAdapter,
    });
    this.nonNestedItemSchema = new schema.Entity(
      modelName,
      {},
      {
        ...itemSchemaOptions,
        processStrategy: toClientAdapter,
      },
    );

    this.derivedSchemas = createDerivedSchemas(
      this.modelName,
      this.itemSchema,
      derivedSchemasConfig,
      referenceResolverCreator,
    );
    this.nonNestedDerivedSchemas = createDerivedSchemas(
      this.modelName,
      this.nonNestedItemSchema,
      derivedSchemasConfig,
      referenceResolverCreator,
    );
  }

  resolveEntitySchema() {
    return this.itemSchema;
  }

  resolveSchemaByName(schemaName, shouldUseNonNestedSchemas) {
    const schemas = shouldUseNonNestedSchemas
      ? this.nonNestedDerivedSchemas
      : this.derivedSchemas;
    const resolvedSchema = schemas[schemaName];
    if (!resolvedSchema) {
      throw new Error(
        `schema ${schemaName} is not specified for ${this.modelName}`,
      );
    }
    return resolvedSchema;
  }

  resolveSchemaFromRequest(request, shouldUseNonNestedSchemas) {
    const { query: { id = undefined } = {}, applicableSchemaName } = request;

    if (applicableSchemaName) {
      return this.resolveSchemaByName(
        applicableSchemaName,
        shouldUseNonNestedSchemas,
      );
    }
    if (!id) {
      return this.resolveSchemaByName('list', shouldUseNonNestedSchemas);
    }
    return shouldUseNonNestedSchemas
      ? this.nonNestedItemSchema
      : this.itemSchema;
  }

  normalize(request, response) {
    return normalize(response, this.resolveSchemaFromRequest(request));
  }

  denormalize(request, result, entitites) {
    return denormalize(
      result,
      this.resolveSchemaFromRequest(request, true),
      entitites,
    );
  }

  resolveEndpoint = request =>
    typeof this.endpointResolver === 'string'
      ? this.endpointResolver
      : this.endpointResolver(request);

  resolveToServerAdapter() {
    return this.adaptToServer;
  }
}

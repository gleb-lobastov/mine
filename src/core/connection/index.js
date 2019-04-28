/* global __API_HOST__ __IS_DEV_MODE__ */
import { schema } from 'normalizr';
import createRequestEngine from '@request-kit/engine-rest';
import endpointPlugin from 'modules/utilities/request-kit/plugins/endpoint';
import loggerPlugin from 'modules/utilities/request-kit/plugins/logger';
import responseAsJsonPlugin from 'modules/utilities/request-kit/plugins/responseAsJson';
import createRequestApi from './request';
import {
  visitsAdapter,
  articlesAdapter,
  tripsAdapter,
  locationsAdapter,
} from './adapters';

const createListSchemaFromThisModelItemSchema = reference =>
  new schema.Object({ data: new schema.Array(reference()) });

const listSchema = {
  schemaName: 'list',
  schemaCreator: createListSchemaFromThisModelItemSchema,
};

const endpointResolver = ({ modelName, meta: { domain } }) =>
  `${__API_HOST__}/api/${modelName || domain}`;

const engine = createRequestEngine({
  presetOptions: {
    format: 'json',
    endpoint: ({ require, meta: { domain } }) =>
      `${__API_HOST__}/api/${require || domain}`,
  },
  plugins: [
    __IS_DEV_MODE__ && loggerPlugin,
    endpointPlugin,
    responseAsJsonPlugin,
  ].filter(Boolean),
});

const {
  reduxMiddleware: requestMiddleware,
  provide,
  reducer: requestReducer,
  selectors: { selectDict, selectItem, selectList, selectMissingIds },
} = createRequestApi({
  modelsConfig: {
    modelsDefinitions: [
      {
        modelName: 'trips',
        toClientAdapter: tripsAdapter,
        endpointResolver,
        derivedSchemas: [listSchema],
      },
      {
        modelName: 'visits',
        toClientAdapter: visitsAdapter,
        endpointResolver,
        derivedSchemas: [listSchema],
      },
      {
        modelName: 'locations',
        toClientAdapter: locationsAdapter,
        endpointResolver,
        derivedSchemas: [listSchema],
      },
      {
        modelName: 'articles',
        toClientAdapter: articlesAdapter,
        endpointResolver,
        derivedSchemas: [listSchema],
      },
    ],
  },
  requestHandler: (...args) => engine.request(...args),
});

export {
  requestMiddleware,
  provide,
  requestReducer,
  selectDict,
  selectItem,
  selectList,
  selectMissingIds,
};

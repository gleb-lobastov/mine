import endpointResolver from 'modules/utilities/request-kit/endpointResolver';
import itemSchema from 'modules/derivedSchemas/itemSchema';
import listSchema from 'modules/derivedSchemas/listSchema';
import { toClient, toServer } from './adapters';

export default {
  modelName: 'users',
  toClientAdapter: toClient,
  toServerAdapter: toServer,
  endpointResolver,
  derivedSchemas: [itemSchema, listSchema],
};

import endpointResolver from 'modules/utilities/request-kit/endpointResolver';
import listSchema from 'modules/derivedSchemas/listSchema';
import { toClient, toServer } from './adapters';

export default {
  modelName: 'quotes',
  toClientAdapter: toClient,
  toServerAdapter: toServer,
  endpointResolver,
  derivedSchemas: [listSchema],
};

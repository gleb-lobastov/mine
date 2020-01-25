import { schema } from 'normalizr';
import endpointResolver from 'modules/utilities/request-kit/endpointResolver';
import listSchema from 'modules/derivedSchemas/listSchema';
import { toClient, toServer } from './adapters';

export default {
  modelName: 'trips',
  toClientAdapter: toClient,
  toServerAdapter: toServer,
  endpointResolver,
  schema: {
    definition: {
      visits: reference => new schema.Array(reference({ modelName: 'visits' })),
      rides: reference => new schema.Array(reference({ modelName: 'rides' })),
    },
  },
  derivedSchemas: [listSchema],
};

import endpointResolver from 'modules/utilities/request-kit/endpointResolver';
import listSchema from 'modules/derivedSchemas/listSchema';
import { toClient, toServer } from './adapters';

export default {
  modelName: 'articles',
  toClientAdapter: toClient,
  schema: {
    options: { idAttribute: 'slug' },
  },
  toServerAdapter: toServer,
  endpointResolver,
  derivedSchemas: [listSchema],
};

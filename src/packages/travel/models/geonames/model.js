import endpointResolver from 'modules/utilities/request-kit/endpointResolver';
import listSchema from 'modules/derivedSchemas/listSchema';
import { toClient, toServer } from './adapters';

export default {
  modelName: 'geonames',
  toClientAdapter: toClient,
  toServerAdapter: toServer,
  schema: {
    options: { idAttribute: 'geoname_id' },
  },
  endpointResolver,
  derivedSchemas: [listSchema],
};

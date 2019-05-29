import { schema } from 'normalizr';

export default {
  schemaName: 'list',
  schemaCreator: reference =>
    new schema.Object({
      data: new schema.Array(reference()),
    }),
};

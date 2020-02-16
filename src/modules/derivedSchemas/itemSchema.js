import { schema } from 'normalizr';

export default {
  schemaName: 'item',
  schemaCreator: reference =>
    new schema.Object({
      data: reference(),
    }),
};

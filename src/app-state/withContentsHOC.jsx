import React from 'react';
import { provide } from 'core/request';

export default ExtendableComponent =>
  provide((state, { domain }) => ({
    meta: {
      domain,
    },
  }))(
    ({ provision, isPending, ...props }) =>
      isPending ? (
        <div>Загрузка...</div>
      ) : (
        <ExtendableComponent contents={provision} {...props} />
      ),
  );

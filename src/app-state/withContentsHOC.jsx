import React from 'react';
import { provide } from 'core/request';

export default ExtendableComponent => provide(
  () => ({
    query: 'contents',
    meta: {
      domain: 'contents',
    },
  }),
)(({ provision, ...props }) => (
  <ExtendableComponent contents={provision}{...props} />
));

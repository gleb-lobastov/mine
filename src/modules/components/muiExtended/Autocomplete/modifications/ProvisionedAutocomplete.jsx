import React from 'react';
import withProvision from 'core/connection/withProvision';
import Autocomplete from '../Autocomplete';

const Resolver = ({
  entities: { data: entitiesList = [] } = {},
  children: renderProp,
}) => renderProp(entitiesList || []);

const ProvisionedResolver = withProvision(
  (state, { sourceProps: { modelName, domain } }) => ({
    require: {
      entities: { modelName },
    },
    meta: {
      domain,
    },
  }),
)(Resolver);

export default props => (
  <Autocomplete {...props} resolver={ProvisionedResolver} />
);

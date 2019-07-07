import withProvision from 'core/connection/withProvision';
import { createSuggestComponent } from '../Suggest';

const Resolver = ({
  sourceProps: {
    filterField,
    resolveDetails,
    convertEntityToSuggestion = entity => ({
      ...entity,
      label: entity[filterField],
      details: resolveDetails ? resolveDetails(entity) : undefined,
    }),
  } = {},
  entities: { data: entitiesList = [] } = {},
  children: renderProp,
}) => renderProp((entitiesList || []).map(convertEntityToSuggestion));

export default createSuggestComponent({
  SuggestionsResolver: withProvision(
    (
      state,
      {
        inputValue,
        sourceProps: { modelName, domain, filterField, numberOfItemsToRequest },
      },
    ) => ({
      identity: inputValue,
      require: {
        entities: {
          modelName,
          query: {
            filter: {
              [filterField]: { comparator: '~', value: `%${inputValue}%` },
            },
            navigation: { pageSize: numberOfItemsToRequest },
          },
        },
      },
      meta: {
        domain,
      },
      debounceRequest: 500,
    }),
  )(Resolver),
});

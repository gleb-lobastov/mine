import withProvision from 'core/connection/withProvision';
import { createSuggestComponent } from '../Suggest';

const Resolver = ({
  sourceProps: {
    filterField,
    convertEntityToSuggestion = ({ [filterField]: value }) => ({
      label: value,
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
    }),
  )(Resolver),
});

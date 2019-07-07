import withProvision from 'core/connection/withProvision';
import { createSuggestComponent } from '../Suggest';

export const QUERY_FORMATS = {
  FILTER: 'FILTER',
  SEARCH: 'SEARCH',
};

const resolveQueryByFormat = ({
  queryFormat,
  filterField,
  inputValue: searchString,
  numberOfItemsToRequest,
}) => {
  const navigation = { pageSize: numberOfItemsToRequest };
  switch (queryFormat) {
    case QUERY_FORMATS.SEARCH:
      return { navigation, search: searchString };
    case QUERY_FORMATS.FILTER:
    default:
      return {
        navigation,
        filter: {
          [filterField]: { comparator: '~', value: `%${searchString}%` },
        },
      };
  }
};

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
        sourceProps: {
          modelName,
          domain,
          filterField,
          numberOfItemsToRequest,
          queryFormat,
        },
      },
    ) => ({
      identity: inputValue,
      require: {
        entities: {
          modelName,
          query: resolveQueryByFormat({
            queryFormat,
            filterField,
            inputValue,
            numberOfItemsToRequest,
          }),
        },
      },
      meta: {
        domain,
      },
      debounceRequest: 500,
    }),
  )(Resolver),
});

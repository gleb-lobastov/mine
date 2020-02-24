import { useSelector } from 'react-redux';
import { selectResult } from 'core/connection/request/controllerRedux';
import { useProvision, selectDict } from 'core/connection';

export const QUERY_FORMATS = {
  FILTER: 'FILTER',
  SEARCH: 'SEARCH',
};
const DEFAULT_SUGGEST_DEBOUNCE_TIME_MS = 400;

export default function useSuggest({
  domain,
  modelName,
  inputValue,
  queryFormat,
  filterField,
  numberOfItemsToRequest,
  debounceRequestDelayMs = DEFAULT_SUGGEST_DEBOUNCE_TIME_MS,
}) {
  const provision = useProvision({
    debounceRequest: debounceRequestDelayMs,
    domain,
    isProvision: true,
    modelName,
    observe: inputValue,
    query: resolveQueryByFormat({
      queryFormat,
      filterField,
      inputValue,
      numberOfItemsToRequest,
    }),
  });
  const { data: entitiesIds = [] } = selectResult(provision) || {};
  const entitiesDict = useSelector(state => selectDict(state, modelName) || {});

  return {
    provision,
    suggestions: entitiesIds
      .map(entityId => entitiesDict[entityId])
      .filter(Boolean),
  };
}

function resolveQueryByFormat({
  queryFormat,
  filterField,
  inputValue: searchString,
  numberOfItemsToRequest,
}) {
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
}

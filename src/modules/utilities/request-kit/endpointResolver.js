/* global __API_HOST__  */
import { toQueryString } from './uriEncode';

export default ({ modelName, id, query, meta: { domain } }) => {
  const queryString = query ? `?${toQueryString(query)}` : '';
  const base = `${__API_HOST__}/api/${modelName || domain}`;
  if (!id) {
    return `${base}${queryString}`;
  }
  return `${base}/${id}${queryString}`;
};

/* eslint-disable */
import isUndefined from 'lodash/isUndefined';

export const toQueryString = object =>
  Object.entries(object)
    .map(
      ([key, value]) =>
        isUndefined(value)
          ? undefined
          : `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`,
    )
    .filter(Boolean)
    .join('&');

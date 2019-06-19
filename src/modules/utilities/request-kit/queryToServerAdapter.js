import isArray from 'lodash/isArray';
import isUndefined from 'lodash/isUndefined';
import negate from 'lodash/negate';
import warning from 'modules/errorHandling/warning';

const DEFAULT_PAGE_SIZE = 20;
export const COMPARATORS = {
  IN: 'in',
  LIKE: '~',
  EQUAL: '=',
  GREATER: '>',
  GREATER_OR_EQUAL: '>=',
  LESS: '<',
  LESS_OR_EQUAL: '<=',
};

const primitiveToString = value => {
  const type = typeof value;
  if (type === 'string') {
    return value;
  }
  if (type === 'number' || type === 'boolean') {
    return String(value);
  }
  warning(
    isUndefined(value),
    `Expected type of value "${value}" to be primitive, but found type "${type}". Fallback to ignore value`,
  );
  return undefined;
};

const valueToString = value => {
  if (isArray(value)) {
    const actualValue = value.filter(negate(isUndefined));
    if (!actualValue.length) {
      return undefined;
    }
    return String(actualValue.map(primitiveToString));
  }
  return primitiveToString(value);
};

const filterToServerAdapter = (filter = {}) =>
  Object.entries(filter)
    .map(([fieldName, { comparator, value }]) => {
      const stringifiedValue = valueToString(value);
      if (isUndefined(stringifiedValue)) {
        return undefined;
      }
      if (!/^[A-Za-z0-9]+$/.test(fieldName)) {
        warning(
          true,
          `fieldName "${fieldName}" should contain only latin letters and digits`,
        );
        return undefined;
      }
      if (!Object.values(COMPARATORS).includes(comparator)) {
        warning(
          true,
          `comparator "${comparator}" should be one of ${Object.values(
            COMPARATORS,
          ).join(', ')}`,
        );
        return undefined;
      }
      // % is allowed to be used with "like" comparator
      // " to escape sting
      // , to separate values in sequence
      if (/[!@#$^&*().?:{}|<>]+/.test(stringifiedValue)) {
        warning(
          true,
          `value "${stringifiedValue}" should not contain special characters`,
        );
        return undefined;
      }
      return `${fieldName}:${comparator}:${stringifiedValue}`;
    })
    .filter(Boolean)
    .join(';');

const navigationToServerAdapter = ({
  page = 1,
  pageSize = DEFAULT_PAGE_SIZE,
  isDisabled,
}) => {
  if (isDisabled) {
    return { limit: null };
  }
  return {
    // check is following page exist, by requesting one excessive ite,
    limit: pageSize + 1,
    offset: (page - 1) * pageSize || undefined,
  };
};

const sortingToServerAdapter = (sorting = []) =>
  sorting
    .map(({ fieldName, isDescending }) => {
      if (!/^[A-Za-z0-9]+$/.test(fieldName)) {
        warning(
          true,
          `fieldName "${fieldName}" should contain only latin letters and digits`,
        );
        return undefined;
      }
      return `${fieldName}${isDescending ? ':desc' : ''}`;
    })
    .filter(Boolean)
    .join(';');

export default ({ filter, navigation = {}, sorting }) => {
  const { limit, offset } = navigationToServerAdapter(navigation);
  const order = sortingToServerAdapter(sorting) || undefined;
  const where = filterToServerAdapter(filter) || undefined;
  return { limit, offset, order, where };
};

/*
 FILTER:
 {
    columnA: {comparator: 'in', value: [1,2,3]},
    columnB: {comparator: '~', value: 'Test'},
 }
 
 will be transformed to
 
 where=columnA:in:1,2,3;columnB:~:Test
 
 SORTING:
 [{field: "columnA"}, {field: "columnB", isDescending: true }]

 will be transformed to

 order=columnA;columnB:desc

 NAVIGATION:
 {page:2, pageSize: 10}

 will be transformed to:

 limit=11
 offset=10
*/

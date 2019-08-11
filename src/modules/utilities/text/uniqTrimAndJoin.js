import uniq from 'lodash/uniq';

export default (array, { maxLength, separator = ', ' }) => {
  const uniqArray = uniq(array);
  const result = uniqArray.slice(0, maxLength).join(separator);
  if (uniqArray.length > maxLength) {
    return `${result}...`;
  }
  return result;
};

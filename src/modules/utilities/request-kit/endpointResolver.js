/* global __API_HOST__  */

export default ({
  modelName,
  query: { id } = {},
  meta: { domain },
}) => {
  const base = `${__API_HOST__}/api/${modelName || domain}`;
  if (!id) {
    return base;
  }
  return `${base}/${id}`;
};

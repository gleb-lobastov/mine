/* eslint-disable import/prefer-default-export */
export const findTabIndex = (pathname, menu) => {
  if (!menu) {
    return -1;
  }
  const specificityLevels = menu.map(item => {
    const { path, params } = item;
    if (!path || !path.checkIsActive(pathname, params)) {
      return -1;
    }
    // specificityLevel
    return path
      .toString()
      .split('/')
      .filter(Boolean).length;
  });
  const maxSpecificity = Math.max(...specificityLevels);
  if (maxSpecificity === -1) {
    return -1;
  }
  return specificityLevels.indexOf(maxSpecificity);
};

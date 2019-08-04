import PropTypes from 'prop-types';
import { memoizeByLastArgs } from 'modules/utilities/memo';
import Path from 'modules/utilities/routing/Path';

export const pathPropType = PropTypes.instanceOf(Path);
export const pathsPropTypes = {
  namedPaths: PropTypes.objectOf(PropTypes.objectOf(pathPropType)),
  orderedPaths: PropTypes.arrayOf(pathPropType),
};

export default memoizeByLastArgs(packages => {
  const namedPaths = {};
  const orderedPaths = [];
  packages.forEach(({ packageName, routing: { routes } = {} }) => {
    if (!routes || !routes.length) {
      return;
    }
    if (!namedPaths[packageName]) {
      namedPaths[packageName] = {};
    }
    routes.forEach(({ routeName, path, defaultRouteParams, ...meta }) => {
      const pathInstance = Path.create(
        path,
        { ...meta, packageName },
        defaultRouteParams,
      );
      namedPaths[packageName][routeName] = pathInstance;
      orderedPaths.push(pathInstance);
    });
  });
  return { orderedPaths, namedPaths };
});

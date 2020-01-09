import mapValues from 'lodash/mapValues';

export default function packagesToPaths(packages) {
  return mapValues(packages, ({ routes = {} }) =>
    mapValues(routes, route => route.path),
  );
}

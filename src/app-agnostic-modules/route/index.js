import pathToRegexp from 'path-to-regexp';
import internals from 'modules/internals';

class Route {
  constructor(path) {
    this.internals = internals({
      path,
      compiledPath: pathToRegexp.compile(path),
    });
  }

  toPath() {
    return this.internals.path;
  }

  toUrl(routeParams) {
    return this.internals.compiledPath(routeParams);
  }
}

export default (...args) => new Route(...args);

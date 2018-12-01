import pathToRegexp from 'path-to-regexp';
import internals from 'modules/internals';

class Route {
  constructor(path) {
    this.internals = internals({
      path,
      compiledPath: pathToRegexp.compile(path),
      regexp: pathToRegexp(path),
    });
  }

  toPath() {
    return this.internals.path;
  }

  toUrl(routeParams) {
    return this.internals.compiledPath(routeParams);
  }

  checkIsActive(pathname = window.location.href) {
    return this.internals.regexp.test(pathname);
  }
}

export default (...args) => new Route(...args);

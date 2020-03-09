import pathToRegexp from 'path-to-regexp';
import isUndefined from 'lodash/isUndefined';
import omitBy from 'lodash/omitBy';

export default class Path {
  static create = (path, meta, defaultRouteParams) =>
    new Path(path, meta, defaultRouteParams);

  constructor(path, meta, defaultRouteParams) {
    this.path = path;
    this.compiledPath = pathToRegexp.compile(path);
    this.matchPath = pathToRegexp.match(path, {
      decode: decodeURIComponent,
      end: false,
    });
    this.meta = meta;
    this.defaultRouteParams = defaultRouteParams;
  }

  derive(extensionPath, meta, defaultRouteParams) {
    return Path.create(
      `${this.path}${extensionPath}`,
      { ...this.meta, meta },
      this.defaultRouteParams
        ? { ...this.defaultRouteParams, ...defaultRouteParams }
        : defaultRouteParams,
    );
  }

  getMeta() {
    return this.meta;
  }

  toString() {
    return this.path;
  }

  toUrl(routeParams) {
    return this.compiledPath(
      omitBy({ ...this.defaultRouteParams, ...routeParams }, isUndefined),
    );
  }

  checkIsActive(pathname = window.location.href, requiredParams) {
    const match = this.matchPath(pathname);
    if (!match) {
      return false;
    }
    if (!requiredParams) {
      return true;
    }
    return Object.entries(requiredParams).every(
      ([key, value]) => match.params[key] === value,
    );
  }
}

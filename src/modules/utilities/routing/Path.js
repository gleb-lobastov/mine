import pathToRegexp from 'path-to-regexp';

export default class Path {
  static create = (path, meta, defaultRouteParams) =>
    new Path(path, meta, defaultRouteParams);

  constructor(path, meta, defaultRouteParams) {
    this.path = path;
    this.compiledPath = pathToRegexp.compile(path);
    this.regexp = pathToRegexp(path, [], { end: false });
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
    return this.compiledPath({ ...this.defaultRouteParams, ...routeParams });
  }

  checkIsActive(pathname = window.location.href) {
    return this.regexp.test(pathname);
  }
}

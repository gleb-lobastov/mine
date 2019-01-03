import pathToRegexp from 'path-to-regexp';

export default class Path {
  static create = (path, meta) => new Path(path, meta);

  constructor(path, meta) {
    this.path = path;
    this.compiledPath = pathToRegexp.compile(path);
    this.regexp = pathToRegexp(path, [], { end: false });
    this.meta = meta;
  }

  derive(extensionPath, meta) {
    return Path.create(`${this.path}${extensionPath}`, { ...this.meta, meta });
  }

  getMeta() {
    return this.meta;
  }

  toString() {
    return this.path;
  }

  toUrl(routeParams) {
    return this.compiledPath(routeParams);
  }

  checkIsActive(pathname = window.location.href) {
    return this.regexp.test(pathname);
  }
}

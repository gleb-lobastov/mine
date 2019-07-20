const consts = {
  PATH_PARTITIONS_SEPARATOR: '.',
  DOMAIN_PROPERTY_SEPARATOR: '.',
  DEFAULT_PATH: 'meta.domain',
};

const createDefaultDomainPathResolver = pathProperty => action =>
  pathProperty
    .split(consts.DOMAIN_PROPERTY_SEPARATOR)
    .reduce((obj, attr) => obj && obj[attr], action);

const getNestedDomain = (domain, pathPartition) => {
  if (!domain || !domain.domains) {
    return undefined;
  }
  return domain.domains[pathPartition];
};

const getNestedPath = (basePath, pathPartition) => {
  if (!basePath) {
    return pathPartition;
  }
  return `${basePath}${consts.DOMAIN_PROPERTY_SEPARATOR}${pathPartition}`;
};

class Distributor {
  constructor(options) {
    const {
      pathPartitionsSeparator = consts.PATH_PARTITIONS_SEPARATOR,
      pathProperty = consts.DEFAULT_PATH,
    } = options;

    this.pathPartitionsSeparator = pathPartitionsSeparator;

    if (typeof pathProperty === 'function') {
      this.resolveDomainPath = pathProperty;
    } else if (typeof pathProperty === 'string') {
      this.resolveDomainPath = createDefaultDomainPathResolver(pathProperty);
    } else {
      throw new Error(
        `invalid pathProperty "${pathProperty}" specified, expected func or string`,
      );
    }
  }

  resolveDomainPathPartitions(domainPath = '') {
    return domainPath.split(this.pathPartitionsSeparator).filter(Boolean);
  }

  selectDomain(rootDomain, domainPath) {
    if (!domainPath) {
      return rootDomain;
    }
    return this.resolveDomainPathPartitions(domainPath).reduce(
      getNestedDomain,
      rootDomain,
    );
  }

  selectDomainStates(baseDomain, basePath = '') {
    if (!baseDomain) {
      return {};
    }
    const baseMap = baseDomain.domainState
      ? { [basePath]: baseDomain.domainState }
      : {};
    if (!baseDomain.domains) {
      return baseMap;
    }
    return Object.assign(
      baseMap,
      ...Object.keys(baseDomain.domains).map(pathPartition =>
        this.selectDomainStates(
          getNestedDomain(baseDomain, pathPartition),
          getNestedPath(basePath, pathPartition),
        ),
      ),
    );
  }

  selectDomainState(rootDomain, domainPath) {
    const domain = this.selectDomain(rootDomain, domainPath);
    if (!domain) {
      return undefined;
    }
    const { domainState } = domain;
    return domainState;
  }

  reduce(prevRootDomain = {}, action, targetReducer) {
    const domainPath = this.resolveDomainPath(action);
    if (!domainPath) {
      return prevRootDomain;
    }
    const nextRootDomain = { ...prevRootDomain };
    let windowOfPrevState = prevRootDomain;
    let windowOfNextState = nextRootDomain;

    const partitions = this.resolveDomainPathPartitions(domainPath).reverse();
    while (partitions.length) {
      const pathPartition = partitions.pop();
      const movedWindowOfPrevState = getNestedDomain(
        windowOfPrevState,
        pathPartition,
      );
      windowOfNextState.domains = {
        ...(windowOfPrevState && windowOfPrevState.domains),
        [pathPartition]: { ...movedWindowOfPrevState },
      };
      windowOfNextState = windowOfNextState.domains[pathPartition];
      windowOfPrevState = movedWindowOfPrevState;
    }
    windowOfNextState.domainState = targetReducer(
      windowOfNextState.domainState,
      action,
    );
    if (
      windowOfPrevState &&
      windowOfNextState.domainState === windowOfPrevState.domainState
    ) {
      return prevRootDomain; // nothing was changed
    }
    return nextRootDomain;
  }
}

const createDistributor = (options = {}) => {
  const { pathPartitionsSeparator, pathProperty } = options;
  const distributor = new Distributor({
    pathPartitionsSeparator,
    pathProperty,
  });
  return {
    distributeReducer: targetReducer => (state, action) =>
      distributor.reduce(state, action, targetReducer),
    selectDomainState: (state, domainPath) =>
      distributor.selectDomainState(state, domainPath),
    selectDomainStates: (state, domainPath) =>
      distributor.selectDomainStates(state, domainPath),
  };
};

createDistributor.consts = consts;
export default createDistributor;

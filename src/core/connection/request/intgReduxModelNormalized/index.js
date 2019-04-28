import configureModels from '../modelNormailzed';
import {
  reducer,
  selectDict,
  selectItem,
  selectList,
  selectMissingIds,
} from './state';
import dispatchEntitiesStrategyEnhancer from './strategyEnhancer';

export const setSelectorRoot = (wrappedSelector, selectorRoot) => (
  state,
  ...args
) => {
  let forwardedState;
  if (typeof selectorRoot === 'function') {
    forwardedState = selectorRoot(state);
  } else if (selectorRoot) {
    forwardedState = state[selectorRoot];
  } else {
    forwardedState = state;
  }
  return wrappedSelector(forwardedState, ...args);
};

const adoptEntitySelector = (selector, selectorRoot) => {
  const adoptedSelector = setSelectorRoot(selector, selectorRoot);
  adoptedSelector.bindModel = modelName => (state, ...args) =>
    adoptedSelector(state, modelName, ...args);
  return adoptedSelector;
};

export default ({ entitiesSelectorRoot, modelsConfig }) => {
  const { modelsNormalizedPlugin, denormalize } = configureModels(modelsConfig);

  const modelsStrategyEnhancer = requestHandler =>
    dispatchEntitiesStrategyEnhancer(modelsNormalizedPlugin(requestHandler));

  return {
    reducer,
    modelsStrategyEnhancer,
    // reduxModelPlugin,
    selectors: {
      selectDict: adoptEntitySelector(selectDict, entitiesSelectorRoot),
      selectItem: adoptEntitySelector(selectItem, entitiesSelectorRoot),
      selectList: adoptEntitySelector(selectList, entitiesSelectorRoot),
      selectMissingIds: adoptEntitySelector(
        selectMissingIds,
        entitiesSelectorRoot,
      ),
    },
    denormalize: (state, requirements, result) =>
      denormalize(requirements, result, entitiesSelectorRoot(state)),
  };
};

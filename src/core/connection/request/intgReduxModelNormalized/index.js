import configureModels from '../modelNormailzed';
import {
  reducer,
  selectDict,
  selectItem,
  selectList,
  selectMissingIds,
} from './state';
import dispatchEntitiesStrategyEnhancer from './strategyEnhancer';
import adoptEntitySelector from './utils/adoptEntitySelector';

export default ({ entitiesSelector: selectEntities, modelsConfig }) => {
  const { modelsNormalizedPlugin, denormalize } = configureModels(modelsConfig);

  const modelsStrategyEnhancer = requestHandler =>
    dispatchEntitiesStrategyEnhancer(modelsNormalizedPlugin(requestHandler));

  return {
    reducer,
    modelsStrategyEnhancer,
    selectors: {
      selectDict: adoptEntitySelector(selectDict, selectEntities),
      selectItem: adoptEntitySelector(selectItem, selectEntities),
      selectList: adoptEntitySelector(selectList, selectEntities),
      selectMissingIds: adoptEntitySelector(selectMissingIds, selectEntities),
    },
    denormalize: (state, requirements, result) =>
      denormalize(requirements, result, selectEntities(state)),
  };
};

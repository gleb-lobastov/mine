/* global __API_HOST__ __IS_DEV_MODE__ */
import modelsDefinitions from '../models';
import requestHandler from './requestHandler';
import createRequestApi from './request';

const {
  reduxMiddleware: requestMiddleware,
  provide,
  useProvision,
  useRequest,
  reducer: requestReducer,
  selectors,
} = createRequestApi({
  modelsConfig: { modelsDefinitions },
  requestHandler,
});

const {
  selectDict,
  selectItem,
  selectList,
  selectMissingIds,
  selectError,
  selectIsError,
  selectIsPending,
  selectIsReady,
  selectIsUnsent,
  selectIsValid,
  selectLastError,
  selectPlaceholder,
  selectReadyState,
  selectResult,
  selectProvisionState,
  selectDomainProvisionState,
  selectDomainProvisionStates,
} = selectors;

export {
  provide,
  requestMiddleware,
  requestReducer,
  selectDict,
  selectItem,
  selectList,
  selectMissingIds,
  selectError,
  selectIsError,
  selectIsPending,
  selectIsReady,
  selectIsUnsent,
  selectIsValid,
  selectLastError,
  selectPlaceholder,
  selectReadyState,
  selectResult,
  selectProvisionState,
  selectDomainProvisionState,
  selectDomainProvisionStates,
  useProvision,
  useRequest
};

import sum from 'lodash/sum';
import {
  selectError,
  selectIsError,
  selectIsPending,
  selectIsReady,
  selectIsValid,
  selectUpdatesCounter,
} from '../controllerRedux';

export default function mergeProvisionsState(...provisions) {
  return {
    updatesCounter: sum(provisions.map(selectUpdatesCounter)),
    isReady: provisions.every(selectIsReady),
    isPending: provisions.some(selectIsPending),
    isValid: provisions.every(selectIsValid),
    error: provisions.find(selectIsError),
    errors: provisions.map(selectError).filter(Boolean),
    invalidate: () => provisions.forEach(({ invalidate }) => invalidate()),
  };
}

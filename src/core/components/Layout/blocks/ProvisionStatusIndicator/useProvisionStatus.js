import { useSelector } from 'react-redux';
import { selectDomainProvisionStates } from 'core/connection';
import {
  selectIsPending,
  selectError,
} from 'core/connection/request/controllerRedux';

export default function useProvisionStatus() {
  const provisionStatesList = Object.values(
    useSelector(selectDomainProvisionStates),
  );
  const errors = provisionStatesList.map(selectError).filter(Boolean);
  return {
    hasPendingRequests: provisionStatesList.some(selectIsPending),
    hasErrors: errors.length > 0,
    errors,
  };
}

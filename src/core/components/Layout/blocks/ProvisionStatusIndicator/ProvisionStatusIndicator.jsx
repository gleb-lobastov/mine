import React from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
import useProvisionStatus from './useProvisionStatus';
import makeFlagWithInertia from './makeFlagWithInertia';

const SHOW_DELAY = 200;
const HIDE_DELAY = 800;
const useFlagWithInertia = makeFlagWithInertia({
  setupDelay: SHOW_DELAY,
  teardownDelay: HIDE_DELAY,
});

export default function ProvisionStatusIndicator() {
  const { hasPendingRequests } = useProvisionStatus();
  const isPendingIndicatorVisible = useFlagWithInertia(hasPendingRequests);
  if (!isPendingIndicatorVisible) {
    return null;
  }
  return <LinearProgress />;
}

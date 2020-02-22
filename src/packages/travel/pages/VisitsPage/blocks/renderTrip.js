import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import IconEdit from '@material-ui/icons/Edit';
import TripInfo from 'travel/components/models/trips/TripInfo';

export default function renderTrip({
  visit: { visitId, tripId },
  changes: { isTripChanged },
  provision: { tripsDict },
  travelPaths: { tripEdit: tripEditPath },
  hasEditRights,
  userAlias,
  classes,
}) {
  if (!isTripChanged) {
    return null;
  }

  const tripEditButtonNode = hasEditRights ? (
    <IconButton
      className={classes.visibleOnlyOnHover}
      href={tripEditPath.toUrl({ userAlias, strTripId: String(tripId) })}
      size="small"
    >
      <IconEdit />
    </IconButton>
  ) : null;

  return (
    <TripInfo
      key={`t${tripId}_v${visitId}`}
      className={classes.visibilityTrigger}
      trip={tripsDict[tripId]}
    >
      {tripEditButtonNode}
    </TripInfo>
  );
}

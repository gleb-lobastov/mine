import React from 'react';
import cls from 'classnames';
import IconButton from '@material-ui/core/IconButton';
import IconEdit from '@material-ui/icons/Edit';
import TripInfo from 'travel/components/models/trips/TripInfo';

export default function renderTrip({
  visit: { visitId, tripId },
  className,
  changes: { isTripChanged },
  provision: { tripsDict, visitsDict, countriesDict, locationsDict },
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
      className={cls(className, classes.visibilityTrigger, classes.group)}
      trip={tripsDict[tripId]}
      visitsDict={visitsDict}
      countriesDict={countriesDict}
      locationsDict={locationsDict}
    >
      {tripEditButtonNode}
    </TripInfo>
  );
}

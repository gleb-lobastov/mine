import React from 'react';
import cls from 'classnames';
import TripInfo from './TripInfo';

export default function TripVisitsGroup({
  classes,
  children,
  visitsGroup: {
    field: { value: tripId },
  },
  provision: { tripsDict, visitsDict, countriesDict, locationsDict },
  urls,
}) {
  return (
    <TripInfo
      key={`t${tripId}`}
      className={cls(classes.container, classes.header)}
      classes={classes}
      trip={tripsDict[tripId]}
      visitsDict={visitsDict}
      countriesDict={countriesDict}
      locationsDict={locationsDict}
      variant={null}
      urls={urls}
    >
      {children}
    </TripInfo>
  );
}

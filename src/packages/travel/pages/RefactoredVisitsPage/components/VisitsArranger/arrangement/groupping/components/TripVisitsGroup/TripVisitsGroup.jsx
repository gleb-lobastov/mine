import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TripInfo from 'travel/components/models/trips/TripInfo';
import cls from 'classnames';

const useStyles = makeStyles({});

export default function TripVisitsGroup({
  groupKey: tripId,
  classes,
  children,
  visitsList,
  provision: { tripsDict, visitsDict, countriesDict, locationsDict },
}) {
  const ownClasses = useStyles();

  return (
    <>
      <TripInfo
        key={`t${tripId}`}
        className={cls(
          classes.container,
          ownClasses.visibilityTrigger,
          ownClasses.group,
        )}
        classes={classes}
        trip={tripsDict[tripId]}
        visitsDict={visitsDict}
        countriesDict={countriesDict}
        locationsDict={locationsDict}
      />
      {children}
    </>
  );
}

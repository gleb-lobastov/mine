import React from 'react';
import RideInfo from 'travel/components/models/rides/RideInfo';
import renderOriginLocation from './renderOriginLocation';

export default function renderDepartureLocation(props) {
  const {
    visit: { arrivalRideId },
    className,
    classes,
    changes: { isTripChanged },
    provision: { ridesDict },
  } = props;

  if (!isTripChanged) {
    return null;
  }

  return renderOriginLocation({
    ...props,
    className,
    keyBase: `dl`,
    children: (
      <RideInfo ride={ridesDict[arrivalRideId]} className={classes.halfDown} />
    ),
  });
}

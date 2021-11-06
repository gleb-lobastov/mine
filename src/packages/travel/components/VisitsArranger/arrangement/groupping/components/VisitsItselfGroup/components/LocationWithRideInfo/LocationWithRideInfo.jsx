import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import RideInfo from 'travel/components/RideInfo';
import AutoMargin from 'modules/components/AutoMargin';
import { LocationInfo } from '../../../LocationVisitsGroup/LocationVisitsGroup';

const useStyles = makeStyles({
  halfDown: { position: 'relative', top: 12 },
});

export default function LocationWithRideInfo({
  locationId,
  rideId,
  provision,
  provision: { ridesDict, locationsDict },
  groupCountryId,
  children,
  editButton,
  className,
}) {
  const classes = useStyles();
  const location = locationsDict[locationId];

  return (
    <AutoMargin>
      <LocationInfo
        className={className}
        provision={provision}
        location={location}
        showCountry={!groupCountryId}
      >
        {editButton}
      </LocationInfo>
      {groupCountryId ? (
        children
      ) : (
        <Grid container={true}>
          <Grid item={true}>{children}</Grid>
          <Grid item={true}>
            <RideInfo ride={ridesDict[rideId]} className={classes.halfDown} />
          </Grid>
        </Grid>
      )}
    </AutoMargin>
  );
}
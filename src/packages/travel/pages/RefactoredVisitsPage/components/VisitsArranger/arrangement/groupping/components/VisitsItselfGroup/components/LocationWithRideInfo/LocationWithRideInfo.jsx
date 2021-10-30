import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import RideInfo from 'travel/components/models/rides/RideInfo';
import AutoMargin from 'modules/components/AutoMargin';
import { LocationInfo } from '../../../LocationVisitsGroup/LocationVisitsGroup';

const useStyles = makeStyles({
  halfDown: { position: 'relative', top: 12 },
});

export default function LocationWithRideInfo({
  locationId,
  rideId,
  provision: { countriesDict, ridesDict, locationsDict },
  groupCountryId,
  children,
  className,
}) {
  const classes = useStyles();
  const location = locationsDict[locationId];

  return (
    <AutoMargin>
      <LocationInfo
        className={className}
        countriesDict={countriesDict}
        location={location}
        showCountry={!groupCountryId}
      />
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

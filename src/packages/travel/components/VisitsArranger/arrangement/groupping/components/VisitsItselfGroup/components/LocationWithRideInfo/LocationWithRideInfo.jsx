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
  locationInfoChildren,
  className,
  classes,
  urls,
}) {
  const ownClasses = useStyles();
  const location = locationsDict[locationId];

  return (
    <AutoMargin className={className}>
      <LocationInfo
        className={classes.locationContainer}
        provision={provision}
        location={location}
        showCountry={!groupCountryId}
        locationUrl={urls?.resolveLocationUrl({ locationId })}
        countryUrl={urls?.resolveCountryUrl({ countryId: location?.countryId })}
      >
        {locationInfoChildren}
      </LocationInfo>
      {groupCountryId ? (
        children
      ) : (
        <Grid container={true}>
          <Grid item={true}>{children}</Grid>
          <Grid item={true}>
            <RideInfo
              ride={ridesDict[rideId]}
              className={ownClasses.halfDown}
            />
          </Grid>
        </Grid>
      )}
    </AutoMargin>
  );
}

LocationWithRideInfo.defaultProps = {
  classes: {},
};

import React from 'react';
import Typography from '@material-ui/core/Typography';
import { findClosestGroupValue } from '../../utils/resolveGroupingUtils';
import { PLAIN_GROUPS } from '../../consts';

export default function LocationVisitsGroup({
  children,
  visitsGroup,
  visitsGroup: {
    field: { value: locationIdStr },
  },
  classes,
  provision: { countriesDict, locationsDict },
}) {
  const location = locationsDict[locationIdStr];
  const groupCountryId = findClosestGroupValue(
    visitsGroup,
    PLAIN_GROUPS.COUNTRIES,
  );

  return (
    <LocationInfo
      className={classes.container}
      classes={classes}
      location={location}
      countriesDict={countriesDict}
      showCountry={!groupCountryId}
    >
      {children}
    </LocationInfo>
  );
}

export function LocationInfo({
  children,
  variant,
  className,
  classes = {},
  location: { locationName, countryId } = {},
  countriesDict,
  showCountry,
}) {
  const countryNode =
    (showCountry && countriesDict[countryId]?.countryName) || null;

  return (
    <div className={className}>
      <Typography display="inline" variant={variant} className={classes.header}>
        {`${locationName}${countryNode ? ', ' : ''}`}
      </Typography>
      <Typography display="inline" variant="body1">
        {countryNode}
      </Typography>
      {children}
    </div>
  );
}

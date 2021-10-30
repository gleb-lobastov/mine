import React from 'react';
import Typography from '@material-ui/core/Typography';

export default function CountryVisitsGroup({
  children,
  visitsGroup: {
    field: { value: countryId },
  },
  classes,
  provision: { countriesDict },
}) {
  return (
    <CountryInfo
      country={countriesDict[countryId]}
      className={classes.container}
      classes={classes}
    >
      {children}
    </CountryInfo>
  );
}

function CountryInfo({
  variant,
  country: { countryName },
  children,
  className,
  classes,
}) {
  return (
    <div className={className}>
      <Typography display="inline" variant={variant} className={classes.header}>
        {countryName}
      </Typography>
      {children}
    </div>
  );
}

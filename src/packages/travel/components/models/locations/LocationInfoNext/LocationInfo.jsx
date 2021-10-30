import React from 'react';
import Typography from '@material-ui/core/Typography';

export default function LocationInfo({
  children,
  className,
  location: { locationName, countryId } = {},
  countriesDict,
  showCountry,
}) {
  const countryNode =
    (showCountry && countriesDict[countryId]?.countryName) || null;

  return (
    <Typography className={className}>
      {locationName} {countryNode} {children}
    </Typography>
  );
}

import React from 'react';
import Typography from '@material-ui/core/Typography';
import ConnectedLink from 'modules/components/muiExtended/ConnectedLink';

export default function CountryVisitsGroup({
  children,
  visitsGroup: {
    field: { value: countryId },
  },
  classes,
  provision: { countriesDict },
  urls,
}) {
  return (
    <CountryInfo
      country={countriesDict[countryId]}
      className={classes.container}
      classes={classes}
      urls={urls}
    >
      {children}
    </CountryInfo>
  );
}

function CountryInfo({
  variant,
  country: { countryName, countryId },
  children,
  className,
  classes,
  urls,
}) {
  const countryUrl = urls?.resolveCountryUrl({ countryId });

  return (
    <div className={className}>
      <ConnectedLink to={countryUrl} optional={true}>
        <Typography display="inline" variant={variant} className={classes.header}>
          {countryName}
        </Typography>
      </ConnectedLink>
      {children}
    </div>
  );
}

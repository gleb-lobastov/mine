import React from 'react';
import ConnectedLink from 'modules/components/muiExtended/ConnectedLink';

export default function CountryVisitsGroup({
  children,
  visitsGroup: {
    field: { value: countryId },
  },
  classes,
  provision: { countriesDict },
  urls,
  config: {
    CountryVisitsGroup: {
      hyperlinks: { country: countryHyperlink = true } = {},
    } = {},
  },
}) {
  return (
    <CountryInfo
      country={countriesDict[countryId]}
      className={classes.container}
      classes={classes}
      countryUrl={
        countryHyperlink ? urls?.resolveCountryUrl({ countryId }) : null
      }
    >
      {children}
    </CountryInfo>
  );
}

export function CountryInfo({
  variant,
  country: { countryName },
  children,
  className,
  classes,
  countryUrl,
}) {
  return (
    <div className={className}>
      <ConnectedLink
        to={countryUrl}
        optional={true}
        display="inline"
        variant={variant}
        className={classes.header}
      >
        {countryName}
      </ConnectedLink>
      {children}
    </div>
  );
}

CountryVisitsGroup.defaultProps = {
  config: {},
};

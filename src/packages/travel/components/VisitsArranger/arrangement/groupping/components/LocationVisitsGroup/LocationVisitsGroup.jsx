import React from 'react';
import Typography from '@material-ui/core/Typography';
import ConnectedLink from 'modules/components/muiExtended/ConnectedLink';
import { findClosestGroupValue } from '../../utils/resolveGroupingUtils';
import { PLAIN_GROUPS } from '../../consts';

export default function LocationVisitsGroup({
  children,
  visitsGroup,
  visitsGroup: {
    field: { value: locationIdStr },
  },
  classes,
  provision,
  provision: { locationsDict },
  urls,
  config: {
    LocationVisitsGroup: {
      appearance,
      hyperlinks: {
        location: locationHyperlink = true,
        country: countryHyperlink = true,
      } = {},
    } = {},
  },
}) {
  const location = locationsDict[locationIdStr];
  const groupCountryId = findClosestGroupValue(
    visitsGroup,
    PLAIN_GROUPS.COUNTRIES,
  );
  const { locationId, countryId } = location ?? {};

  const locationUrl = locationHyperlink
    ? urls?.resolveLocationUrl({ locationId })
    : null;
  const countryUrl = countryHyperlink
    ? urls?.resolveCountryUrl({ countryId })
    : null;

  return (
    <LocationInfo
      className={classes.container}
      classes={classes}
      location={location}
      provision={provision}
      showCountry={!groupCountryId}
      locationUrl={locationUrl}
      countryUrl={countryUrl}
      appearance={appearance}
    >
      {children}
    </LocationInfo>
  );
}

LocationVisitsGroup.defaultProps = {
  config: {},
};

export function LocationInfo({
  children,
  variant,
  className,
  classes = {},
  location: { locationName, countryId } = {},
  provision: { countriesDict },
  showCountry,
  locationUrl,
  countryUrl,
  appearance: { country: countryAppearance = true },
}) {
  const countryName = countriesDict[countryId]?.countryName;
  const countryNode =
    countryAppearance && countryName && showCountry ? (
      <ConnectedLink to={countryUrl} optional={true}>
        <Typography display="inline" variant="body1">
          {countriesDict[countryId]?.countryName}
        </Typography>
      </ConnectedLink>
    ) : null;

  const locationNode = (
    <ConnectedLink to={locationUrl} optional={true}>
      <Typography display="inline" variant={variant} className={classes.header}>
        {locationName}
        {countryNode ? ',' : ''}
      </Typography>
    </ConnectedLink>
  );

  return (
    <div className={className}>
      <div>
        {locationNode}
        {countryNode ? ' ' : null}
        {countryNode}
      </div>
      {children}
    </div>
  );
}

LocationInfo.defaultProps = {
  appearance: {},
};

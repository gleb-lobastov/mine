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
  provision: { countriesDict, locationsDict },
  urls,
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
      urls={urls}
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
  location: { locationName, locationId, countryId } = {},
  countriesDict,
  showCountry,
  urls,
}) {
  const countryNode =
    (showCountry && countriesDict[countryId]?.countryName) || null;

  const locationUrl = urls?.resolveLocationUrl({ locationId });

  return (
    <div className={className}>
      <ConnectedLink to={locationUrl}>
        <Typography
          display="inline"
          variant={variant}
          className={classes.header}
        >
          {`${locationName}${countryNode ? ', ' : ''}`}
        </Typography>
        {countryNode && (
          <Typography display="inline" variant="body1">
            {countryNode}
          </Typography>
        )}
      </ConnectedLink>
      {children}
    </div>
  );
}

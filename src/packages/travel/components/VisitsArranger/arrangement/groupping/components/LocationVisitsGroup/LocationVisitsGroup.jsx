import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import ConnectedLink from 'modules/components/muiExtended/ConnectedLink';
import LocationsMap, { MARKERS_SCALES } from 'travel/components/LocationsMap';
import { findClosestGroupValue } from '../../utils/resolveGroupingUtils';
import { PLAIN_GROUPS } from '../../consts';
import MUILink from '@material-ui/core/Link';

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
      provision={provision}
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
  provision: { countriesDict, locationsDict, visitsDict, locationsRating },
  showCountry,
  urls,
}) {
  const [mapVisible, setMapVisible] = useState(false);

  const countryName = countriesDict[countryId]?.countryName;
  const countryNode =
    countryName && showCountry ? (
      <Typography display="inline" variant="body1">
        {countriesDict[countryId]?.countryName}
      </Typography>
    ) : null;

  const locationUrl = urls?.resolveLocationUrl({ locationId });
  const countryUrl = urls?.resolveCountryUrl({ countryId });

  const locationNode = (
    <Typography display="inline" variant={variant} className={classes.header}>
      {locationName}
      {countryNode ? ',' : ''}
    </Typography>
  );

  return (
    <>
      <div className={className}>
        <div>
          {locationUrl ? (
            <ConnectedLink to={locationUrl}>{locationNode}</ConnectedLink>
          ) : (
            locationNode
          )}
          {countryNode ? ' ' : null}
          {countryUrl ? (
            <ConnectedLink to={countryUrl}>{countryNode}</ConnectedLink>
          ) : (
            countryNode
          )}
        </div>
        {children}
        <MUILink
          variant="body2"
          onClick={() => setMapVisible(prevMapVisible => !prevMapVisible)}
          className={classes.mapVisibilityToggle}
        >
          {mapVisible ? 'скрыть карту' : 'на карте'}
        </MUILink>
      </div>
      {mapVisible && (
        <LocationsMap
          className={classes.mapContainer}
          locationsDict={locationsDict}
          visitsDict={visitsDict}
          locationsRating={locationsRating}
          locationsIds={[locationId]}
          minHeight={300}
          scaleBy={MARKERS_SCALES.BY_RATING}
          ratingLevel={locationsRating[locationId]}
        />
      )}
    </>
  );
}

import React from 'react';
import Typography from '@material-ui/core/Typography';
import StatsPanel from '../../../StatsPanel';
import { resolveGroupingCountry } from '../../utils';

export default function LocationVisitsGroup({
  children,
  visitsList,
  groupingFields,
  groupingField: { value: locationIdStr },
  headingVariant,
  className,
  isObscure,
  provision,
  provision: { countriesDict, locationsDict },
}) {
  const location = locationsDict[locationIdStr];
  const groupingCountryId = resolveGroupingCountry(groupingFields);
  return (
    <>
      <LocationInfo
        variant={headingVariant}
        className={className}
        location={location}
        countriesDict={countriesDict}
        showCountry={!groupingCountryId}
      >
        <StatsPanel
          provision={provision}
          visitsList={visitsList}
          daysTravellingStats={{ considerRides: false }}
          isObscure={isObscure}
        />
      </LocationInfo>
      {children}
    </>
  );
}

function LocationInfo({
  children,
  variant,
  className,
  location: { locationName, countryId } = {},
  countriesDict,
  showCountry,
}) {
  const countryNode =
    (showCountry && countriesDict[countryId]?.countryName) || null;

  return (
    <div className={className}>
      <Typography display="inline" variant={variant}>
        {`${locationName}${countryNode ? ', ' : ''}`}
      </Typography>
      <Typography display="inline" variant="body1">
        {countryNode}
      </Typography>
      {children}
    </div>
  );
}

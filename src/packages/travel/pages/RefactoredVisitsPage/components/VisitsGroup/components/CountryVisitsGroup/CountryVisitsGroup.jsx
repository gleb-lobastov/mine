import React from 'react';
import Typography from '@material-ui/core/Typography';
import StatsPanel, { CONSIDER_RIDES } from '../../../StatsPanel';
import { resolveGroupingYear } from '../../utils';

export default function CountryVisitsGroup({
  children,
  visitsList,
  groupingFields,
  groupingField: { value: countryIdStr },
  headingVariant,
  className,
  isObscure,
  provision,
  provision: { countriesDict },
}) {
  const groupingYear = resolveGroupingYear(groupingFields);
  return (
    <>
      <CountryInfo
        key={`c${countryIdStr}`}
        country={countriesDict[countryIdStr]}
        variant={headingVariant}
        className={className}
      >
        <StatsPanel
          provision={provision}
          visitsList={visitsList}
          locationsStats={{ showByYear: groupingYear }}
          daysTravellingStats={{ considerRides: CONSIDER_RIDES.COUNTRY }}
          isObscure={isObscure}
        />
      </CountryInfo>
      {children}
    </>
  );
}

function CountryInfo({
  variant,
  country: { countryName },
  children,
  className,
}) {
  return (
    <div className={className}>
      <Typography display="inline" variant={variant}>
        {countryName}
      </Typography>
      {children}
    </div>
  );
}

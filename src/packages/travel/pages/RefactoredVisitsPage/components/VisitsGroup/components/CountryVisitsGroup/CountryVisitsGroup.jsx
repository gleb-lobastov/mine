import React from 'react';
import Typography from '@material-ui/core/Typography';
import StatsPanel, { CONSIDER_RIDES } from '../../../StatsPanel';
import { PLAIN_GROUPS } from 'travel/pages/RefactoredVisitsPage/consts';

export default function CountryVisitsGroup({
  children,
  visitsList,
  groupingFields,
  groupingField: { value: countryIdStr, stats },
  headingVariant,
  className,
  isObscure,
  provision,
  provision: { countriesDict },
}) {
  const groupingYearField = groupingFields.find(
    ({ plainGroup }) => plainGroup === PLAIN_GROUPS.YEARS,
  );
  const newbie = groupingYearField?.stats?.countriesStats?.newbies?.has(
    parseInt(countryIdStr, 10),
  );
  return (
    <>
      <CountryInfo
        key={`c${countryIdStr}`}
        country={countriesDict[countryIdStr]}
        variant={headingVariant}
        className={className}
      >
        <StatsPanel
          newbie={newbie}
          stats={stats}
          provision={provision}
          visitsList={visitsList}
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

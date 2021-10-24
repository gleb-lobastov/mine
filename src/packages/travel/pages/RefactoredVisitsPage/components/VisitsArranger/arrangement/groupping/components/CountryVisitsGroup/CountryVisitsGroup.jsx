import React from 'react';
import Typography from '@material-ui/core/Typography';
import StatsPanel from '../../../../../StatsPanel';
import { PLAIN_GROUPS } from '../..';


export default function CountryVisitsGroup({
  children,
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

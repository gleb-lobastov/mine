import React from 'react';
import Typography from '@material-ui/core/Typography';
import StatsPanel from '../../../../../StatsPanel';
import { PLAIN_GROUPS } from '../..';

export default function CountryVisitsGroup({
  children,
  visitGroup: {
    field: { value: countryIdStr },
    fieldsStack,
    stats,
  },
  classes,
  isObscure,
  provision,
  provision: { countriesDict },
}) {
  const groupingYearField = fieldsStack.find(
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
        className={classes.container}
        classes={classes}
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
  classes,
}) {
  return (
    <div className={className}>
      <Typography display="inline" variant={variant} className={classes.header}>
        {countryName}
      </Typography>
      {children}
    </div>
  );
}

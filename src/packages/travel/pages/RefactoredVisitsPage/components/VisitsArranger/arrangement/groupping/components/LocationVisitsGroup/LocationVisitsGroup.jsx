import React from 'react';
import Typography from '@material-ui/core/Typography';
import { PLAIN_GROUPS } from '../..';
import StatsPanel from '../../../../../StatsPanel';

export default function LocationVisitsGroup({
  children,
  visitGroup: {
    field: { value: locationIdStr },
    fieldsStack,
    stats,
  },
  classes,
  isObscure,
  provision,
  provision: { countriesDict, locationsDict },
}) {
  const location = locationsDict[locationIdStr];
  const groupingYearField = fieldsStack.find(
    ({ plainGroup }) => plainGroup === PLAIN_GROUPS.YEARS,
  );
  const groupingCountryField = fieldsStack.find(
    ({ plainGroup }) => plainGroup === PLAIN_GROUPS.COUNTRIES,
  );

  const countryLocationStats = groupingCountryField?.stats?.locationsStats;
  const allLocationsIsNew =
    !countryLocationStats ||
    !countryLocationStats.newAtYear ||
    !countryLocationStats.totalAtYear ||
    countryLocationStats.newAtYear === countryLocationStats.totalAtYear;
  const showNewbieBadge =
    !allLocationsIsNew &&
    groupingYearField?.stats?.locationsStats?.newbies?.has(
      parseInt(locationIdStr, 10),
    );
  return (
    <>
      <LocationInfo
        className={classes.container}
        classes={classes}
        location={location}
        countriesDict={countriesDict}
        showCountry={!groupingCountryField?.groupingCountryId}
      >
        <StatsPanel
          newbie={showNewbieBadge}
          provision={provision}
          stats={stats}
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
  classes,
  location: { locationName, countryId } = {},
  countriesDict,
  showCountry,
}) {
  const countryNode =
    (showCountry && countriesDict[countryId]?.countryName) || null;

  return (
    <div className={className}>
      <Typography display="inline" variant={variant} className={classes.header}>
        {`${locationName}${countryNode ? ', ' : ''}`}
      </Typography>
      <Typography display="inline" variant="body1">
        {countryNode}
      </Typography>
      {children}
    </div>
  );
}

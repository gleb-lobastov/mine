import React from 'react';
import cls from 'classnames';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import FiberNewIcon from '@material-ui/icons/FiberNew';
import { findClosestGroupValue } from '../../../arrangement/groupping/utils/resolveGroupingUtils';
import { PLAIN_GROUPS } from '../../../arrangement/groupping/consts';
import CountriesStats from './components/CountriesStats';
import LocationStats from './components/LocationStats';
import DaysTravellingStats from './components/DaysTravellingStats';
import isNewbie from './utils/isNewbie';

const useStyles = makeStyles({
  container: {
    color: 'gray',
    display: 'inline-flex',
    alignItems: 'center',
    marginLeft: '4px',
  },
});

export default function StatsPanel({
  provision,
  visitsGroup,
  visitsGroup: {
    stats: { countriesStats, locationsStats, daysTravellingStats },
  },
  config: {
    StatsPanel: {
      appearance: {
        CountriesStats: countriesStatsAppearance = true,
        LocationsStats: locationStatsAppearance = true,
        DaysTravellingStats: daysTravellingStatsAppearance = true,
      } = {},
    } = {},
  },
  isObscure,
}) {
  const classes = useStyles();

  const isLocationGroup = visitsGroup.plainGroup === PLAIN_GROUPS.LOCATIONS;
  const hasCountryGroup = Boolean(
    findClosestGroupValue(visitsGroup, PLAIN_GROUPS.COUNTRIES),
  );
  const hasLocationGroup = Boolean(
    findClosestGroupValue(visitsGroup, PLAIN_GROUPS.LOCATIONS),
  );
  const hasYearGroup = Boolean(
    findClosestGroupValue(visitsGroup, PLAIN_GROUPS.YEARS),
  );

  const daysTravellingStatsNode =
    daysTravellingStatsAppearance && daysTravellingStats && !isObscure ? (
      <DaysTravellingStats
        className={cls({
          [classes.visibleOnlyOnHover]: isLocationGroup,
        })}
        daysTravellingStats={daysTravellingStats}
        provision={provision}
      />
    ) : null;

  return (
    <Typography variant="body1" className={classes.container}>
      {hasYearGroup && isNewbie(visitsGroup) && <FiberNewIcon />}
      {countriesStatsAppearance &&
        !hasCountryGroup && <CountriesStats countriesStats={countriesStats} />}
      {locationStatsAppearance &&
        !hasLocationGroup && <LocationStats locationsStats={locationsStats} />}
      {daysTravellingStatsNode}
    </Typography>
  );
}

StatsPanel.defaultProps = {
  config: {},
};

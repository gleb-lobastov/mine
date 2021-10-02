import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import FiberNewIcon from '@material-ui/icons/FiberNew';
import CountriesStats from './components/CountriesStats';
import LocationStats from './components/LocationStats';
import DaysTravellingStats from './components/DaysTravellingStats';

export { CONSIDER_RIDES } from './components/DaysTravellingStats';

const useStyles = makeStyles({
  container: {
    color: 'gray',
    display: 'inline',
  },
});

export default function StatsPanel({
  visitsList,
  provision: { visitsDict, ridesDict, locationsDict },
  stats: { countriesStats, locationsStats },
  visitsStats,
  daysTravellingStats,
  datesStats,
  isObscure,
  ratesStats,
  newbie,
}) {
  const classes = useStyles();

  return (
    <Typography variant="body1" className={classes.container}>
      {newbie && <FiberNewIcon />}
      {countriesStats && <CountriesStats countriesStats={countriesStats} />}
      {locationsStats && <LocationStats locationsStats={locationsStats} />}
      {daysTravellingStats &&
        !isObscure && (
          <DaysTravellingStats
            daysTravellingStats={daysTravellingStats}
            visitsDict={visitsDict}
            ridesDict={ridesDict}
            visitsList={visitsList}
            locationsDict={locationsDict}
          />
        )}
    </Typography>
  );
}

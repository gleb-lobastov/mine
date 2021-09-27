import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
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
  provision: { visitsDict, ridesDict },
  countriesStats,
  locationsStats,
  visitsStats,
  daysTravellingStats,
  datesStats,
  isObscure,
  ratesStats,
}) {
  const classes = useStyles();

  return (
    <Typography variant="body1" className={classes.container}>
      {countriesStats && (
        <CountriesStats
          countriesStats={countriesStats}
          visitsDict={visitsDict}
          visitsList={visitsList}
        />
      )}
      {locationsStats && (
        <LocationStats
          locationsStats={locationsStats}
          visitsDict={visitsDict}
          visitsList={visitsList}
        />
      )}
      {daysTravellingStats &&
        !isObscure && (
          <DaysTravellingStats
            daysTravellingStats={daysTravellingStats}
            visitsDict={visitsDict}
            ridesDict={ridesDict}
            visitsList={visitsList}
          />
        )}
    </Typography>
  );
}

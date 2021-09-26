import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import CountriesStats from './components/CountriesStats';
import LocationStats from './components/LocationStats';

const useStyles = makeStyles({
  container: {
    color: 'gray',
  },
  statsGroup: {
    display: 'inline-flex',
    alignItems: 'center',
    marginRight: '12px',
  },
});

export default function StatsPanel({
  visitsList,
  provision: { visitsDict },
  countriesStats,
  locationsStats,
  visitsStats,
  daysInTravelStats,
  datesStats,
  ratesStats,
}) {
  const classes = useStyles();

  return (
    <Typography variant="body1" className={classes.container}>
      {countriesStats && (
        <CountriesStats
          className={classes.statsGroup}
          countriesStats={countriesStats}
          visitsDict={visitsDict}
          visitsList={visitsList}
        />
      )}
      {locationsStats && (
        <LocationStats
          className={classes.statsGroup}
          locationsStats={locationsStats}
          visitsDict={visitsDict}
          visitsList={visitsList}
        />
      )}
    </Typography>
  );
}

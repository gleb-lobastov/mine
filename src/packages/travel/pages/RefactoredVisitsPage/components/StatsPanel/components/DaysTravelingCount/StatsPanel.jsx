import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CountryInfo from 'travel/components/models/countries/CountryInfo';
import cls from 'classnames';

const useStyles = makeStyles({});

export default function StatsPanel({
  className,
  visitsList,
  provision: { countriesDict },
  countriesStats,
  locationsStats,
  visitsStats,
  daysInTravelStats,
  datesStats,
  ratesStats,
}) {
  const classes = useStyles();

  return <></>;
}

function countLocations(visitsList) {
  return new Set(visitsList.map(({ locationId }) => locationId)).size;
}

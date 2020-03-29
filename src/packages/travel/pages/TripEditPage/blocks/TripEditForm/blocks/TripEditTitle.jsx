import React from 'react';
import Typography from '@material-ui/core/Typography';
import { resolveTripCaption } from 'travel/models/trips/utils';

export default function TripEditTitle({
  isCreation,
  className,
  provision,
  formikProps: { values },
}) {
  const { trip: formTrip, visitsDict: formVisitsDict } = values;
  const { countriesDict, locationsDict } = provision;

  const modeCaption = isCreation
    ? 'Создание поездки'
    : 'Редактирование поездки';

  const tripName = resolveTripCaption(
    formTrip,
    formVisitsDict,
    countriesDict,
    locationsDict,
  );

  const tripCaption = `${modeCaption}: "${tripName}"`;

  return (
    <Typography variant="h6" className={className}>
      {tripCaption}
    </Typography>
  );
}

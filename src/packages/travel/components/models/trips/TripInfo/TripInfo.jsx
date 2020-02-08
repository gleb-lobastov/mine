import React from 'react';
import Typography from '@material-ui/core/Typography';
import useVisitsPageStyles from '../../../../pages/VisitsPage/useVisitsPageStyles';

export default function TripInfo({ trip: { tripName } = {} }) {
  const classes = useVisitsPageStyles();
  return (
    <Typography variant="h4" className={classes.group} paragraph={true}>
      {tripName}
    </Typography>
  );
}

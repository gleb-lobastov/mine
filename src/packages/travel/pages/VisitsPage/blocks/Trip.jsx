import React from 'react';
import Typography from '@material-ui/core/Typography';
import useVisitsPageStyles from '../useVisitsPageStyles';

export default function Trip({ trip: { tripName } = {} }) {
  const classes = useVisitsPageStyles();
  return (
    <Typography variant="h4" className={classes.group}>
      {tripName}
    </Typography>
  );
}

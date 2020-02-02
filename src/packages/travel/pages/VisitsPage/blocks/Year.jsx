import React from 'react';
import Typography from '@material-ui/core/Typography';
import useVisitsPageStyles from '../useVisitsPageStyles';

export default function Year({ year, isSubgroup }) {
  const classes = useVisitsPageStyles();
  return (
    <Typography
      variant={isSubgroup ? 'h5' : 'h4'}
      className={isSubgroup ? classes.subgroup : classes.group}
    >
      {year}
    </Typography>
  );
}

import React from 'react';
import Typography from '@material-ui/core/Typography';
import useVisitsPageStyles from '../../../pages/VisitsPage/useVisitsPageStyles';

export default function YearInfo({ year, isSubgroup }) {
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

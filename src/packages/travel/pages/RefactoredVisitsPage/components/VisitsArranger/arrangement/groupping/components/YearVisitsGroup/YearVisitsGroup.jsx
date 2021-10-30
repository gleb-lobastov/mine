import React from 'react';
import cls from 'classnames';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  container: {},
});

export default function YearVisitsGroup({
  children,
  visitsGroup: {
    field: { value: year },
  },
  classes,
}) {
  const ownClasses = useStyles();

  return (
    <YearInfo
      className={cls(classes.container, ownClasses.container)}
      classes={classes}
      year={year}
    >
      {children}
    </YearInfo>
  );
}

function YearInfo({ children, variant, className, classes, year }) {
  return (
    <div className={className}>
      <Typography display="inline" variant={variant} className={classes.header}>
        {year || 'Без указания даты'}
      </Typography>
      {children}
    </div>
  );
}

import React from 'react';
import cls from 'classnames';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import StatsPanel from '../../../../../StatsPanel';

const useStyles = makeStyles({
  container: {},
});

export default function YearVisitsGroup({
  children,
  visitGroup: {
    field: { value: groupingYearStr },
    stats,
  },
  classes,
  isObscure,
  provision,
}) {
  const ownClasses = useStyles();

  const year = parseInt(groupingYearStr, 10) ?? null;

  return (
    <>
      <YearInfo
        className={cls(classes.container, ownClasses.container)}
        classes={classes}
        year={year}
      >
        <StatsPanel provision={provision} stats={stats} isObscure={isObscure} />
      </YearInfo>
      {children}
    </>
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

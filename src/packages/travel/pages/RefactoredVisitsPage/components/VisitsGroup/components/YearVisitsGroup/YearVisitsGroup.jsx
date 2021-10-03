import React from 'react';
import cls from 'classnames';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import StatsPanel, { CONSIDER_RIDES } from '../../../StatsPanel';

const useStyles = makeStyles({
  container: {},
});

export default function YearVisitsGroup({
  children,
  visitsList,
  groupingField: { value: groupingYearStr, stats },
  headingVariant,
  className,
  isObscure,
  provision,
}) {
  const classes = useStyles();

  const year = parseInt(groupingYearStr, 10) ?? null;

  return (
    <>
      <YearInfo
        className={cls(classes.container, className)}
        year={year}
        variant={headingVariant}
      >
        <StatsPanel
          provision={provision}
          visitsList={visitsList}
          stats={stats}
          daysTravellingStats={{ considerRides: CONSIDER_RIDES.YEAR }}
          isObscure={isObscure}
        />
      </YearInfo>
      {children}
    </>
  );
}

function YearInfo({ children, variant, className, year }) {
  return (
    <div className={className}>
      <Typography display="inline" variant={variant}>
        {year || 'Без указания даты'}
      </Typography>
      {children}
    </div>
  );
}
import React from 'react';
import cls from 'classnames';
import { makeStyles } from '@material-ui/core/styles';
import YearInfo from 'travel/components/common/YearInfo';
import StatsPanel, { CONSIDER_RIDES } from '../../../StatsPanel';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    alignItems: 'self-start',
  },
});

export default function YearVisitsGroup({
  groupKey: year,
  visitsList,
  depth,
  children,
  className,
  provision,
  isObscure,
}) {
  const classes = useStyles();

  return (
    <>
      <YearInfo
        className={cls(classes.container, className)}
        year={year}
        isSubgroup={depth > 0}
      >
        <StatsPanel
          provision={provision}
          visitsList={visitsList}
          countriesStats={{ showByYear: year }}
          locationsStats={{ showByYear: year }}
          daysTravellingStats={{ considerRides: CONSIDER_RIDES.YEAR }}
          isObscure={isObscure}
        />
      </YearInfo>
      {children}
    </>
  );
}

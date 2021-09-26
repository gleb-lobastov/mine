import React from 'react';
import cls from 'classnames';
import { makeStyles } from '@material-ui/core/styles';
import YearInfo from 'travel/components/common/YearInfo';
import StatsPanel from 'travel/pages/RefactoredVisitsPage/components/StatsPanel';

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
        />
      </YearInfo>
      {children}
    </>
  );
}

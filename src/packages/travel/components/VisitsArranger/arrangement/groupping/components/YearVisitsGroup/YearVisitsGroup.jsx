import React from 'react';
import cls from 'classnames';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ConnectedLink from 'modules/components/muiExtended/ConnectedLink';

const useStyles = makeStyles({
  container: {},
});

export default function YearVisitsGroup({
  children,
  visitsGroup: {
    field: { value: year },
  },
  classes,
  urls,
  config: {
    YearVisitsGroup: { hyperlinks: { year: yearHyperlink = true } = {} } = {},
  } = {}
}) {
  const ownClasses = useStyles();

  return (
    <YearInfo
      className={cls(classes.container, ownClasses.container)}
      classes={classes}
      year={year}
      yearUrl={yearHyperlink ? urls?.resolveYearUrl({ year }) : null}
    >
      {children}
    </YearInfo>
  );
}

function YearInfo({ children, variant, className, classes, year, yearUrl }) {
  return (
    <div className={className}>
      <ConnectedLink
        to={(year && yearUrl) || undefined}
        optional={true}
        display="inline"
        variant={variant}
        className={classes.header}
      >
        {year || 'Без указания даты'}
      </ConnectedLink>
      {children}
    </div>
  );
}

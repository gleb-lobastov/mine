import React from 'react';
import cls from 'classnames';
import Typography from '@material-ui/core/Typography';
import useVisitsPageStyles from '../../../pages/VisitsPage/useVisitsPageStyles';

export default function YearInfo({
  children,
  className,
  previewTriggerProps,
  previewTriggerClassName,
  year,
  isSubgroup,
}) {
  const classes = useVisitsPageStyles();
  return (
    <Typography
      variant={isSubgroup ? 'h5' : 'h4'}
      className={cls(className, isSubgroup ? classes.subgroup : classes.group)}
      {...previewTriggerProps}
    >
      <span className={previewTriggerClassName}>
        {year || 'Без указания даты'}
      </span>
      {children}
    </Typography>
  );
}

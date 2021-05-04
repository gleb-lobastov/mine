import React from 'react';
import cls from 'classnames';
import Typography from '@material-ui/core/Typography';
import useVisitsPageStyles from '../../../pages/VisitsPage/useVisitsPageStyles';

export default function YearInfo({
  previewTriggerProps,
  previewTriggerClassName,
  year,
  isSubgroup,
}) {
  const classes = useVisitsPageStyles();
  return (
    <Typography
      variant={isSubgroup ? 'h5' : 'h4'}
      className={cls(
        previewTriggerClassName,
        isSubgroup ? classes.subgroup : classes.group,
      )}
      {...previewTriggerProps}
    >
      {year || 'Без указания даты'}
    </Typography>
  );
}

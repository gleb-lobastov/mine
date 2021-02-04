import React from 'react';
import cls from 'classnames';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Stack from '../../../components/Stack';
import { workPeriodToStr, dateTimePeriodToStr } from '../utils';

const useStyles = makeStyles({
  alignStackToStart: {
    justifyContent: 'flex-start',
  },
});

export default function ExperiencePeriod({
  job: { from, to, stack },
  skills,
  alignStackToStart,
}) {
  const classes = useStyles();
  return (
    <>
      <Typography variant="body2" color="textSecondary">
        {dateTimePeriodToStr(from, to)}, {workPeriodToStr(from, to)}
      </Typography>
      <Stack
        className={cls({ [classes.alignStackToStart]: alignStackToStart })}
        skills={skills}
        stack={stack}
      />
    </>
  );
}

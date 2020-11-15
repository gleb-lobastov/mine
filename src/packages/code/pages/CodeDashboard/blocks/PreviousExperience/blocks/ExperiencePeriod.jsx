import React from 'react';
import cls from 'classnames';
import formatDuration from 'date-fns/formatDuration';
import ru from 'date-fns/locale/ru';
import intervalToDuration from 'date-fns/intervalToDuration';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { dateTimeOpenPeriodToString } from 'modules/utilities/dateTime/dateTimePeriodToString';
import parseDate from 'modules/utilities/dateTime/parseDate';
import Stack from '../../../components/Stack';

const useStyles = makeStyles({
  alignToEnd: {
    justifyContent: 'flex-start',
  },
});

export default function ExperiencePeriod({
  job: { from, to, stack },
  skills,
  alignToEnd,
}) {
  const classes = useStyles();
  return (
    <>
      <Typography variant="body2" color="textSecondary">
        {dateTimePeriodToStr(from, to)}, {workPeriodToStr(from, to)}
      </Typography>
      <Stack
        className={cls({ [classes.alignToEnd]: alignToEnd })}
        skills={skills}
        stack={stack}
      />
    </>
  );
}

function dateTimePeriodToStr(from, to) {
  return dateTimeOpenPeriodToString({
    periodStart: from && parseDate(from),
    periodEnd: to && parseDate(to),
    isObscure: true,
    placeholder: 'по настоящее время',
  });
}

function workPeriodToStr(from, to) {
  return formatDuration(
    intervalToDuration({
      start: from ? parseDate(from) : new Date(),
      end: to ? parseDate(to) : new Date(),
    }),
    { format: ['years', 'months'], locale: ru },
  );
}

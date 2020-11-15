import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent';
import TimelineDotPic from './blocks/TimelineDotPic';
import ExperienceDetails from './blocks/ExperienceDetails';
import ExperiencePeriod from './blocks/ExperiencePeriod';

const useStyles = makeStyles({
  timelineContent: {
    paddingBottom: '32px',
  },
});

export default function PreviousExperience({ jobs, skills }) {
  const classes = useStyles();
  return (
    <Timeline align="alternate">
      {jobs.map((job, index) => (
        <TimelineItem>
          <TimelineOppositeContent>
            <ExperiencePeriod
              job={job}
              skills={skills}
              alignToEnd={index % 2}
            />
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDotPic src={job.logoSrc} name={job.companyName.ru} />
            {index < jobs.length - 1 && <TimelineConnector />}
          </TimelineSeparator>
          <TimelineContent className={classes.timelineContent}>
            <ExperienceDetails job={job} />
          </TimelineContent>
        </TimelineItem>
      ))}
    </Timeline>
  );
}

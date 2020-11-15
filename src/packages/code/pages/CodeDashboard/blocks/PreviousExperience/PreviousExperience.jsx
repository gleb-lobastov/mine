import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import CompanyLogo from '../../components/CompanyLogo';
import ExperienceDetails from './blocks/ExperienceDetails';
import ExperiencePeriod from './blocks/ExperiencePeriod';

const useStyles = makeStyles(theme => ({
  timelineContent: {
    paddingBottom: '32px',
  },
  mobileExperienceDetailsContainer: {
    marginBottom: theme.spacing(4),
  },
}));

export default function PreviousExperience({ jobs, skills }) {
  const classes = useStyles();
  const matches = useMediaQuery(theme => theme.breakpoints.up('md'));

  if (!matches) {
    return (
      <>
        {jobs.map(job => (
          <ExperienceDetails
            className={classes.mobileExperienceDetailsContainer}
            job={job}
            logo={<CompanyLogo src={job.logoSrc} name={job.companyName.ru} />}
          >
            <ExperiencePeriod job={job} skills={skills} alignStackToStart={true} />
          </ExperienceDetails>
        ))}
      </>
    );
  }
  return (
    <Timeline align="alternate">
      {jobs.map((job, index) => (
        <TimelineItem>
          <TimelineOppositeContent>
            <ExperiencePeriod
              job={job}
              skills={skills}
              alignStackToStart={index % 2}
            />
          </TimelineOppositeContent>
          <TimelineSeparator>
            <CompanyLogo
              component={TimelineDot}
              src={job.logoSrc}
              name={job.companyName.ru}
            />
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

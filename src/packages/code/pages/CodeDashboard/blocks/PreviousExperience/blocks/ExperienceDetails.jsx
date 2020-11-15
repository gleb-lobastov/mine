import React from 'react';
import ReactMarkdown from 'react-markdown';
import { makeStyles } from '@material-ui/core/styles';
import MUILink from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  experienceDetailsContainer: {
    padding: '6px 16px',
  },
});

export default function ExperienceDetails({
  job: {
    companyDescription,
    companyName: { ru: companyName },
    website,
    position,
    description,
  },
}) {
  const classes = useStyles();

  return (
    <Paper elevation={3} className={classes.experienceDetailsContainer}>
      <Typography variant="h6">{companyName}</Typography>
      <Typography variant="body2" color="textSecondary" paragraph={true}>
        {website ? `${companyDescription}, ` : companyDescription}
        {website && (
          <MUILink href={website} rel="nofollow noreferrer noopener">
            {resolveHostName(website)}
          </MUILink>
        )}
      </Typography>
      <Typography variant="h5">{position}</Typography>
      <Typography variant="body1">
        <ReactMarkdown source={description} />
      </Typography>
    </Paper>
  );
}

function resolveHostName(url) {
  if (!url) {
    return '';
  }
  try {
    return new URL(url).hostname;
  } catch (e) {
    return url;
  }
}

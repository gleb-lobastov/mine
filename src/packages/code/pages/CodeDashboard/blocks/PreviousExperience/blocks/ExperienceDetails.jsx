import React from 'react';
import ReactMarkdown from 'react-markdown';
import cls from 'classnames';
import { makeStyles } from '@material-ui/core/styles';
import MUILink from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  experienceDetailsContainer: {
    padding: '6px 16px',
  },
  companyBlock: {
    display: 'flex',
    justifyContent: 'space-between',
  },
});

export default function ExperienceDetails({
  children,
  logo,
  className,
  job: {
    companyDescription,
    companyName: { ru: companyName },
    website,
    position,
    description,
  },
}) {
  const classes = useStyles();

  const companyDescriptionNode = (
    <>
      <Typography variant="h6">{companyName}</Typography>
      <Typography variant="body2" color="textSecondary" paragraph={true}>
        {website ? `${companyDescription}, ` : companyDescription}
        {website && (
          <MUILink href={website} rel="nofollow noreferrer noopener">
            {resolveHostName(website)}
          </MUILink>
        )}
      </Typography>
    </>
  );

  const companyBlockNode = logo ? (
    <div className={classes.companyBlock}>
      <div>{companyDescriptionNode}</div>
      <div> {logo}</div>
    </div>
  ) : (
    companyDescriptionNode
  );

  return (
    <Paper
      elevation={3}
      className={cls(className, classes.experienceDetailsContainer)}
    >
      {companyBlockNode}
      <Typography variant="h5">{position}</Typography>
      {children}
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

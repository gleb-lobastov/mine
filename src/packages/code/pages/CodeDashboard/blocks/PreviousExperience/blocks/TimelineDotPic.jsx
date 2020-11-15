import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TimelineDot from '@material-ui/lab/TimelineDot';

const useStyles = makeStyles(theme => ({
  container: {
    alignItems: 'center',
    backgroundColor: theme.palette.primary.main,
    border: 0,
    borderRadius: '100%',
    display: 'flex',
    height: '64px',
    justifyContent: 'space-around',
    overflow: 'hidden',
    padding: 0,
    width: '64px',
  },
  image: {
    height: '100%',
    width: '100%',
  },
  shortName: {
    fontWeight: 500,
    fontSize: 24,
  },
}));

export default function TimelineDotPic({ src, name }) {
  const classes = useStyles();
  return (
    <TimelineDot className={classes.container}>
      {src ? (
        <img className={classes.image} src={src} alt={`${name} logo`} />
      ) : (
        <div className={classes.shortName}>{pickShortName(name)}</div>
      )}
    </TimelineDot>
  );
}

function pickShortName(name) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map(part => part.charAt(0).toUpperCase())
    .join('');
}

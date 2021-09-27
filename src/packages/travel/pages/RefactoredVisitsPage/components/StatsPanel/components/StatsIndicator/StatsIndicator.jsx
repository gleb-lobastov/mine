import React from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  statsIndicator: {
    display: 'inline-flex',
    alignItems: 'center',
    marginRLeft: '2px',
    marginRight: '4px',
  },
});

export default function StatsIndicator({ icon, children, hint }) {
  const classes = useStyles();

  const contentNode = (
    <Typography variant="subtitle1" className={classes.statsIndicator}>
      {React.cloneElement(icon, { fontSize: 'inherit' })}
      {children}
    </Typography>
  );

  if (!hint) {
    return contentNode;
  }
  return <Tooltip title={hint}>{contentNode}</Tooltip>;
}

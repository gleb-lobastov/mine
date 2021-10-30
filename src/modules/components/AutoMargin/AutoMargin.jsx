import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  autoMargin: { marginLeft: 'auto' },
});

export default function AutoMargin({ children, className }) {
  const classes = useStyles();
  const childrenArray = React.Children.toArray(children);
  if (childrenArray.length <= 1) {
    return <Typography className={className}>{children}</Typography>;
  }

  const lastChildren = childrenArray.slice(-1);
  const restChildren = childrenArray.slice(0, -1);
  return (
    <Grid
      className={className}
      container={true}
      justify="space-between"
      alignItems="center"
    >
      <Grid item={true}>{restChildren}</Grid>
      <Grid item={true} classes={{ item: classes.autoMargin }}>
        {lastChildren}
      </Grid>
    </Grid>
  );
}

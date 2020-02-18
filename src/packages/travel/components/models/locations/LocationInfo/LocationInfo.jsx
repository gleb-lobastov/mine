import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  autoMargin: { marginLeft: 'auto' },
});

export default function LocationInfo({
  children,
  shouldJustifyContent,
  location: { locationName } = {},
}) {
  const classes = useStyles();
  const childrenArray = React.Children.toArray(children);
  if (!shouldJustifyContent || childrenArray.length <= 1) {
    return (
      <Typography>
        {locationName} {children}
      </Typography>
    );
  }

  const lastChildren = childrenArray.slice(-1);
  const restChildren = childrenArray.slice(0, -1);
  return (
    <Grid container={true} justify="space-between" alignItems="center">
      <Grid item={true}>
        <Typography>
          {locationName} {restChildren}
        </Typography>
      </Grid>
      <Grid item={true} classes={{ item: classes.autoMargin }}>
        {lastChildren}
      </Grid>
    </Grid>
  );
}

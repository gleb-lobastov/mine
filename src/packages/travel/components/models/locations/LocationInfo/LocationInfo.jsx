import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ConnectedLink from 'modules/components/muiExtended/ConnectedLink/ConnectedLink.jsx';

const useStyles = makeStyles({
  autoMargin: { marginLeft: 'auto' },
});

export default function LocationInfo({
  children,
  shouldJustifyContent,
  href,
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
          {href ? (
            <ConnectedLink to={href}>{locationName}</ConnectedLink>
          ) : (
            locationName
          )}{' '}
          {restChildren}
        </Typography>
      </Grid>
      <Grid item={true} classes={{ item: classes.autoMargin }}>
        {lastChildren}
      </Grid>
    </Grid>
  );
}

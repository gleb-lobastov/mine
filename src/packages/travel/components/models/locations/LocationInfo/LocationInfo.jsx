import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ConnectedLink from 'modules/components/muiExtended/ConnectedLink';

const useStyles = makeStyles({
  autoMargin: { marginLeft: 'auto' },
});

export default function LocationInfo({
  children,
  shouldJustifyContent,
  previewTriggerProps,
  previewTriggerClassName,
  href,
  location: { locationName } = {},
}) {
  const classes = useStyles();
  const childrenArray = React.Children.toArray(children);
  if (!shouldJustifyContent || childrenArray.length <= 1) {
    return (
      <Typography {...previewTriggerProps}>
        <div className={previewTriggerClassName}>
          {locationName} {children}
        </div>
      </Typography>
    );
  }

  const lastChildren = childrenArray.slice(-1);
  const restChildren = childrenArray.slice(0, -1);
  return (
    <Grid container={true} justify="space-between" alignItems="center">
      <Grid item={true}>
        <Typography {...previewTriggerProps}>
          <div className={previewTriggerClassName}>
            {href ? (
              <ConnectedLink to={href}>{locationName}</ConnectedLink>
            ) : (
              locationName
            )}{' '}
            {restChildren}
          </div>
        </Typography>
      </Grid>
      <Grid item={true} classes={{ item: classes.autoMargin }}>
        {lastChildren}
      </Grid>
    </Grid>
  );
}

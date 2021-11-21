import React from 'react';
import isFunction from 'lodash/isFunction';
import { makeStyles } from '@material-ui/core/styles';
import MUIBreadcrumbs from '@material-ui/core/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
import MUILink from '@material-ui/core/Link';

const useStyles = makeStyles(theme => ({
  breadcrumbs: {
    backgroundColor: theme.palette.background.paper,
    padding: '12px 0 12px 40px',
  },
}));

export default function Breadcrumbs({
  breadcrumbs,
  routerParams,
  actualPath,
  onChangeUrl,
}) {
  const classes = useStyles();
  const handleBreadcrumbClick = (event, breadcrumbIndex) => {
    event.preventDefault();
    const { path: nextPath, params } = breadcrumbs[breadcrumbIndex];
    onChangeUrl(event, actualPath, nextPath, { params });
  };

  if (!breadcrumbs.length) {
    return null;
  }

  return (
    <MUIBreadcrumbs aria-label="breadcrumb" className={classes.breadcrumbs}>
      {breadcrumbs.map(({ caption, path }, breadcrumbIndex) => {
        const actualCaption = isFunction(caption)
          ? caption(routerParams)
          : caption;
        return path ? (
          <MUILink
            href="#"
            onClick={event => handleBreadcrumbClick(event, breadcrumbIndex)}
          >
            {actualCaption}
          </MUILink>
        ) : (
          <Typography color="textPrimary">{actualCaption}</Typography>
        );
      })}
    </MUIBreadcrumbs>
  );
}

Breadcrumbs.defaultProps = {
  breadcrumbs: [],
};

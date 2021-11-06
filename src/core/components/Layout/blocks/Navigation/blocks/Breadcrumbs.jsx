import React from 'react';
import PropTypes from 'prop-types';
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

export default function Breadcrumbs({ breadcrumbs, actualPath, onChangeUrl }) {
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
      {breadcrumbs.map(
        ({ caption, path }, breadcrumbIndex) =>
          path ? (
            <MUILink
              href={caption}
              onClick={event => handleBreadcrumbClick(event, breadcrumbIndex)}
            >
              {caption}
            </MUILink>
          ) : (
            <Typography color="textPrimary">{caption}</Typography>
          ),
      )}
    </MUIBreadcrumbs>
  );
}

Breadcrumbs.propTypes = {
  breadcrumbs: PropTypes.arrayOf(
    PropTypes.shape({
      caption: PropTypes.string,
      path: PropTypes.string,
    }),
  ),
  actualPath: PropTypes.string.isRequired,
  onChangeUrl: PropTypes.func.isRequired,
};

Breadcrumbs.defaultProps = {
  breadcrumbs: [],
};

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import MUILink from '@material-ui/core/Link';

export default function renderTitle({
  locationsUrl,
  locationsCount,
  countriesCount,
}) {
  return (
    <Typography variant="h6" paragraph={true}>
      <span>Всего </span>
      <MUILink to={locationsUrl} component={Link}>
        {`${locationsCount} городов `}
      </MUILink>
      <span>из </span>
      <span>{`${countriesCount} стран `}</span>
    </Typography>
  );
}

renderTitle.propTypes = {
  locationsUrl: PropTypes.string.isRequired,
  locationsCount: PropTypes.number.isRequired,
  countriesCount: PropTypes.number.isRequired,
};

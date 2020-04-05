import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import MUILink from '@material-ui/core/Link';
import { checkIsGroupedByTrip } from '../utils';
import * as locators from '../locators';

export default function renderTitle({
  createTripUrl,
  locationsUrl,
  locationsCount,
  countriesCount,
  groupBy,
}) {
  const linkToCreateTripNode = checkIsGroupedByTrip(groupBy) ? (
    <div>
      <MUILink
        to={createTripUrl}
        component={Link}
        data-locator={locators.ADD_TRIP_BUTTON}
      >
        Добавить поездку
      </MUILink>
    </div>
  ) : null;

  return (
    <Typography variant="h6" paragraph={true}>
      <span>Всего </span>
      <MUILink to={locationsUrl} component={Link}>
        {`${locationsCount} городов `}
      </MUILink>
      <span>из </span>
      <span>{`${countriesCount} стран `}</span>
      {linkToCreateTripNode}
    </Typography>
  );
}

renderTitle.propTypes = {
  locationsUrl: PropTypes.string.isRequired,
  locationsCount: PropTypes.number.isRequired,
  countriesCount: PropTypes.number.isRequired,
};

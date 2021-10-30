import React from 'react';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import MUILink from '@material-ui/core/Link';

export default function renderTitle({
  locationsUrl,
  stats: {
    locationsStats: { total: locationsCount },
    countriesStats: { total: countriesCount },
    // daysTravellingStats: { totalStay },
  },
}) {
  return (
    <Typography variant="h6" paragraph={true}>
      <span>Всего </span>
      <MUILink to={locationsUrl} component={Link}>
        {`${locationsCount} городов `}
      </MUILink>
      <span>из </span>
      <span>{`${countriesCount} стран`}</span>
      {/* <span>{`В путешествии ${totalStay} дней`}</span> */}
    </Typography>
  );
}

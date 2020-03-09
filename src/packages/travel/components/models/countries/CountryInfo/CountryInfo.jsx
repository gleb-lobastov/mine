import React from 'react';
import Typography from '@material-ui/core/Typography';
import useVisitsPageStyles from '../../../../pages/VisitsPage/useVisitsPageStyles';

export default function CountryInfo({
  country: { countryName } = {},
  isSubgroup,
  isDetail,
  className,
  children,
}) {
  const classes = useVisitsPageStyles();
  if (isDetail) {
    return <span className={className}>{countryName}</span>;
  }
  return (
    <Typography variant={isSubgroup ? 'h5' : 'h4'} className={className}>
      {countryName} {children}
    </Typography>
  );
}

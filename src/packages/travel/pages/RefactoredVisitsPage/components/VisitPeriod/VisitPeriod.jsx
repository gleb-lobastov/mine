import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CountryInfo from 'travel/components/models/countries/CountryInfo';
import cls from 'classnames';
import StatsPanel from 'travel/pages/RefactoredVisitsPage/components/StatsPanel';

const useStyles = makeStyles({});

export default function VisitPeriod({
  groupKey: countryId,
  children,
  depth,
  groupKeys,
  stats,
  groupingOrder,
  className,
  isObscure,
  visitsList,
  provision,
  provision: { countriesDict },
}) {
  const classes = useStyles();

  const isSubgroup = depth > 0;
  return (
    <>
      <CountryInfo
        key={`c${countryId}`}
        country={countriesDict[countryId]}
        isSubgroup={isSubgroup}
        className={cls(
          className,
          isSubgroup ? classes.subgroup : classes.group,
        )}
      >
        <StatsPanel
          provision={provision}
          stats={stats}
          isObscure={isObscure}
        />
      </CountryInfo>
      {children}
    </>
  );
}

function countLocations(visitsList) {
  return new Set(visitsList.map(({ locationId }) => locationId)).size;
}

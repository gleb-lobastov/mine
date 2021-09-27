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
  groupingOrder,
  className,isObscure,
  visitsList,
  provision,
  provision: { countriesDict },
}) {
  const classes = useStyles();

  const locationsCounter = countLocations(visitsList);
  const isSubgroup = depth > 0;
  const year = parseInt(groupKeys[groupingOrder.indexOf('YEARS')], 10) ?? false;
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
          visitsList={visitsList}
          locationsStats={{ showByYear: year }}
          daysTravellingStats={true}
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

import React from 'react';
import cls from 'classnames';
import { makeStyles } from '@material-ui/core/styles';
import CountryInfo from 'travel/components/models/countries/CountryInfo';
import { PLAIN_GROUPS } from '../../../../consts';
import StatsPanel, { CONSIDER_RIDES } from '../../../StatsPanel';

const useStyles = makeStyles({});

export default function CountryVisitsGroup({
  groupKey: countryId,
  children,
  depth,
  groupKeys,
  groupingOrder,
  className,
  isObscure,
  visitsList,
  provision,
  provision: { countriesDict },
}) {
  const classes = useStyles();

  const isSubgroup = depth > 0;
  const year =
    parseInt(groupKeys[groupingOrder.indexOf(PLAIN_GROUPS.YEARS)], 10) ?? false;
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
          daysTravellingStats={{ considerRides: CONSIDER_RIDES.COUNTRY }}
          isObscure={isObscure}
        />
      </CountryInfo>
      {children}
    </>
  );
}

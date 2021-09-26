import React from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import FlagIcon from '@material-ui/icons/Flag';
import createCalcByYearUtils from '../../utils/createCalcByYearUtils';

const { calcTotal, calcByYear } = createCalcByYearUtils('countryId');

export default function CountriesStats({
  className,
  countriesStats,
  visitsDict,
  visitsList,
}) {
  const { showByYear } = countriesStats === true ? {} : countriesStats;

  const year = parseInt(showByYear, 10);
  const { newAtYear, totalAtYear, total } = showByYear
    ? calcByYear(visitsDict, visitsList, year)
    : calcTotal(visitsList);

  return (
    <Tooltip
      title={renderHint({
        showByYear,
        year,
        newAtYear,
        totalAtYear,
        total,
      })}
    >
      <span className={className}>
        <FlagIcon />
        {renderDetails({
          showByYear,
          newAtYear,
          totalAtYear,
          total,
        })}
      </span>
    </Tooltip>
  );
}

export function renderDetails({ showByYear, newAtYear, totalAtYear, total }) {
  if (!showByYear) {
    return String(total);
  }
  if (!newAtYear) {
    return String(totalAtYear);
  }
  if (totalAtYear === newAtYear) {
    return `+${newAtYear}`;
  }
  return `${totalAtYear} (+${newAtYear})`;
}

function renderHint({ showByYear, year, newAtYear, totalAtYear, total }) {
  if (!showByYear) {
    return <div>{`Посещено ${total} стран`}</div>;
  }
  return (
    <div>
      <div>{`За ${year} год посещено ${totalAtYear} стран`}</div>
      <div>
        {newAtYear
          ? `Из них впервые ${newAtYear} стран`
          : 'Новых стран в этом году не было'}
      </div>
    </div>
  );
}

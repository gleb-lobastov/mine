import React from 'react';
import FlagIcon from '@material-ui/icons/Flag';
import createCalcByYearUtils from '../../utils/createCalcByYearUtils';
import StatsIndicator from '../StatsIndicator';

const { calcTotal, calcByYear } = createCalcByYearUtils('countryId');

export default function CountriesStats({
  countriesStats,
  visitsDict,
  visitsList,
}) {
  const { showByYear } = countriesStats === true ? {} : countriesStats;

  const year = parseInt(showByYear, 10);
  const { newAtYear, totalAtYear, total } = showByYear
    ? calcByYear(visitsDict, visitsList, year)
    : calcTotal(visitsList);

  const hintNode = renderHint({
    showByYear,
    year,
    newAtYear,
    totalAtYear,
    total,
  });

  const detailsNode = renderDetails({
    showByYear,
    newAtYear,
    totalAtYear,
    total,
  });

  return (
    <StatsIndicator hint={hintNode} icon={<FlagIcon />}>
      {detailsNode}
    </StatsIndicator>
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

import React from 'react';
import PlaceIcon from '@material-ui/icons/Place';
import createCalcByYearUtils from '../../utils/createCalcByYearUtils';
import { renderDetails } from '../CountriesStats';
import StatsIndicator from '../StatsIndicator';

const { calcTotal, calcByYear } = createCalcByYearUtils('locationId');

export default function LocationStats({
  locationsStats,
  visitsDict,
  visitsList,
}) {
  const { showByYear } = locationsStats === true ? {} : locationsStats;

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
    <StatsIndicator hint={hintNode} icon={<PlaceIcon />}>
      {detailsNode}
    </StatsIndicator>
  );
}

function renderHint({ showByYear, year, newAtYear, totalAtYear, total }) {
  if (!showByYear) {
    return <div>{`Посещено ${total} мест`}</div>;
  }
  return (
    <div>
      <div>{`За ${year} год посещено ${totalAtYear} мест`}</div>
      <div>
        {newAtYear
          ? `Из них впервые ${newAtYear} мест`
          : 'Новых мест в этом году не было'}
      </div>
    </div>
  );
}

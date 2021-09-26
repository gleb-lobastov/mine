import React from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import PlaceIcon from '@material-ui/icons/Place';
import createCalcByYearUtils from '../../utils/createCalcByYearUtils';
import { renderDetails } from '../CountriesStats';

const { calcTotal, calcByYear } = createCalcByYearUtils('locationId');

export default function LocationStats({
  className,
  locationsStats,
  visitsDict,
  visitsList,
}) {
  const { showByYear } = locationsStats === true ? {} : locationsStats;

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
        <PlaceIcon />
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

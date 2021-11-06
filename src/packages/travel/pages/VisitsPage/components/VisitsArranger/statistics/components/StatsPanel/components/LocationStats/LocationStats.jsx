import React from 'react';
import PlaceIcon from '@material-ui/icons/Place';
import { renderDetails } from '../CountriesStats';
import StatsIndicator from '../StatsIndicator';

export default function LocationStats({
  locationsStats: { year, newAtYear, totalAtYear, total },
}) {
  const showByYear = Boolean(year);
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

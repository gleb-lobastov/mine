import React from 'react';
import FlagIcon from '@material-ui/icons/Flag';
import StatsIndicator from '../StatsIndicator';

export default function CountriesStats({
  countriesStats: { year, newAtYear, totalAtYear, total },
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

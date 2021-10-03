import React from 'react';
import TimelapseIcon from '@material-ui/icons/Timelapse';
import { visitDateTimePeriodToString } from 'modules/utilities/dateTime/dateTimePeriodToString';
import StatsIndicator from '../StatsIndicator';

export const CONSIDER_RIDES = {
  COUNTRY: 'COUNTRY',
  YEAR: 'YEAR',
};

export default function DaysTravellingStats({
  daysTravellingStats: { detailedStats, totalStay },
  provision: { visitsDict },
}) {
  if (!totalStay) {
    return null;
  }

  return (
    <StatsIndicator
      hint={renderHint(detailedStats, totalStay, visitsDict)}
      icon={<TimelapseIcon />}
    >
      {totalStay}
    </StatsIndicator>
  );
}

function renderHint(detailedStats, totalStay, visitsDict) {
  const totalStr = `Всего ${totalStay} дней в этом месте`;

  if (detailedStats.length === 1) {
    const { visitsIds, departureDateTime, arrivalDateTime } = detailedStats[0];
    const periodStr = visitDateTimePeriodToString({
      departureDateTime,
      arrivalDateTime,
    });
    const locationsStr = renderLocations(visitsIds, visitsDict);
    return <div>{`${totalStr} ${periodStr}. ${locationsStr}`}</div>;
  }

  return (
    <div>
      <div>{totalStr}</div>
      {detailedStats.map(
        ({ stay, visitsIds, departureDateTime, arrivalDateTime }, index) => {
          const periodStr = visitDateTimePeriodToString({
            departureDateTime,
            arrivalDateTime,
          });
          const locationsStr = renderLocations(visitsIds, visitsDict);
          // No good alternative 4 array index key
          /* eslint-disable react/no-array-index-key */
          return (
            <div
              key={`v${index}`}
            >{`${stay} дней, ${periodStr}. ${locationsStr}`}</div>
          );
          /* eslint-enable react/no-array-index-key */
        },
      )}
    </div>
  );
}

function renderLocations(visitsIds, visitsDict) {
  return (
    visitsIds
      ?.map(visitId => visitsDict[visitId]?.locationName ?? '')
      ?.join(', ') ?? ''
  );
}

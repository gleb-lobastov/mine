import React from 'react';
import differenceInCalendarDays from 'date-fns/differenceInCalendarDays';
import TimelapseIcon from '@material-ui/icons/Timelapse';
import { visitDateTimePeriodToString } from 'modules/utilities/dateTime/dateTimePeriodToString';
import createPeriods from 'modules/utilities/dateTime/periods';
import StatsIndicator from '../StatsIndicator';

export const CONSIDER_RIDES = {
  COUNTRY: 'COUNTRY',
  YEAR: 'YEAR',
};

export default function DaysTravellingStats({
  daysTravellingStats,
  visitsList,
  visitsDict,
  ridesDict,
}) {
  // Consider rides time, when count travelling days in groups, like country
  // or year. So when you move across country, you still in trip,
  // even if you sleep in train.
  const { considerRides } =
    daysTravellingStats === true ? {} : daysTravellingStats;

  const { detailedStats, totalStay } = calcDaysTraveling(
    visitsList,
    visitsDict,
    ridesDict,
    considerRides,
  );

  if (!totalStay) {
    return null;
  }

  return (
    <StatsIndicator
      hint={renderHint(detailedStats, totalStay)}
      icon={<TimelapseIcon />}
    >
      {totalStay}
    </StatsIndicator>
  );
}

function renderHint(detailedStats, totalStay) {
  const totalStr = `Всего ${totalStay} дней в этом месте`;

  if (detailedStats.length === 1) {
    const { departureDateTime, arrivalDateTime } = detailedStats[0];
    const periodStr = visitDateTimePeriodToString({
      departureDateTime,
      arrivalDateTime,
    });
    return <div>{`${totalStr} ${periodStr}`}</div>;
  }

  return (
    <div>
      <div>{totalStr}</div>
      {detailedStats.map(
        ({ stay, departureDateTime, arrivalDateTime }, index) => {
          const periodStr = visitDateTimePeriodToString({
            departureDateTime,
            arrivalDateTime,
          });
          // No good alternative 4 array index key
          // eslint-disable-next-line react/no-array-index-key
          return <div key={`v${index}`}>{`${stay} дней, ${periodStr}`}</div>;
        },
      )}
    </div>
  );
}

function calcDaysTraveling(visitsList, visitsDict, ridesDict, considerRides) {
  const visitToPeriodMapper = considerRides
    ? createMapperWithRides(visitsDict, ridesDict, considerRides)
    : simpleMapper;
  const visitsPeriods = visitsList.map(visitToPeriodMapper);
  const detailedStats = createPeriods([...visitsPeriods])
    .toArray()
    .reduce(
      (acc, { startDate: arrivalDateTime, endDate: departureDateTime }) => {
        const stay =
          differenceInCalendarDays(departureDateTime, arrivalDateTime) + 1;
        if (stay > 0) {
          acc.push({ stay, departureDateTime, arrivalDateTime });
        }
        return acc;
      },
      [],
    );
  return {
    detailedStats,
    totalStay: detailedStats.reduce((total, { stay }) => total + stay, 0),
  };
}

function simpleMapper({ arrivalDateTime, departureDateTime }) {
  return {
    startDate: arrivalDateTime,
    endDate: departureDateTime,
  };
}

function createMapperWithRides(visitsDict, ridesDict, considerRides) {
  return function mapperWithRides({
    countryId,
    arrivalRideId,
    arrivalDateTime,
    departureRideId,
    departureDateTime,
  }) {
    let startDate;
    const arrivalRide = ridesDict[arrivalRideId];
    if (!arrivalRide) {
      startDate = arrivalDateTime;
    } else {
      const {
        departureVisitId: prevVisitId,
        departureDateTime: rideStartDate,
      } = arrivalRide;
      if (
        considerRides !== 'country' ||
        (countryId && countryId === visitsDict[prevVisitId]?.countryId)
      ) {
        startDate = rideStartDate;
      }
    }

    let endDate;
    const departureRide = ridesDict[departureRideId];
    if (!departureRide) {
      endDate = departureDateTime;
    } else {
      const {
        arrivalVisitId: nextVisitId,
        arrivalDateTime: rideEndDate,
      } = departureRide;
      if (
        considerRides !== 'country' ||
        (countryId && countryId === visitsDict[nextVisitId]?.countryId)
      ) {
        endDate = rideEndDate;
      }
    }
    return { startDate, endDate };
  };
}

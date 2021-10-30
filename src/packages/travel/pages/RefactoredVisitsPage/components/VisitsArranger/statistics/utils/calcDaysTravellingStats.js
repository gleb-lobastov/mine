import differenceInCalendarDays from 'date-fns/differenceInCalendarDays';
import createPeriods from 'modules/utilities/dateTime/periods';

export default function calcDaysTravellingStats(
  visitsList,
  { visitsDict, ridesDict },
  { considerRides },
) {
  const visitToPeriodMapper = considerRides
    ? createMapperWithRides(visitsDict, ridesDict, considerRides)
    : simpleMapper;
  const visitsPeriods = visitsList.map(visitToPeriodMapper);
  const detailedStats = createPeriods([...visitsPeriods])
    .toArray()
    .reduce(
      (
        acc,
        {
          startDate: arrivalDateTime,
          endDate: departureDateTime,
          stack: visitsIds,
        },
      ) => {
        const stay =
          differenceInCalendarDays(departureDateTime, arrivalDateTime) + 1;
        if (stay > 0) {
          acc.push({ stay, visitsIds, departureDateTime, arrivalDateTime });
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
    visitId,
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
    return { startDate, endDate, stack: new Set([visitId]) };
  };
}

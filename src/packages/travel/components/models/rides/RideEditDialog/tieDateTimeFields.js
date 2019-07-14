import checkIsSameDay from 'date-fns/isSameDay';
import checkIsDatesEqual from 'date-fns/isEqual';
import addDays from 'date-fns/addDays';
import checkIsAfter from 'date-fns/isAfter';

const checkIsPeriodInverted = (beforeDateTime, afterDateTime) =>
  checkIsAfter(beforeDateTime, afterDateTime);

const mixDateTime = ({ dateFrom, timeFrom }) =>
  new Date(
    dateFrom.getFullYear(),
    dateFrom.getMonth(),
    dateFrom.getDate(),
    timeFrom.getHours(),
    timeFrom.getMinutes(),
    timeFrom.getSeconds(),
  );

export default ({ values: { rideDeparture, rideArrival }, handleChange }) => {
  const setRideDeparture = nextRideDeparture =>
    handleChange('departureDateTime')(nextRideDeparture);
  const setRideArrival = nextRideArrival =>
    handleChange('arrivalDateTime')(nextRideArrival);

  const isSameDay = checkIsSameDay(rideDeparture, rideArrival);

  const setDatesAndTimes = (nextRideDeparture, nextRideArrival) => {
    const isInverted = checkIsPeriodInverted(
      nextRideDeparture,
      nextRideArrival,
    );
    const actualNextRideDeparture = isInverted
      ? nextRideArrival
      : nextRideDeparture;

    const actualNextRideArrival = isInverted
      ? nextRideDeparture
      : nextRideArrival;

    if (!checkIsDatesEqual(rideDeparture, actualNextRideDeparture)) {
      setRideDeparture(actualNextRideDeparture);
    }
    if (!checkIsDatesEqual(rideArrival, actualNextRideArrival)) {
      setRideArrival(actualNextRideArrival);
    }
  };

  const handleIsSameDayFlagChange = nextIsSameDay => {
    if (Boolean(isSameDay) !== Boolean(nextIsSameDay)) {
      setDatesAndTimes(
        rideDeparture,
        mixDateTime({
          dateFrom: nextIsSameDay ? rideDeparture : addDays(rideDeparture, 1),
          timeFrom: rideArrival,
        }),
      );
    }
  };

  const handleRideDepartureChange = nextRideDeparture => {
    const nextRideArrival = isSameDay
      ? mixDateTime({
          timeFrom: rideArrival,
          dateFrom: nextRideDeparture,
        })
      : rideArrival;
    setDatesAndTimes(nextRideDeparture, nextRideArrival);
  };

  const handleRideArrivalChange = nextRideArrival => {
    const nextRideDeparture = isSameDay
      ? mixDateTime({
          timeFrom: rideDeparture,
          dateFrom: nextRideArrival,
        })
      : rideDeparture;
    setDatesAndTimes(nextRideDeparture, nextRideArrival);
  };

  return {
    isSameDateField: {
      value: isSameDay,
      onChange: handleIsSameDayFlagChange,
    },
    rideDepartureField: {
      value: rideDeparture,
      onChange: handleRideDepartureChange,
    },
    rideArrivalField: {
      value: rideArrival,
      onChange: handleRideArrivalChange,
    },
  };
};

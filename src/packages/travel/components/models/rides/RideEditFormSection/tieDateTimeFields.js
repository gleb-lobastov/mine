import checkIsSameDay from 'date-fns/isSameDay';
import checkIsDatesEqual from 'date-fns/isEqual';
import addDays from 'date-fns/addDays';
import isValidDate from 'modules/utilities/dateTime/isValidDate';

const mixDateTime = ({ dateFrom, timeFrom }) => {
  const isValidDateFrom = isValidDate(timeFrom);
  const isValidTimeFrom = isValidDate(dateFrom);
  if (isValidDateFrom && isValidTimeFrom) {
    return new Date(
      dateFrom.getFullYear(),
      dateFrom.getMonth(),
      dateFrom.getDate(),
      timeFrom.getHours(),
      timeFrom.getMinutes(),
      timeFrom.getSeconds(),
    );
  }
  return new Date(NaN);
};

function checkCanUpdate(nextDate, prevDate) {
  return isValidDate(nextDate) && !checkIsDatesEqual(prevDate, nextDate);
}

export default ({
  arrivalDateTimeField: {
    value: arrivalDateTimeValue,
    onChange: onArrivalDateTimeChange,
  },
  departureDateTimeField: {
    value: departureDateTimeValue,
    onChange: onDepartureDateTimeChange,
  },
}) => {
  const isSameDay = checkIsSameDay(
    departureDateTimeValue,
    arrivalDateTimeValue,
  );

  const updateFields = (
    nextDepartureDateTimeValue,
    nextArrivalDateTimeValue,
  ) => {
    if (checkCanUpdate(nextDepartureDateTimeValue, departureDateTimeValue)) {
      onDepartureDateTimeChange(nextDepartureDateTimeValue);
    }
    if (checkCanUpdate(nextArrivalDateTimeValue, arrivalDateTimeValue)) {
      onArrivalDateTimeChange(nextArrivalDateTimeValue);
    }
  };

  const handleIsSameDayFlagChange = nextIsSameDay => {
    if (Boolean(isSameDay) !== Boolean(nextIsSameDay)) {
      updateFields(
        departureDateTimeValue,
        mixDateTime({
          dateFrom: nextIsSameDay
            ? departureDateTimeValue
            : addDays(departureDateTimeValue, 1),
          timeFrom: arrivalDateTimeValue,
        }),
      );
    }
  };

  const handleRideDepartureChange = nextDepartureDateTimeValue => {
    const nextArrivalDateTimeValue = isSameDay
      ? mixDateTime({
          timeFrom: arrivalDateTimeValue,
          dateFrom: nextDepartureDateTimeValue,
        })
      : arrivalDateTimeValue;
    updateFields(nextDepartureDateTimeValue, nextArrivalDateTimeValue);
  };

  const handleRideDepartureDateChange = nextDepartureDateTimeValue => {
    handleRideDepartureChange(
      mixDateTime({
        dateFrom: nextDepartureDateTimeValue,
        timeFrom: departureDateTimeValue,
      }),
    );
  };

  const handleRideDepartureTimeChange = nextDepartureDateTimeValue => {
    handleRideDepartureChange(
      mixDateTime({
        dateFrom: departureDateTimeValue,
        timeFrom: nextDepartureDateTimeValue,
      }),
    );
  };

  const handleRideArrivalChange = nextArrivalDateTimeValue => {
    const nextDepartureDateTimeValue = isSameDay
      ? mixDateTime({
          timeFrom: departureDateTimeValue,
          dateFrom: nextArrivalDateTimeValue,
        })
      : departureDateTimeValue;
    updateFields(nextDepartureDateTimeValue, nextArrivalDateTimeValue);
  };

  const handleRideArrivalDateChange = nextArrivalDateTimeValue => {
    handleRideArrivalChange(
      mixDateTime({
        dateFrom: nextArrivalDateTimeValue,
        timeFrom: arrivalDateTimeValue,
      }),
    );
  };

  const handleRideArrivalTimeChange = nextArrivalDateTimeValue => {
    handleRideArrivalChange(
      mixDateTime({
        dateFrom: arrivalDateTimeValue,
        timeFrom: nextArrivalDateTimeValue,
      }),
    );
  };

  return {
    isSameDateField: {
      value: isSameDay,
      onChange: handleIsSameDayFlagChange,
    },
    rideDepartureDateField: {
      value: departureDateTimeValue,
      onChange: handleRideDepartureDateChange,
    },
    rideArrivalDateField: {
      value: arrivalDateTimeValue,
      onChange: handleRideArrivalDateChange,
    },
    rideDepartureTimeField: {
      value: departureDateTimeValue,
      onChange: handleRideDepartureTimeChange,
    },
    rideArrivalTimeField: {
      value: arrivalDateTimeValue,
      onChange: handleRideArrivalTimeChange,
    },
  };
};

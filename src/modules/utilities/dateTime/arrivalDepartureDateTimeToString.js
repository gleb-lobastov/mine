export default (departureDateTime, arrivalDateTime) => {
  const arrivalDateTimeString =
    Boolean(arrivalDateTime) && arrivalDateTime.toLocaleDateString();
  const departureDateTimeString =
    Boolean(departureDateTime) && departureDateTime.toLocaleDateString();
  if (arrivalDateTimeString === departureDateTimeString) {
    return arrivalDateTimeString;
  }
  return `${departureDateTimeString}—${arrivalDateTimeString}`;
};

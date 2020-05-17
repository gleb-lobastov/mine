import min from 'lodash/min';
import max from 'lodash/max';

export default function resolveLocationFirstAndLastVisitDateTime(
  visitsIds,
  visitsDict,
) {
  return visitsIds.reduce(
    (accumulator, visitId) => {
      const visit = visitsDict[visitId];
      if (visit) {
        const { arrivalDateTime, departureDateTime } = visit;
        accumulator.firstVisitDateTime = min([
          accumulator.firstVisitDateTime,
          arrivalDateTime,
        ]);
        accumulator.lastVisitDateTime = max([
          accumulator.lastVisitDateTime,
          departureDateTime,
        ]);
      }
      return accumulator;
    },
    { firstVisitDateTime: null, lastVisitDateTime: null },
  );
}

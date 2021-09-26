import memoizeOne from 'memoize-one';
import memoize from 'lodash/memoize';

export default function createCalcByYearUtils(lookupKey) {
  const memoizedCalcOldies = memoizeOne(visitsDict =>
    memoize(year => calcOldies(year, visitsDict)),
  );

  return {
    calcTotal,
    calcByYear,
  };

  function calcTotal(visitsList) {
    return {
      total: new Set(visitsList.map(({ [lookupKey]: entityId }) => entityId)),
    };
  }

  function calcByYear(visitsDict, visitsList, year) {
    const oldies = memoizedCalcOldies(visitsDict)(year);

    const newbies = visitsList.reduce(
      (acc, { arrivalYear, [lookupKey]: entityId }) => {
        if (arrivalYear === year) {
          acc.add(entityId);
        }
        return acc;
      },
      new Set(),
    );

    return {
      totalAtYear: newbies.size,
      newAtYear: newbies.difference(oldies).size,
    };
  }

  function calcOldies(year, visitsDict) {
    return Object.values(visitsDict).reduce(
      (acc, { [lookupKey]: entityId, arrivalYear }) => {
        if (arrivalYear < year) {
          acc.add(entityId);
        }
        return acc;
      },
      new Set(),
    );
  }
}

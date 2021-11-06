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
      total: new Set(visitsList.map(({ [lookupKey]: entityId }) => entityId))
        .size,
    };
  }

  function calcByYear(visitsDict, visitsList, year) {
    const oldies = memoizedCalcOldies(visitsDict)(year);

    const freshies = visitsList.reduce(
      (acc, { arrivalYear, [lookupKey]: entityId }) => {
        if (arrivalYear === year) {
          acc.add(entityId);
        }
        return acc;
      },
      new Set(),
    );

    const newbies = freshies.difference(oldies);
    return {
      totalAtYear: freshies.size,
      newAtYear: newbies.size,
      newbies,
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

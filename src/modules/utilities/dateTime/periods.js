import isValid from 'date-fns/isValid';
import addDays from 'date-fns/addDays';
import subDays from 'date-fns/subDays';
import differenceInCalendarDays from 'date-fns/differenceInCalendarDays';
import isSameDay from 'date-fns/isSameDay';
import isAfter from 'date-fns/isAfter';
import isWithinInterval from 'date-fns/isWithinInterval';
import chunk from 'lodash/chunk';
import flow from 'lodash/fp/flow';
import fpFlatMap from 'lodash/fp/flatMap';
import fpSortBy from 'lodash/fp/sortBy';
import negate from 'lodash/negate';
import times from 'lodash/times';
import dateTimeReviver from './dateTimeReviver';

function invariant(condition, errorMessage) {
  if (!condition) {
    throw new Error(errorMessage);
  }
}
function warning(condition, errorMessage) {
  if (!condition) {
    console.error(errorMessage);
  }
}

function isSameDayOrAfter(dateA, dateB) {
  return isSameDay(dateA, dateB) || isAfter(dateA, dateB);
}

const START = 'start';
const END = 'end';

/**
 * Check if second date goes immediately after first and that this dates is closes and reopens a
 * period. So subsequence of this pair has no impact to periods continuity, and thus the pair could
 * be ignored (see collapseDatePoints)
 */
const checkIsContiguous = (
  { type: typeA, date: dateA },
  { type: typeB, date: dateB },
) =>
  typeA === END &&
  typeB === START &&
  isSameDayOrAfter(addDays(dateA, 1), dateB);

const periodsToDatePoints = fpFlatMap(({ startDate, endDate, stack }) => [
  { type: START, date: startDate, stack },
  { type: END, date: endDate, stack },
]);

// datePoints that ending period would be placed after ones that starting it (if they has same
// date of course). So each of this pair will be determine a single-day period. This case is
// matters for exclusion, see test "should exclude one day from middle of sequence of three"
const sortDatePoints = fpSortBy(['date', ({ type }) => type === END]);

const collapseDatePoints = datesPoints => {
  const { memo: result, depth: controlDepth } = datesPoints.reduce(
    ({ memo, stack, depth }, datePoint) => {
      const { type, stack: pointStack } = datePoint;
      let nextStack = pointStack ? stack.union(pointStack) : stack;

      const nextDepth = depth + Number(type === START) - Number(type === END);
      const prevDatePoint = memo.length ? memo[memo.length - 1] : null;
      if (prevDatePoint && checkIsContiguous(prevDatePoint, datePoint)) {
        // remove END datePoint when period should be merged
        memo.pop();
      } else if (depth === 0 && type === START) {
        // OUTPUT stack is tracked only by END datePoints
        memo.push({ ...datePoint, stack: null });
        // reset stack, when start new period, but keep in mind,
        // that start period could keep some own INPUT stack
        nextStack = pointStack ?? new Set();
      } else if (nextDepth === 0 && type === END) {
        memo.push({ ...datePoint, stack: nextStack });
      }
      return {
        memo,
        stack: nextStack,
        depth: nextDepth,
      };
    },
    {
      memo: [],
      stack: new Set(),
      depth: 0,
    },
  );
  invariant(
    controlDepth === 0,
    `Corrupted datesPoints ${JSON.stringify(datesPoints)}`,
  );
  return result;
};

const datePointsToPeriods = datesPoints =>
  chunk(datesPoints, 2).map(
    ([
      { date: startDate, type: startType },
      { date: endDate, type: endType, stack },
    ]) => {
      invariant(
        startType === START && endType === END,
        'Wrong datesPoints order',
      );
      const result = { startDate, endDate };
      if (stack && stack.size) {
        result.stack = stack;
      }
      return result;
    },
  );

const normalize = flow(
  periodsToDatePoints,
  sortDatePoints,
  collapseDatePoints,
  datePointsToPeriods,
);

/**
 * Addition and substraction of a day is needed to compensate non-inclusive treatment of period
 * borders. For example if required to exclude whole 2018 year, then 1st january and 31 december
 * will survive the passage through the algorithm, so solution is to expand each period bound
 * on 1 day
 */
const invertPeriod = ({ startDate, endDate }) => ({
  startDate: addDays(endDate, 1),
  endDate: subDays(startDate, 1),
});

class Periods {
  static checkIsCorrupted(period) {
    const { startDate, endDate } = period || {};
    const isCorrupted =
      !isValid(startDate) || !isValid(endDate) || startDate > endDate;
    warning(!isCorrupted, `corrupted period ${JSON.stringify(period)}`);
    return isCorrupted;
  }

  static deserialize(serializedString) {
    return new Periods(JSON.parse(serializedString, dateTimeReviver));
  }

  constructor(initialPeriods) {
    const trustedPeriods = initialPeriods.filter(
      negate(Periods.checkIsCorrupted),
    );
    warning(
      trustedPeriods.length === initialPeriods.length,
      'Some inital periods is corrupted, "%s"',
      JSON.stringify(initialPeriods),
    );
    // take into account that normalization for more than one period at time is not
    // applicable to exclusion approach. It's not guaranteed to work properly in such case
    this.periods = normalize(trustedPeriods);
  }

  combineWith(period) {
    try {
      this.periods = normalize([...this.periods, period]);
    } catch (e) {
      warning(
        false,
        `error "${
          e.message
        }", during periods processing. Fallback to ignore operation.\n${
          e.stack
        }`,
      );
    }
  }

  include(period) {
    if (!Periods.checkIsCorrupted(period)) {
      this.combineWith(period);
    }
    return this;
  }

  exclude(period) {
    if (!Periods.checkIsCorrupted(period)) {
      this.combineWith(invertPeriod(period));
    }
    return this;
  }

  applyWeekdaysMask(weekdaysMask) {
    if (!weekdaysMask) {
      return this;
    }

    const boolMask = [
      'sunday', // because getDate indicies starts from 0 for sunday
      'monday',
      'tuesday',
      'wednesday',
      'thursday',
      'friday',
      'saturday',
    ].map(weekdayName => Boolean(weekdaysMask[weekdayName]));

    if (boolMask.findIndex(value => !value) < 0) {
      return this;
    }

    const nextPeriods = [];
    this.periods.forEach(({ startDate, endDate }) => {
      const addPeriod = ({ startDateOffset, endDateOffset }) => {
        nextPeriods.push({
          startDate: addDays(startDate, startDateOffset),
          endDate: addDays(startDate, endDateOffset),
        });
      };
      const firstWeekdayOffset = startDate.getDay();
      const duration = differenceInCalendarDays(endDate, startDate) + 1; // ?
      const lastPeriodStartDateOffset = times(duration)
        .map(day => boolMask[(day + firstWeekdayOffset) % 7])
        .reduce((startDateOffset, isIncluded, currentDateOffset) => {
          const isInPeriod = startDateOffset !== null;
          if (isIncluded) {
            return isInPeriod ? startDateOffset : currentDateOffset;
          }
          if (isInPeriod) {
            addPeriod({
              startDateOffset,
              endDateOffset: currentDateOffset - 1,
            });
          }
          return null;
        }, null);
      if (lastPeriodStartDateOffset !== null) {
        addPeriod({
          startDateOffset: lastPeriodStartDateOffset,
          endDateOffset: duration - 1,
        });
      }
    });
    this.periods = nextPeriods;
    return this;
  }

  checkIsDateIncluded(dateToCheck) {
    return this.periods.some(({ startDate, endDate }) =>
      isWithinInterval(dateToCheck, {
        start: startDate,
        end: endDate,
      }),
    );
  }

  toggleDate(dateToToggle) {
    const periodOfDateToToggle = {
      startDate: dateToToggle,
      endDate: dateToToggle,
    };
    if (this.checkIsDateIncluded(dateToToggle)) {
      this.exclude(periodOfDateToToggle);
    } else {
      this.include(periodOfDateToToggle);
    }
    return this;
  }

  checkIsEmpty() {
    return !this.periods.length;
  }

  serialize() {
    return JSON.stringify(this.periods);
  }

  toArray() {
    return this.periods;
  }
}

export default initialPeriods => new Periods(initialPeriods);

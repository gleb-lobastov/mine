import groupByFn from 'lodash/groupBy';
import isFunction from 'lodash/isFunction';
import { PLAIN_GROUPS, PLAIN_GROUPS_CONFIG } from '../consts';

export default function groupVisitsBy(visitsList, plainGroup) {
  const { groupFieldName, adapter } = PLAIN_GROUPS_CONFIG[plainGroup];
  return plainGroup === PLAIN_GROUPS.JUST_VISITS
    ? [{ field: { name: groupFieldName, value: null }, visitsList }]
    : groupVisitsByValue(visitsList, groupFieldName, adapter);
}

function groupVisitsByValue(visitsList, groupFieldName, adapter) {
  return Object.entries(groupByFn(visitsList, groupFieldName)).map(
    ([groupFieldValue, groupVisitsList]) => ({
      field: {
        name: isFunction(groupFieldName) ? groupFieldName.name : groupFieldName,
        value: adapter ? adapter(groupFieldValue) : groupFieldValue,
      },
      visitsList: groupVisitsList,
    }),
  );
}

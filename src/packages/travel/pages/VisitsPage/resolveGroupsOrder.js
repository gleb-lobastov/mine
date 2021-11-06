import { PLAIN_GROUPS } from 'travel/components/VisitsArranger';
import { PLAIN_GROUPS_MAPPING } from './sidebarConsts';

export default function resolveGroupsOrder(groupBy) {
  const groupingOrder = groupBy
    .split('_')
    .map(currentGroupBy => PLAIN_GROUPS_MAPPING[currentGroupBy]);

  const shouldShowVisits = groupingOrder.includes(PLAIN_GROUPS.TRIPS);
  const lastGroup = groupingOrder[groupingOrder.length - 1];

  if (!shouldShowVisits && lastGroup !== PLAIN_GROUPS.LOCATIONS) {
    groupingOrder.push(PLAIN_GROUPS.LOCATIONS);
  }
  if (shouldShowVisits) {
    groupingOrder.push(PLAIN_GROUPS.JUST_VISITS);
  }
  return groupingOrder;
}

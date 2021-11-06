import { PLAIN_SORTING_MAPPING } from 'travel/components/VisitsArranger';

export default function resolveSortingOrder(sortBy) {
  return sortBy
    .split('_')
    .map(currentSortBy => PLAIN_SORTING_MAPPING[currentSortBy]);
}

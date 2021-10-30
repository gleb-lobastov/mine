import { PLAIN_SORTING_MAPPING } from '../consts';

export default function resolveSortingOrder(sortBy) {
  return sortBy
    .split('_')
    .map(currentSortBy => PLAIN_SORTING_MAPPING[currentSortBy]);
}

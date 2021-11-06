import { PLAIN_FILTERING_MAPPING } from './sidebarConsts';

export default function resolveFiltering(filterBy) {
  return PLAIN_FILTERING_MAPPING[filterBy];
}

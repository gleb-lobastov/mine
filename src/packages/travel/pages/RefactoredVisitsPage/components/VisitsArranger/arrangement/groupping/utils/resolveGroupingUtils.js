export function findClosestGroupValue(visitsGroup, plainGroup) {
  return findClosestGroup(visitsGroup, plainGroup)?.field?.value;
}

export function findClosestGroup(visitsGroup, plainGroup) {
  let currentVisitsGroup = visitsGroup;
  while (currentVisitsGroup) {
    if (plainGroup === currentVisitsGroup.plainGroup) {
      return currentVisitsGroup;
    }
    currentVisitsGroup = currentVisitsGroup.parent;
  }
  return null;
}

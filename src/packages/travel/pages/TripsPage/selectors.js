import uniq from 'lodash/uniq';
import { selectDict, selectProvisionStatus } from 'core/connection';

export const selectUserTripsIds = state => {
  const { fallback: availableUserTrips } =
    selectProvisionStatus(state, 'tripsPage.trips') || {};

  const { data: userTripsIds } = availableUserTrips['tripsPage.trips'] || {};

  return userTripsIds;
};

export const selectLocationsIds = (state, userTripsIds) => {
  const tripsDict = selectDict(state, 'trips');
  const locationsDict = selectDict(state, 'locations');

  const requiredLocationsIds = userTripsIds
    ? uniq(
        userTripsIds.reduce((memo, tripId) => {
          const trip = tripsDict[tripId];
          if (trip) {
            const { originLocationId } = trip;
            if (originLocationId) {
              memo.push(originLocationId);
            }
          }
          return memo;
        }, []),
      )
    : [];
  const missingLocationsIds = requiredLocationsIds.filter(
    requiredLocationId => !locationsDict[requiredLocationId],
  );
  return { requiredLocationsIds, missingLocationsIds };
};

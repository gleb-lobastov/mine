import uniq from 'lodash/uniq';
import { selectDict, selectPlaceholder } from 'core/connection';

export const selectUserTripsIds = (state, domain) => {
  const { data: userTripsIds } =
    selectPlaceholder(state, `${domain}.userTrips`) || {};
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

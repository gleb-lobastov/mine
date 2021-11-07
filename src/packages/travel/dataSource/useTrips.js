import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import max from 'lodash/max';
import min from 'lodash/min';
import { useProvision, selectDict } from 'core/connection';
import { selectResult } from 'core/connection/request/controllerRedux';
import mergeProvisionsState from 'core/connection/request/utils/mergeProvisionsState';
import useUser from './useUser';
import useCountries from './useCountries';
import useLocations from './useLocations';

export default function useTrips({ userAlias, tripsIds: requiredTripsIds }) {
  const { tripsDict } = useSelector(state => ({
    tripsDict: selectDict(state, 'trips') || {},
  }));

  const shouldRequireAllTrips = !requiredTripsIds;
  const missingTripsIds =
    !shouldRequireAllTrips &&
    requiredTripsIds.filter(tripId => !tripsDict[tripId]);

  return useProvision({
    domain: `travel.trips-${userAlias}`,
    isProvision: true,
    modelName: 'trips',
    observe: userAlias,
    query: {
      userAlias,
      navigation: { isDisabled: true },
      filter: shouldRequireAllTrips
        ? {}
        : { id: { comparator: 'in', value: missingTripsIds } },
    },
  });
}

export function useTripsStats({ userAlias, tripsIds: requiredTripsIds }) {
  const tripsProvision = useTrips({ userAlias, tripsIds: requiredTripsIds });
  const { user: { locationsRating = {} } = {}, ...userProvision } = useUser({
    domain: `travel.trips-${userAlias}.user`,
    userAlias,
  });

  const { data: tripsIds = [] } = selectResult(tripsProvision) || {};

  const {
    tripsDict,
    visitsDict,
    ridesDict,
    countriesDict,
    locationsDict,
  } = useSelector(state => ({
    tripsDict: selectDict(state, 'trips') || {},
    visitsDict: selectDict(state, 'visits') || {},
    ridesDict: selectDict(state, 'rides') || {},
    countriesDict: selectDict(state, 'countries') || {},
    locationsDict: selectDict(state, 'locations') || {},
  }));

  const visitsIds = useUniqField(tripsIds, tripsDict, 'visits');
  const ridesIds = useUniqField(tripsIds, tripsDict, 'rides');
  const countriesIds = useUniqField(visitsIds, visitsDict, 'countryId');
  const locationsIds = useUniqField(visitsIds, visitsDict, 'locationId');

  const countriesProvision = useCountries();
  const locationsProvision = useLocations({
    domain: `travel.locations-${userAlias}`,
    locationsIds,
  });

  const commonProvisionState = mergeProvisionsState(
    tripsProvision,
    userProvision,
    countriesProvision,
    locationsProvision,
  );

  const { isError, isValid, isReady, isPending } = commonProvisionState;

  return {
    userProvision,
    tripsProvision,
    countriesProvision,
    locationsProvision,

    isError,
    isValid,
    isReady,
    isPending,

    tripsIds,
    tripsDict,
    visitsIds,
    visitsDict,
    ridesIds,
    ridesDict,
    ridesStats: calcRidesStats(ridesIds, ridesDict),
    locationsIds,
    locationsDict,
    locationsRating,
    countriesIds,
    countriesDict,
  };
}

function calcRidesStats(ridesIds, ridesDict) {
  return {
    earliestDeparture: new Date(
      min(
        ridesIds.map(rideId => ridesDict[rideId]?.departureDateTime.getTime()),
      ),
    ),
    latestArrival: new Date(
      max(ridesIds.map(rideId => ridesDict[rideId]?.arrivalDateTime.getTime())),
    ),
  };
}

function useUniqField(entitiesIds, entitiesDict, fieldName) {
  return useMemo(
    () =>
      Array.from(
        new Set(
          entitiesIds.flatMap(
            entityId => entitiesDict[entityId]?.[fieldName] || [],
          ),
        ),
      ),
    [entitiesIds, entitiesDict, fieldName],
  );
}

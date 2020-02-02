import { useSelector } from 'react-redux';
import max from 'lodash/max';
import min from 'lodash/min';
import { useProvision, selectDict } from 'core/connection';
import {
  selectResult,
  selectIsPending,
  selectIsReady,
  selectIsError,
  selectError,
  selectIsValid,
} from 'core/connection/request/controllerRedux';
import useCountries from './useCountries';
import useLocations from './useLocations';

export default function useTrips({ userAlias }) {
  return useProvision({
    domain: `travel.trips-${userAlias}`,
    isProvision: true,
    modelName: 'trips',
    observe: userAlias,
    query: { userAlias, navigation: { isDisabled: true } },
  });
}

export function useTripsStats({ userAlias }) {
  const tripsProvision = useTrips({ userAlias });
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

  const visitsIds = Array.from(
    new Set(tripsIds.flatMap(tripsId => tripsDict[tripsId]?.visits || [])),
  );

  const ridesIds = Array.from(
    new Set(tripsIds.flatMap(tripsId => tripsDict[tripsId]?.rides || [])),
  );

  const countriesIds = Array.from(
    new Set(visitsIds.flatMap(visitId => visitsDict[visitId]?.countryId || [])),
  );

  const locationsIds = Array.from(
    new Set(
      visitsIds.flatMap(visitId => visitsDict[visitId]?.locationId || []),
    ),
  );

  const countriesProvision = useCountries();
  const locationsProvision = useLocations({
    domain: `travel.locations-${userAlias}`,
    locationsIds,
  });

  const commonProvisionState = mergeProvisionsState(
    tripsProvision,
    countriesProvision,
    locationsProvision,
  );

  const { isError, isValid, isReady, isPending } = commonProvisionState;

  return {
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
    countriesIds,
    countriesDict,
  };
}

function mergeProvisionsState(...provisions) {
  return {
    isReady: provisions.every(selectIsReady),
    isPending: provisions.some(selectIsPending),
    isValid: provisions.every(selectIsValid),
    error: provisions.find(selectIsError),
    errors: provisions.map(selectError).filter(Boolean),
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

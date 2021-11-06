import { useTripsStats } from 'travel/dataSource/useTrips';

export default function useCountryWithTripStats({ userAlias, countryId }) {
  const tripsProvision = useTripsStats({
    userAlias,
  });

  const { countriesIds, countriesDict, visitsDict, visitsIds } = tripsProvision;

  const isVisited = countriesIds.includes(countryId);

  return {
    provision: tripsProvision,
    country: countriesDict[countryId],
    isVisited,
    visitsList: isVisited
      ? visitsIds
          .map(visitId => visitsDict[visitId])
          .filter(
            ({ countryId: visitCountryId }) => visitCountryId === countryId,
          )
      : [],
  };
}

import { useTripsStats } from 'travel/dataSource/useTrips';

export default function useYearWithTripStats({ userAlias, year }) {
  const provision = useTripsStats({
    userAlias,
  });

  const { visitsDict, visitsIds } = provision;

  const visitsList = visitsIds
    .map(visitId => visitsDict[visitId])
    .filter(({ arrivalYear }) => year === arrivalYear);

  return {
    provision,
    visitsList,
  };
}

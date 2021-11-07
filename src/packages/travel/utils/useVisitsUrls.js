import { useMemo } from 'react';
import { usePaths } from 'modules/packages';

export default function useVisitsUrls({ editable, userAlias, section }) {
  const { travel: travelPaths } = usePaths();

  return useMemo(
    () => ({
      hyperlinks: () => {},
      locationsUrl: travelPaths.locations.toUrl({ userAlias, section }),
      tripCreateUrl: editable
        ? travelPaths.tripCreate.toUrl({ userAlias })
        : null,
      resolveLocationUrl: ({ locationId }) =>
        travelPaths.location.toUrl({
          userAlias,
          section,
          strLocationId: String(locationId),
        }),
      resolveCountryUrl: ({ countryId }) =>
        travelPaths.country.toUrl({
          userAlias,
          section,
          strCountryId: String(countryId),
        }),
      resolveTripEditUrl: ({ tripId }) =>
        editable
          ? travelPaths.tripEdit.toUrl({
              strTripId: String(tripId),
              userAlias,
            })
          : null,
      resolveVisitUrl: ({ visitId }) =>
        editable
          ? travelPaths.visit.toUrl({
              userAlias,
              section,
              strVisitId: String(visitId),
            })
          : null,
    }),
    [editable, travelPaths],
  );
}

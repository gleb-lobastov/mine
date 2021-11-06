import { useMemo } from 'react';
import { usePaths } from 'modules/packages';

export default function useVisitsUrls({ editable, userAlias }) {
  const { travel: travelPaths } = usePaths();

  return useMemo(
    () => ({
      locationsUrl: travelPaths.locations.toUrl({ userAlias }),
      tripCreateUrl: editable
        ? travelPaths.tripCreate.toUrl({ userAlias })
        : null,
      resolveLocationUrl: ({ locationId }) =>
        travelPaths.location.toUrl({
          strLocationId: String(locationId),
          userAlias,
        }),
      resolveTripEditUrl: ({ tripId }) =>
        editable
          ? travelPaths.tripEdit.toUrl({
              strTripId: String(tripId),
              userAlias,
            })
          : null,
      resolveVisitEditUrl: ({ visitId }) =>
        editable
          ? travelPaths.visitEdit.toUrl({
              strVisitId: String(visitId),
              userAlias,
            })
          : null,
    }),
    [editable, travelPaths],
  );
}

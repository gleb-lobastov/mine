import { useMemo, useEffect, useRef } from 'react';
import isEqual from 'lodash/isEqual';

const createControlledPromise = () => {
  // This fields will be initialized synchronously in promise constructor
  let resolver = null;
  let rejector = null;

  const promise = new Promise((resolve, reject) => {
    resolver = resolve;
    rejector = reject;
  });
  return { promise, resolver, rejector };
};

export default markersCoords => {
  const { promise: apiPromise, resolver: handleGoogleApiLoaded } = useMemo(
    createControlledPromise,
    [],
  );

  const previousCoords = useRef(null);
  const changesCount = useRef(0);

  useEffect(() => {
    if (!isEqual(previousCoords, markersCoords)) {
      changesCount.current += 1;
    }
  });

  useEffect(
    () => {
      let markers = [];
      apiPromise.then(api => {
        const { map, maps } = api;
        const bounds = new maps.LatLngBounds();
        markers = markersCoords.map(({ lat, lon }) => {
          const marker = new maps.Marker({ position: { lat, lng: lon }, map });
          bounds.extend(marker.position);
          return marker;
        });
        map.setOptions({ maxZoom: 11, minZoom: 2 });
        map.fitBounds(bounds);
        map.setOptions({ maxZoom: null, minZoom: null });
      });
      return () => markers.forEach(marker => marker.setMap(null));
    },
    [changesCount.current],
  );
  return { handleGoogleApiLoaded };
};

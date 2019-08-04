import { useMemo, useEffect } from 'react';

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

export default ({ lat, lon }) => {
  const { promise: apiPromise, resolver: handleGoogleApiLoaded } = useMemo(
    createControlledPromise,
    [],
  );

  useEffect(
    () => {
      let marker;
      apiPromise.then(api => {
        const { map, maps } = api;
        marker = new maps.Marker({ position: { lat, lng: lon }, map });
      });
      return () => {
        if (marker) {
          marker.setMap(null);
        }
      };
    },
    [lat, lon],
  );
  return { handleGoogleApiLoaded };
};
